import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Subject
import index from "../index.js";
import {
  CDK,
  getHeaderFrom,
  HTTP,
  LOG_LEVEL,
  log,
  Logger,
  moduleLogger,
  // eslint-disable-next-line import/named
  NAME,
  ProjectError,
  silent,
} from "../index.js";

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
    expect(index).toBeFunction();
  });
  it("Function returns boolean", () => {
    const result = index();
    expect(result).not.toBeUndefined();
    expect(result).toBeBoolean();
  });
  it("Right now it is true 🙃", () => {
    expect(index()).toBeTrue();
  });
  describe("Constants", () => {
    it("Exposes HTTP", () => {
      expect(CDK).toBeObject();
      expect(HTTP).toBeObject();
      expect(LOG_LEVEL).toBeObject();
    });
  });
  describe("Errors", () => {
    it("Exposes ProjectError", () => {
      expect(ProjectError).toBeFunction();
    });
    it("Does not expose NAME", () => {
      expect(NAME).toBeUndefined();
      // If it does expose name:
      //   - Delete this test if you want to expose NAME, especially if it is not "ProjectError"
      //   - If you did not want to expose name and it is ProjectError, now is the time to fix it
    });
  });
  describe("Functions", () => {
    it("Exposes getHeaderFrom", () => {
      expect(getHeaderFrom).toBeFunction();
    });
  });
  describe("Logging", () => {
    it("Exposes log, Logger, moduleLogger, and silent", () => {
      expect(log).toBeObject();
      expect(Logger).toBeFunction();
      expect(moduleLogger).toBeObject();
      expect(silent).toBeObject();
    });
    it("Logger can be instantiated", () => {
      const logger = new Logger();
      expect(logger).toBeObject();
      expect(logger).toBeInstanceOf(Logger);
      expect(logger.trace).toBeFunction();
    });
  });
});
