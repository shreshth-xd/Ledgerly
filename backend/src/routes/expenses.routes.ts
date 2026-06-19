import { Router } from "express";
import { getExpensesController } from "../controllers/expense.controller";

const router = Router();

router.get("/", getExpensesController);

export default router;