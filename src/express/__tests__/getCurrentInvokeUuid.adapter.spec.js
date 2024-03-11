// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getCurrentInvoke } from "@codegenie/serverless-express";

// Subject
import getCurrentInvokeUuid from "../getCurrentInvokeUuid.adapter.js";

//
//
// Mock modules
//

vi.mock("@codegenie/serverless-express", async () => {
  const actual = await vi.importActual("@codegenie/serverless-express");
  const module = {
    ...actual,
    getCurrentInvoke: vi.fn(() => ({
      context: {
        awsRequestId: "mocked-aws-request-id",
      },
    })),
  };
  return module;
});

//
//
// Mock environment
//
afterEach(() => {
  vi.clearAllMocks();
});

//
//
// Run tests
//

describe("GetCurrentInvokeUuid Adapter", () => {
  it("Works", () => {
    expect(getCurrentInvokeUuid).toBeFunction();
    const response = getCurrentInvokeUuid();
    expect(response).not.toBeUndefined();
  });
  it("Returns the mocked UUID", () => {
    expect(getCurrentInvoke).not.toHaveBeenCalled();
    const response = getCurrentInvokeUuid();
    expect(response).toBe("mocked-aws-request-id");
    expect(getCurrentInvoke).toHaveBeenCalled();
  });
});
