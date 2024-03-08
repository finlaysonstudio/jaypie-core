// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import {
  cloneDeep,
  envBoolean,
  force,
  getHeaderFrom,
  HTTP,
  LOG,
  // eslint-disable-next-line import/named
  log,
  Logger,
  moduleLogger,
  // eslint-disable-next-line import/named
  NAME,
  ProjectError,
  placeholders,
  silent,
  validate,
  VALIDATE,
} from "../knowdev.lib.js";

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

describe("KnowDev Lib", () => {
  describe("Constants", () => {
    it("Exposes constants", () => {
      expect(HTTP).toBeObject();
      expect(LOG).toBeObject();
      expect(VALIDATE).toBeObject();
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
      expect(force).toBeFunction();
      expect(getHeaderFrom).toBeFunction();
      expect(placeholders).toBeFunction();
      expect(validate).toBeFunction();
    });
    it("cloneDeep works as expected", () => {
      const obj = { a: { b: { c: 1 } } };
      const clone = cloneDeep(obj);
      expect(clone).not.toBe(obj);
      expect(clone).toEqual(obj);
    });
  });
  describe("Logging", () => {
    it("Exposes Logger, moduleLogger, and silent", () => {
      expect(Logger).toBeFunction();
      expect(moduleLogger).toBeObject();
      expect(silent).toBeObject();
    });
    it("Does NOT expose log", () => {
      expect(log).toBeUndefined();
    });
    it("Logger can be instantiated", () => {
      const logger = new Logger();
      expect(logger).toBeObject();
      expect(logger).toBeInstanceOf(Logger);
      expect(logger.trace).toBeFunction();
    });
  });
});
