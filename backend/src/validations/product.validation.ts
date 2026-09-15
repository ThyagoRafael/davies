import { z } from "zod";

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
	stock: z.coerce.number(),
	imagesMeta: imagesMetaSchema,
});
