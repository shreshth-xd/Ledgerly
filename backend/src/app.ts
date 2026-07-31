import cors from "cors";
import express from "express";
import healthRouter from "./routes/health.routes";
import expensesRouter from "./routes/expenses.routes";
import webhookRouter from "./routes/webhook.routes";
import categoryRouter from "./routes/category.routes";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Placing Webhook middleware before because it needs unparsed raw data
app.use("/webhooks", express.raw({ type: "application/json" }), webhookRouter);
app.use(express.json());

app.use(clerkMiddleware());
app.use("/expenses", expensesRouter);
app.use("/categories", categoryRouter);

app.use("/health", healthRouter);

export default app;