import { Request, Response } from "express";
import { getExpenses } from "../services/expense.service";

export async function getExpensesController(
  req: Request,
  res: Response
) {
  const userId = "dummy-user-id";

  const expenses = await getExpenses(userId);

  res.json(expenses);
}