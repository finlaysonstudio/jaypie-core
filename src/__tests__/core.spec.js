// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
// eslint-disable-next-line import/named
import { CDK } from "../core.js";

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

describe("Jaypie Core", () => {
  describe("Constants", () => {
    it("Exposes constants", () => {
      expect(CDK).toBeObject();
    });
  });
});
