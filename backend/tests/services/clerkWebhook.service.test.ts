import { handleClerkWebhook } from "../../src/services/clerkWebhook.service";
import { __mocks } from "../../src/db";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/db", () => {
  const onConflictDoUpdate = vi.fn();

  const values = vi.fn(() => ({
    onConflictDoUpdate,
  }));

  const insert = vi.fn(() => ({
    values,
  }));

  const update = vi.fn();
  const del = vi.fn();

  return {
    db: {
      insert,
      update,
      delete: del,
    },
    __mocks: {
      insert,
      values,
      onConflictDoUpdate,
      update,
      del,
    },
  };
});


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

    expect(__mocks.insert).toHaveBeenCalledTimes(1);
    expect(__mocks.values).toHaveBeenCalledWith({
      clerkUserId: "user_123",
      email: "test@example.com",
    });

    expect(__mocks.onConflictDoUpdate).toHaveBeenCalledWith({
      target: expect.anything(),
      set: {
        email: "test@example.com",
        updatedAt: expect.any(Date),
      },
    });

  });
});