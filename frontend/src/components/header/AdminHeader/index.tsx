import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import logo from "../../../assets/logo.png";

export default function AdminHeader() {
	return (
		<header>
			<div>
				<MdMenu size={25} />
			</div>

			<div>
				<img
					src={logo}
					alt="Logo da Davies Ecommerce"
				/>
			</div>

			<div>
				<FaUser size={25} />
			</div>
		</header>
	);
}
