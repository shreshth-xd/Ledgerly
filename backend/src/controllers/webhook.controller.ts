import { Request, Response } from "express";
import { Webhook } from "svix";

export async function clerkWebhookController(
  req: Request,
  res: Response
): Promise<void> {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    res.status(500).json({ error: "Missing Clerk webhook secret" });
    return;
  }

  const svixId = req.headers["svix-id"] as string;
  const svixTimestamp = req.headers["svix-timestamp"] as string;
  const svixSignature = req.headers["svix-signature"] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    res.status(400).json({ error: "Missing Svix headers" });
    return;
  }

  const wh = new Webhook(webhookSecret);

  let event: Record<string, unknown>;

  try {
    event = wh.verify(req.body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as Record<string, unknown>;
  } catch {
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  console.log(event);

  res.status(200).json({ received: true });
}