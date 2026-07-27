import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleClerkWebhook } from "../../src/services/clerkWebhook.service";


const onConflictDoUpdate = vi.fn();

const values = vi.fn(() => ({
  onConflictDoUpdate,
}));

const insert = vi.fn(() => ({
  values,
}));

const update = vi.fn();
const del = vi.fn();

vi.mock("../../src/db", () => ({
  db: {
    insert,
    update,
    delete: del,
  },
}));

describe("handleClerkWebhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should insert a user on user.created", async () => {
    const event = {
      type: "user.created",
      data: {
        id: "user_123",
        username: "shreshth",
        first_name: "Shreshth",
        last_name: "Kanchan",
        primary_email_address_id: "email_1",
        email_addresses: [
          {
            id: "email_1",
            email_address: "test@example.com",
          },
        ],
      },
    };

    await handleClerkWebhook(event as Record<string, unknown>);

    expect(insert).toHaveBeenCalledTimes(1);
    expect(values).toHaveBeenCalledTimes(1);
    expect(onConflictDoUpdate).toHaveBeenCalledTimes(1);
  });
});