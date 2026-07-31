import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(1).max(100),
    parentCategoryId: z.string().uuid().nullable().optional(),
});

export const updateCategorySchema = z.object({
    name: z.string().trim().min(1).max(100).optional(),
    parentCategoryId: z.string().uuid().nullable().optional(),
});
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

