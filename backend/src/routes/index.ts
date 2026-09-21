import { Router } from "express";

import { userRoutes } from "./user.routes.js";
import { productRoutes } from "./product.routes.js";
import { cartRoutes } from "./cart.routes.js";
import { cartItemRoutes } from "./cartItems.routes.js";
import { addressRoutes } from "./shippingAddress.routes.js";
import { orderRoutes } from "./order.routes.js";
import { paymentCardRoutes } from "./paymentCard.routes.js";
import { paymentsRoutes } from "./payment.routes.js";
import { adminRoutes } from "./admin.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/cart", cartRoutes);
routes.use("/cart/items", cartItemRoutes);
routes.use("/addresses", addressRoutes);
routes.use("/orders", orderRoutes);
routes.use("/payment-cards", paymentCardRoutes);
routes.use("/payments", paymentsRoutes);
routes.use("/admin", adminRoutes);

export { routes };
