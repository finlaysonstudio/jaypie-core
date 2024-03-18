// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import logger from "../logger.module.js";

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
  vi.clearAllMocks();
});

//
//
// Run tests
//

describe("Logger Module", () => {
  it("Is a function", () => {
    expect(logger).toBeFunction();
  });
  it("Works", () => {
    const response = logger();
    expect(response).not.toBeUndefined();
  });
  describe("Features", () => {
    it("Returns a logger", () => {
      const response = logger();
      expect(response).toBeObject();
      expect(response.debug).toBeFunction();
      expect(response.error).toBeFunction();
      expect(response.fatal).toBeFunction();
      expect(response.info).toBeFunction();
      expect(response.tag).toBeFunction();
      expect(response.trace).toBeFunction();
      expect(response.untag).toBeFunction();
      expect(response.var).toBeFunction();
      expect(response.warn).toBeFunction();
      expect(response.with).toBeFunction();
    });
  });
});
