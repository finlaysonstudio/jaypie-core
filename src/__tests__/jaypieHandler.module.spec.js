// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import jaypieHandler from "../jaypieHandler.module.js";

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

describe("Jaypie Handler Module", () => {
  describe("Base Cases", () => {
    it("Works", () => {
      expect(jaypieHandler).toBeDefined();
      expect(jaypieHandler).toBeFunction();
    });
  });
  describe("Error Conditions", () => {
    it.todo("Will catch an unhandled thrown error");
    it.todo("Will catch an unhandled thrown async error");
  });
  describe("Observability", () => {
    it.todo("Logs debug if a Jaypie error is caught"); // It is the thrower's responsibility to log the error. Throwing a Jaypie error is an intentional act and the right time to log
    it.todo("Logs fatal if a non-Jaypie error is caught");
  });
  describe("Happy Paths", () => {
    it.todo("Calls a function I pass it");
    it.todo("Awaits a function I pass it");
    it.todo("Returns what the function returns");
    it.todo("Returns what async functions resolve");
  });
  describe("Features", () => {
    describe("Lifecycle Functions", () => {
      describe("Unavailable mode", () => {
        it.todo(
          "Works as normal when process.env.PROJECT_UNAVAILABLE is set to false",
        );
        it.todo(
          "Will respond with a 503 if process.env.PROJECT_UNAVAILABLE is set to true",
        );
        it.todo(
          "Will respond with a 503 if unavailable=true is passed to the handler",
        );
      });
      describe("Validate", () => {
        it.todo("Calls validate functions in order");
        it.todo("Handles any thrown errors");
        it.todo("Will skip any validate functions that are not functions");
      });
      describe("Setup", () => {
        it.todo("Calls setup functions in order");
        it.todo("Handles any thrown errors");
        it.todo("Will skip any setup functions that are not functions");
      });
      describe("Teardown", () => {
        it.todo("Calls teardown functions in order");
        it.todo("Calls all functions even on error");
        it.todo("Will call teardown functions even if setup throws an error");
        it.todo(
          "Will call teardown functions even if the handler throws an error",
        );
        it.todo("Will NOT call teardown functions if validate throws an error");
        it.todo("Will skip any teardown functions that are not functions");
      });
    });
  });
});
