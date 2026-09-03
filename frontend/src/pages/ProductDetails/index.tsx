import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import Button from "../../components/form/Button";
import { useEffect, useState, useRef } from "react";
import type { Product } from "../../types/Product";
import axios from "axios";
import { formatPrice } from "../../utils/formatPrice";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AppError } from "../../errors/AppError";
import { addToCart } from "../../services/api/cartItem";
import { BsCartCheck } from "react-icons/bs";

export default function ProductDetails() {
	const [product, setProduct] = useState<Product | null>(null);
	const [addedToCart, setAddedToCart] = useState<boolean>(false);
	const { productId } = useParams();
	const navigate = useNavigate();

	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/api/products/${productId}`);

				setProduct(response.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					return alert(error.response?.data.message);
				}

				console.error(error);
				alert("Aconteceu um erro inesperado");
			}
		};

		fetchData();
	}, [productId]);

	const handleAddToCart = async (productId: number) => {
		try {
			const data = await addToCart(productId);

			setAddedToCart(true);

			alert(data.message);
		} catch (error) {
			if (error instanceof AppError) {
				if (error.statusCode === 401) {
					localStorage.removeItem("user");
					navigate("/entrar");
					return;
				}

				alert(error.message);
				return;
			}

			alert("Erro inesperado");
		}
	};

	const handleScroll = () => {
		if (carouselRef.current) {
			const { scrollLeft, clientWidth } = carouselRef.current;

			const newIndex = Math.round(scrollLeft / clientWidth);

			setCurrentIndex(newIndex);
		}
	};

	const scrollToIndex = (index: number) => {
		if (!carouselRef.current) return;

		const { clientWidth } = carouselRef.current;
		const maxIndex = product!.productImages.length - 1;
		const newIndex = Math.max(0, Math.min(index, maxIndex));

		carouselRef.current.scrollTo({
			left: newIndex * clientWidth,
			behavior: "smooth",
		});

		setCurrentIndex(newIndex);
	};

	const handlePrev = () => scrollToIndex(currentIndex - 1);
	const handleNext = () => scrollToIndex(currentIndex + 1);

	return (
		<section className={styles.container}>
			{product && (
				<>
					<header className={styles.productHeader}>
						<div className={styles.carouselWrapper}>
							<figure
								className={styles.productImage}
								ref={carouselRef}
								onScroll={handleScroll}
							>
								{product.productImages.map((image) => (
									<img
										key={image.id}
										src={image.url}
										alt={product.name}
									/>
								))}
							</figure>

							<button
								className={`${styles.carouselButton} ${styles.prevButton}`}
								onClick={handlePrev}
								disabled={currentIndex === 0}
								aria-label="Imagem anterior"
							>
								<FaChevronLeft size={16} />
							</button>

							<button
								className={`${styles.carouselButton} ${styles.nextButton}`}
								onClick={handleNext}
								disabled={currentIndex === product.productImages.length - 1}
								aria-label="Próxima imagem"
							>
								<FaChevronRight size={16} />
							</button>

							<div className={styles.indicator}>
								{currentIndex + 1} / {product.productImages.length}
							</div>
						</div>

						<section className={styles.productContent}>
							<h1 className={styles.productName}>{product.name}</h1>

							<div className={styles.paymentContainer}>
								<p className={styles.paymentPrice}>
									<strong>{formatPrice(product.price)}</strong>
								</p>

								<div className={styles.actionsContainer}>
									<Button
										handleClick={() => console.log("clicou")}
										disabled={false}
									>
										Comprar agora
									</Button>

									<button
										className={styles.addToCartButton}
										onClick={() => handleAddToCart(product.id)}
										disabled={addedToCart}
									>
										{addedToCart ? <BsCartCheck size={20} /> : <FaCartPlus size={20} />}
									</button>
								</div>
							</div>
						</section>
					</header>

					<hr />

					<section className={styles.aboutContainer}>
						<h2 className={styles.aboutTitle}>Sobre o produto</h2>
						<p className={styles.aboutDescription}>
							{product.description + ". "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, sapiente fugiat. Nihil odit quis
							possimus dolores sequi nesciunt explicabo, esse tempore architecto minima asperiores voluptas modi
							aliquam fugiat minus voluptatem? Impedit, labore officia? Corrupti sequi quos temporibus dolor
							aliquid ab pariatur animi excepturi minus cupiditate ea quae quisquam quasi dolorem error, officia
							amet est deleniti, blanditiis id nulla aperiam ratione? Neque, eveniet tenetur. Deleniti officia
							ratione vero voluptate magni. Ratione vel explicabo officiis necessitatibus accusamus eligendi
							porro nisi cupiditate voluptatem debitis autem, molestias aliquid, inventore labore voluptatibus
							molestiae provident perferendis? Earum temporibus similique pariatur veniam illum quis, inventore,
							voluptatibus placeat eos at reprehenderit dolorum ipsam deserunt, animi alias. Voluptatibus aut
							provident magni officia nostrum ducimus accusantium tempore blanditiis, a iure!
						</p>
					</section>
				</>
			)}
		</section>
	);
}
