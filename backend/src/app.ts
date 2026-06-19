import express from "express";
import healthRouter from "./routes/health.routes";
import expensesRouter from "./routes/expenses.routes";


const app = express();

app.use("/expenses", expensesRouter);
app.use(express.json());

app.use("/health", healthRouter);

export default app;