// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import core from "../core.js";
// eslint-disable-next-line import/named
import { CDK, exportedLog, log, moduleLogger } from "../core.js";

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
    it("Exports a knowdev logger for internal use", () => {
      expect(moduleLogger.debug).toBeFunction();
      expect(moduleLogger.error).toBeFunction();
      expect(moduleLogger.fatal).toBeFunction();
      expect(moduleLogger.info).toBeFunction();
      expect(moduleLogger.tag).toBeFunction();
      expect(moduleLogger.trace).toBeFunction();
      expect(moduleLogger.untag).toBeFunction();
      expect(moduleLogger.var).toBeFunction();
      expect(moduleLogger.warn).toBeFunction();
      expect(moduleLogger.with).toBeFunction();
    });
    it("Exports a knowdev logger for external use", () => {
      expect(exportedLog.debug).toBeFunction();
      expect(exportedLog.error).toBeFunction();
      expect(exportedLog.fatal).toBeFunction();
      expect(exportedLog.info).toBeFunction();
      expect(exportedLog.tag).toBeFunction();
      expect(exportedLog.trace).toBeFunction();
      expect(exportedLog.untag).toBeFunction();
      expect(exportedLog.var).toBeFunction();
      expect(exportedLog.warn).toBeFunction();
      expect(exportedLog.with).toBeFunction();
    });
    it("Does NOT export log", () => {
      expect(log).toBeUndefined();
    });
  });
});
