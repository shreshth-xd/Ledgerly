import { Request, Response } from "express";
import { Webhook } from "svix";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function clerkWebhookController(req: Request, res: Response): Promise<void> {

  const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

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

  switch (event.type) {
    case "user.created": {
      const data = event.data as {
        id: string;
        username: string | null;
        first_name: string | null;
        last_name: string | null;
        email_addresses: {
          id: string;
          email_address: string;
        }[];
        primary_email_address_id: string | null;
      };

      const primaryEmail = data.email_addresses.find(
        (email) => email.id === data.primary_email_address_id
      );

      // console.log({
      //   clerkUserId: data.id,
      //   email: primaryEmail?.email_address,
      //   username: data.username,
      //   firstName: data.first_name,
      //   lastName: data.last_name,
      // });
      try {
        await db
          .insert(users)
          .values({
            clerkUserId: data.id,
            email: primaryEmail!.email_address,
          })
          .onConflictDoUpdate({
            target: users.clerkUserId,
            set: {
              email: primaryEmail!.email_address,
              updatedAt: new Date(),
            },
          });
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      break;
    }

    case "user.updated": {
      const data = event.data as {
        id: string;
        username: string | null;
        first_name: string | null;
        last_name: string | null;
        email_addresses: {
          id: string;
          email_address: string;
        }[];
        primary_email_address_id: string | null;
      };

      const primaryEmail = data.email_addresses.find(
        (email) => email.id === data.primary_email_address_id
      );

      console.log({
        clerkUserId: data.id,
        email: primaryEmail?.email_address,
        username: data.username,
        firstName: data.first_name,
        lastName: data.last_name,
      });

      await db
        .update(users)
        .set({
          email: primaryEmail!.email_address,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkUserId, data.id));

      break;
    }

    case "user.deleted": {
      const data = event.data as {
        id: string;
      };

      console.log({
        clerkUserId: data.id,
      });

      await db
        .delete(users)
        .where(eq(users.clerkUserId, data.id));

      break;
    }

    default: {
      console.log(`Ignoring Clerk event: ${event.type}`);
      break;
    }
  }

  res.status(200).json({ received: true });
  return;

}