// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import index from "../index.js";

//
//
// Mock constants
//

//
//
// Mock modules
//

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
});
afterEach(() => {
  process.env = DEFAULT_ENV;
});

//
//
// Run tests
//

describe("Index", () => {
  it("Works", async () => {
    const response = await index();
    // console.log("response :>> ", response);
    expect(response).not.toBeUndefined();
    expect(response).toBeString();
    expect(response).toBe("Hello, world!");
  });
});
