import { db } from "../db";
import { expenses } from "../db/schema";
import { eq, isNull, and, desc } from "drizzle-orm";

export async function getExpenses(userId: string) {
  return db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        isNull(expenses.deletedAt)
      )
    )
    .orderBy(desc(expenses.expenseDate))
    .limit(50);
}