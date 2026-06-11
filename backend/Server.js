import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});