// src/routes/health.routes.ts

import { Router } from "express";
import { db } from "../db/index";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    status: "healthy",
    service: "ledgerly-backend",
  });
});

router.get("/db", async (_, res) => {
  try {
    await db.execute("SELECT 1");

    res.json({
      status: "healthy",
      database: "reachable",
    });
  } catch {
    res.status(500).json({
      status: "unhealthy",
      database: "unreachable",
    });
  }
});

export default router;