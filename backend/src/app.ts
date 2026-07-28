import express from "express";
import healthRouter from "./routes/health.routes";
import expensesRouter from "./routes/expenses.routes";
import webhookRouter from "./routes/webhook.routes";
import categoryRouter from "./routes/category.routes";


const app = express();

app.use("/expenses", expensesRouter);
app.use("/webhooks", express.raw({ type: "application/json" }), webhookRouter);
app.use("/categories", categoryRouter);
app.use(express.json());

app.use("/health", healthRouter);

export default app;