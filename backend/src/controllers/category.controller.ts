import { Request, Response } from "express";
import { createCategory } from "../services/category.service";
import { updateCategory } from "../services/category.service";

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


type UpdateCategoryParams = {
  id: string;
};

export async function updateCategoryController(
  req: Request<UpdateCategoryParams>,
  res: Response
) {

  const category = await updateCategory(
    req.params.id,
    req.user.id,
    req.body
  );

  if (!category) {
    res.status(404).json({
      error: "Category not found",
    });
    return;
  }

  res.status(200).json(category);
}