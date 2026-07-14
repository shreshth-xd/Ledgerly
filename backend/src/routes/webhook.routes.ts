import { Router } from "express";
import { clerkWebhookController } from "../controllers/webhook.controller";

const router = Router();

router.post("/clerk", clerkWebhookController);

export default router;