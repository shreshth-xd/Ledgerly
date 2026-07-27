import { z } from "zod";

export const clerkWebhookSchema = z.object({
  type: z.enum([
    "user.created",
    "user.updated",
    "user.deleted",
  ]),
  data: z.record(z.string(), z.unknown()),
});