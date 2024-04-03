import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Subject
// eslint-disable-next-line import/default
import index from "../index.js";
import {
  // eslint-disable-next-line import/named
  exportedLog,
  getHeaderFrom,
  HTTP,
  jaypieHandler,
  LOG,
  log,
  // eslint-disable-next-line import/named
  NAME,
  ProjectError,
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
  it("Exports no default", () => {
    expect(index).toBeUndefined();
  });
  describe("Constants", () => {
    it("Exposes HTTP", () => {
      expect(HTTP).toBeObject();
      expect(LOG).toBeObject();
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
    it("Exposes log", () => {
      expect(log).toBeObject();
    });
    it("Does not expose exportedLog", () => {
      expect(exportedLog).toBeUndefined();
    });
  });
  describe("Jaypie", () => {
    it("Exposes jaypieHandler", () => {
      expect(jaypieHandler).toBeFunction();
    });
  });
});
