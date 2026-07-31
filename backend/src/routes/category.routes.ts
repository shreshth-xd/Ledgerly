import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
} from "../controllers/category.controller";
import { validate } from "../middlewares/validate.middleware";
import { clerkAuth, requireAuth } from "../middlewares/auth.middleware";
import { createCategorySchema } from "../validators/category.validator";
import { updateCategorySchema } from "../validators/category.validator";
import { updateCategoryController } from "../controllers/category.controller";

const router = Router();

router.get("/", clerkAuth, requireAuth, getCategoriesController);

router.post(
  "/",
  clerkAuth,
  requireAuth,
  validate(createCategorySchema),
  createCategoryController
);


router.patch(
  "/:id",
  clerkAuth,
  requireAuth,
  validate(updateCategorySchema),
  updateCategoryController
);

export default router;