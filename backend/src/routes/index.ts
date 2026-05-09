import { Router } from "express";

import { userRoutes } from "./user.routes.js";
import { productRoutes } from "./product.routes.js";
import { productImageRoutes } from "./productImages.routes.js";
import { cartRoutes } from "./cart.routes.js";
import { cartItemRoutes } from "./cartItems.routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/products/:productId", productImageRoutes);
routes.use("/cart", cartRoutes);
routes.use("/cart/items", cartItemRoutes);

export { routes };
