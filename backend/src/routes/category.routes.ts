import { Router } from "express";
import { createCategoryController } from "../controllers/category.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCategorySchema } from "../validators/category.validator";

const router = Router();

router.post(
  "/",
  validate(createCategorySchema),
  createCategoryController
);

export default router;