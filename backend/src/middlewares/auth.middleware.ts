import { clerkMiddleware, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

export const clerkAuth = clerkMiddleware();

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = getAuth(req);

  
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId));

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  
  (req as Request & { user: typeof user }).user = user;

  next();
}