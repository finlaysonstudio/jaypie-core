// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import { CDK } from "../constants.js";

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

describe("Constants", () => {
  it("Exports constants", () => {
    expect(CDK).toBeObject();
    expect(CDK.SPONSOR.FINLAYSON).toBe("finlaysonstudio");
  });
});
