import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Subject
// eslint-disable-next-line import/default
import index from "../index.js";
import {
  getHeaderFrom,
  HTTP,
  jaypieHandler,
  LOG,
  log,
  ProjectError,
  uuid,
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
  });
  describe("Functions", () => {
    it("Exposes convenience functions", () => {
      expect(getHeaderFrom).toBeFunction();
      expect(uuid).toBeFunction();
    });
  });
  describe("Logging", () => {
    it("Exposes log", () => {
      expect(log).toBeObject();
    });
  });
  describe("Jaypie", () => {
    it("Exposes jaypieHandler", () => {
      expect(jaypieHandler).toBeFunction();
    });
  });
});
