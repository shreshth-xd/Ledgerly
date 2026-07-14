import { Request, Response } from "express";

export async function clerkWebhookController(
  req: Request,
  res: Response
): Promise<void> {
  res.status(200).json({
    message: "Clerk webhook endpoint reached",
  });
}