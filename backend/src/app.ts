import express from "express";
import healthRouter from "./routes/health.routes";
import expensesRouter from "./routes/expenses.routes";
import webhookRouter from "./routes/webhook.routes";

const app = express();

app.use("/expenses", expensesRouter);
app.use("/webhook", express.raw({ type: "application/json" }), webhookRouter);
app.use(express.json());

app.use("/health", healthRouter);

export default app;