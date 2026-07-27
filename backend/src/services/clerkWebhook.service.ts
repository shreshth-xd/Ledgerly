import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

export async function handleClerkWebhook(event: Record<string, unknown>): Promise<void> {
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
}