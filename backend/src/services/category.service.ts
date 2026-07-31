import { db } from "../db";
import { and, count, eq, isNull, or } from "drizzle-orm";
import { categories, expenses } from "../db/schema";
import type { UpdateCategoryInput } from "../validators/category.validator";

type CreateCategoryInput = {
  name: string;
  parentCategoryId?: string | null;
};

export async function getCategories(userId: string) {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      isSystem: categories.isSystem,
      parentCategoryId: categories.parentCategoryId,
      expenseCount: count(expenses.id),
    })
    .from(categories)
    .leftJoin(
      expenses,
      and(
        eq(expenses.categoryId, categories.id),
        eq(expenses.userId, userId),
        isNull(expenses.deletedAt)
      )
    )
    .where(
      or(eq(categories.isSystem, true), eq(categories.userId, userId))
    )
    .groupBy(
      categories.id,
      categories.name,
      categories.isSystem,
      categories.parentCategoryId
    )
    .orderBy(categories.name);
}

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

export async function updateCategory(
  categoryId: string,
  userId: string,
  input: UpdateCategoryInput
) {
  const [category] = await db
    .update(categories)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(categories.id, categoryId),
        eq(categories.userId, userId)
      )
    )
    .returning();

  return category;
}