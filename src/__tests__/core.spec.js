// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import core from "../core.js";
import { CDK, log } from "../core.js";

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
  it("Exposes a function", () => {
    expect(core).toBeFunction();
  });
  it("Function returns boolean", () => {
    const result = core();
    expect(result).not.toBeUndefined();
    expect(result).toBeBoolean();
  });
  it("Right now it is true 🙃", () => {
    expect(core()).toBeTrue();
  });
  describe("Constants", () => {
    it("Exposes constants", () => {
      expect(CDK).toBeObject();
    });
  });
  describe("Logger", () => {
    it("Exposes the knowdev logger", () => {
      expect(log.debug).toBeFunction();
      expect(log.error).toBeFunction();
      expect(log.fatal).toBeFunction();
      expect(log.info).toBeFunction();
      expect(log.tag).toBeFunction();
      expect(log.trace).toBeFunction();
      expect(log.untag).toBeFunction();
      expect(log.var).toBeFunction();
      expect(log.warn).toBeFunction();
      expect(log.with).toBeFunction();
    });
  });
});
