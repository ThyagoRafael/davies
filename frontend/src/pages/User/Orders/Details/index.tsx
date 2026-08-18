import { useParams } from "react-router-dom";

export default function OrderDetails() {
	const { orderId } = useParams();

	return <div>Detalhes do produto {orderId}</div>;
}
