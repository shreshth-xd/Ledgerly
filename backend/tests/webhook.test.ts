import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Clerk Webhooks", () => {
  it("should return 404 for an unknown webhook route", async () => {
    const response = await request(app).post("/webhooks/unknown");

    expect(response.status).toBe(404);
  });
});