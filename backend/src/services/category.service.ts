import { db } from "../db";
import { categories } from "../db/schema";

type CreateCategoryInput = {
  name: string;
  parentCategoryId?: string | null;
};

export async function createCategory(userId: string, input: CreateCategoryInput) {
  const [category] = await db
    .insert(categories)
    .values({
        userId,
        name: input.name,
        parentCategoryId: input.parentCategoryId ?? null,
    })
    .returning();

  return category;
}