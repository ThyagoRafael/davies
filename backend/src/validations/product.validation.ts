import { z } from "zod";
import { jsonPreprocess } from "../utils/jsonPreprocess.js";

const imageMetaSchema = z.object({
	tempId: z.string().min(1),
	position: z.coerce.number().int().nonnegative(),
});

const imagesMetaSchema = z.array(imageMetaSchema);

export type ImagesMeta = z.infer<typeof imagesMetaSchema>;

export const createProductSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.string(),
	stock: z.coerce.number().int().positive(),
	imagesMeta: z.preprocess(jsonPreprocess, imagesMetaSchema),
});

const reorderSchema = z.union([
	z.object({
		id: z.coerce.number().int().positive(),
		position: z.coerce.number().int().nonnegative(),
	}),
	z.object({
		tempId: z.string().min(1),
		position: z.coerce.number().int().nonnegative(),
	}),
]);

const imagesActionSchema = z.object({
	destroy: z.array(z.number().int().positive()).default([]),
	reorder: z.array(reorderSchema),
});

export type ImagesAction = z.infer<typeof imagesActionSchema>;

export const updateProductSchema = createProductSchema
	.omit({
		imagesMeta: true,
	})
	.extend({
		imagesAction: z.preprocess(jsonPreprocess, imagesActionSchema),
	})
	.partial()
	.refine((data) => Object.keys(data).length > 0, {
		error: "Informe pelo menos um campo para atualizar",
	});
