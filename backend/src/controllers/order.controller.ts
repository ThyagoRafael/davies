import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { Prisma } from "../generated/prisma/client.js";
import { generateOrderCode } from "../utils/orderCode.js";
import { FIXED_SHIPPING_PRICE } from "../constants/fixedShippingPrice.js";
import Stripe from "stripe";
import { stripe } from "../lib/stripe.js";
import { mapStripeStatus } from "../services/stripe/mapStatus.js";
export class OrderController {
	checkout = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const shippingAddressId = Number(req.body.shippingAddressId);
		const paymentMethod = req.body.paymentMethod as "card" | "pix";
		let cardId: number | null = null;

		if (!shippingAddressId || !paymentMethod) {
			throw new AppError("Erro no body da requisição", 400);
		}

		if (paymentMethod === "pix") {
			throw new AppError("PIX indisponível no momento", 400);
		}

		if (paymentMethod === "card") {
			if (!req.body.userPaymentCardId) {
				throw new AppError("Cartão não informado", 400);
			}
			cardId = Number(req.body.userPaymentCardId);
		}

		const { order, card, payment } = await prisma.$transaction(async (tx) => {
			const cart = await tx.cart.findFirst({
				where: {
					userId,
					status: "active",
				},
				include: {
					cartItems: {
						include: {
							product: true,
						},
					},
				},
			});

			if (!cart) {
				throw new AppError("Carrinho não encontrado", 404);
			}

			if (cart.cartItems.length <= 0) {
				throw new AppError("Carrinho sem produtos", 400);
			}

			for (const item of cart.cartItems) {
				if (item.quantity > item.product.stock) {
					throw new AppError(`Estoque insuficiente para ${item.product.name}`, 400);
				}
			}

			const shippingAddress = await tx.shippingAddress.findUnique({
				where: {
					id: shippingAddressId,
					userId,
				},
			});

			if (!shippingAddress) {
				throw new AppError("Endereço não encontrado", 404);
			}

			let card = null;

			if (paymentMethod === "card") {
				card = await tx.userPaymentCard.findFirst({
					where: { id: cardId!, userId },
					select: {
						cardBrand: true,
						holderName: true,
						lastDigits: true,
						cardToken: true,
					},
				});

				if (!card) {
					throw new AppError("Cartão não encontrado", 404);
				}
			}

			const itemsPrice = cart.cartItems.reduce((acc, item) => {
				return acc.plus(item.product.price.mul(item.quantity));
			}, new Prisma.Decimal(0));

			const shippingPrice = new Prisma.Decimal(FIXED_SHIPPING_PRICE);

			const createdOrder = await tx.order.create({
				data: {
					orderCode: "pending",
					status: "pending",
					shippingAddressId: shippingAddress.id,
					userId,
					itemsPrice,
					shippingPrice,
					totalPrice: itemsPrice.plus(shippingPrice),
				},
			});

			const order = await tx.order.update({
				where: { id: createdOrder.id },
				data: { orderCode: generateOrderCode(createdOrder.id) },
				select: {
					id: true,
					orderCode: true,
					totalPrice: true,
				},
			});

			await tx.orderItem.createMany({
				data: cart.cartItems.map((item) => ({
					orderId: order.id,
					productId: item.productId,
					quantity: item.quantity,
					unitPrice: item.product.price,
					subtotal: item.product.price.mul(item.quantity),
				})),
			});

			for (const item of cart.cartItems) {
				await tx.product.update({
					where: {
						id: item.productId,
					},
					data: {
						stock: {
							decrement: item.quantity,
						},
					},
				});
			}

			await tx.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					status: "finished",
				},
			});

			const payment = await tx.payment.create({
				data: {
					orderId: order.id,
					method: paymentMethod,
					gateway: "stripe",
					status: "pending",
					amount: order.totalPrice,
					userPaymentCardId: cardId,
				},
			});

			return { order, card, payment };
		});

		if (!card) {
			throw new AppError("Cartão não encontrado", 404);
		}

		let paymentIntent: Stripe.PaymentIntent;

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				stripeCustomerId: true,
			},
		});

		if (!user?.stripeCustomerId) {
			throw new AppError("Cliente Stripe não encontrado", 400);
		}

		try {
			paymentIntent = await stripe.paymentIntents.create({
				amount: Math.round(order.totalPrice.toNumber() * 100),
				currency: "brl",
				payment_method: card.cardToken,
				payment_method_types: ["card"],
				customer: user.stripeCustomerId,
				confirm: true,
				metadata: {
					orderId: String(order.id),
					orderCode: order.orderCode,
					userId: String(userId),
				},
			});
		} catch (error) {
			if (error instanceof Stripe.errors.StripeCardError) {
				await prisma.payment.update({
					where: { id: payment.id },
					data: { status: "failed" },
				});
				throw new AppError(`Pagamento recusado: ${error.message}`, 402);
			}
			throw error;
		}

		let updatedPayment;

		try {
			updatedPayment = await prisma.payment.update({
				where: { id: payment.id },
				data: {
					status: mapStripeStatus(paymentIntent),
					externalId: paymentIntent.id,
				},
				select: {
					method: true,
					status: true,
				},
			});
		} catch (error) {
			console.error("Erro ao atualizar pagamento após criação do PaymentIntent", {
				paymentId: payment.id,
				paymentIntentId: paymentIntent.id,
				error,
			});

			throw new AppError(
				"Pagamento processado, mas houve um erro ao atualizar o pedido. Entre em contato com o suporte.",
				500,
			);
		}

		const { cardToken, ...cardData } = card;

		res.status(201).json({
			order,
			card: cardData,
			payment: updatedPayment,
			clientSecret: paymentIntent.status === "requires_action" ? paymentIntent.client_secret : undefined,
		});
	};

	list = async (req: Request, res: Response) => {
		const userId = req.user!.id;

		const orders = await prisma.order.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		res.status(200).json(orders);
	};

	detail = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
				userId,
			},
			select: {
				id: true,
				orderCode: true,
			},
		});

		if (!order) {
			throw new AppError("Pedido não encontrado", 404);
		}

		const payment = await prisma.payment.findFirst({
			where: {
				orderId: order.id,
			},
			select: {
				method: true,
				status: true,
				userPaymentCard: {
					select: {
						cardBrand: true,
						holderName: true,
						lastDigits: true,
					},
				},
			},
		});

		if (!payment) {
			throw new AppError("Pagamento não encontrado", 404);
		}

		const { userPaymentCard, ...paymentData } = payment;

		res.status(200).json({ order, card: userPaymentCard, payment: paymentData });
	};

	shipOrder = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		await prisma.order.update({
			where: {
				id: orderId,
				userId,
			},
			data: {
				status: "shipped",
			},
		});

		res.status(200).json({ message: "Pedido foi enviado" });
	};

	deliverOrder = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		await prisma.order.update({
			where: {
				id: orderId,
				userId,
			},
			data: {
				status: "delivered",
			},
		});

		res.status(200).json({ message: "Pedido foi entregue" });
	};

	cancelOrder = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		await prisma.order.update({
			where: {
				id: orderId,
				userId,
			},
			data: {
				status: "canceled",
			},
		});

		res.status(200).json({ message: "Pedido cancelado com sucesso" });
	};
}
