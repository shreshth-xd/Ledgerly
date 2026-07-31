import { Request, Response } from "express";
import { createCategory } from "../services/category.service";

export async function createCategoryController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const category = await createCategory(req.user.id, req.body);

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}