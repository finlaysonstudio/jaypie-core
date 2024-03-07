// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import core from "../core.js";
import {
  CDK,
  cloneDeep,
  envBoolean,
  getHeaderFrom,
  HTTP,
  LOG_LEVEL,
  log,
  Logger,
  moduleLogger,
  // eslint-disable-next-line import/named
  NAME,
  ProjectError,
  placeholders,
  silent,
} from "../core.js";

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
    it("Exposes envBoolean, getHeaderFrom, and placeholders", () => {
      expect(cloneDeep).toBeFunction();
      expect(envBoolean).toBeFunction();
      expect(getHeaderFrom).toBeFunction();
      expect(placeholders).toBeFunction();
    });
    it("cloneDeep works as expected", () => {
      const obj = { a: { b: { c: 1 } } };
      const clone = cloneDeep(obj);
      expect(clone).not.toBe(obj);
      expect(clone).toEqual(obj);
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
