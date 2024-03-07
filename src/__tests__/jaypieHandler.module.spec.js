import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { spyLog, restoreLog } from "../../test/mockLog.js"; // test.mockLog

import { HTTP, ProjectError, log } from "../core.js";

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
  spyLog(log);
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  restoreLog(log);
  vi.resetAllMocks();
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
    it("Will catch an unhandled thrown error", async () => {
      // Arrange
      const handler = jaypieHandler(() => {
        throw new Error("Sorpresa!");
      });
      // Act
      try {
        await handler();
      } catch (error) {
        // Assert
        expect(error.isProjectError).toBeTrue();
        expect(error.status).toBe(HTTP.CODE.INTERNAL_ERROR);
      }
      expect.assertions(2);
    });
    it("Will catch an unhandled thrown async error", async () => {
      // Arrange
      const handler = jaypieHandler(async () => {
        throw new Error("Sorpresa!");
      });
      // Act
      try {
        await handler();
      } catch (error) {
        // Assert
        expect(error.isProjectError).toBeTrue();
        expect(error.status).toBe(HTTP.CODE.INTERNAL_ERROR);
      }
    });
  });
  describe("Observability", () => {
    it("Does not log above trace in happy path", async () => {
      // Arrange
      const handler = jaypieHandler(() => {});
      // Act
      await handler();
      // Assert
      expect(log.trace).toHaveBeenCalledTimes(2);
      expect(log.debug).not.toHaveBeenCalled();
      expect(log.info).not.toHaveBeenCalled();
      expect(log.warn).not.toHaveBeenCalled();
      expect(log.error).not.toHaveBeenCalled();
      expect(log.fatal).not.toHaveBeenCalled();
    });
    it("Logs debug if a Jaypie error is caught", async () => {
      // Arrange
      const handler = jaypieHandler(() => {
        throw new ProjectError("Sorpresa!");
      });
      // Act
      try {
        await handler();
      } catch (error) {
        // Assert
        expect(log.debug).toHaveBeenCalledTimes(1);
      }
      expect.assertions(1);
    });
    it("Logs fatal if a non-Jaypie error is caught", async () => {
      // Arrange
      const handler = jaypieHandler(() => {
        throw new Error("Sorpresa!");
      });
      // Act
      try {
        await handler();
      } catch (error) {
        // Assert
        expect(log.fatal).toHaveBeenCalledTimes(1);
      }
      expect.assertions(1);
    });
  });
  describe("Happy Paths", () => {
    it("Calls a function I pass it", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = jaypieHandler(mockFunction);
      const args = [1, 2, 3];
      // Act
      await handler(...args);
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(...args);
    });
    it("Awaits a function I pass it", async () => {
      // Arrange
      const mockFunction = vi.fn(async () => {});
      const handler = jaypieHandler(mockFunction);
      // Act
      await handler();
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
    it("Returns what the function returns", async () => {
      // Arrange
      const mockFunction = vi.fn(() => 42);
      const handler = jaypieHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBe(42);
    });
    it("Returns what async functions resolve", async () => {
      // Arrange
      const mockFunction = vi.fn(async () => 42);
      const handler = jaypieHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBe(42);
    });
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
        it.todo("Will wrap unhandled validate errors in UnhandledError");
        it.todo("Will skip any validate functions that are not functions");
      });
      describe("Setup", () => {
        it.todo("Calls setup functions in order");
        it.todo("Handles any thrown errors");
        it.todo("Will wrap unhandled setup errors in UnhandledError");
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
  describe("Edge Cases", () => {
    it("Literally waits if I pass it a timeout", async () => {
      // Arrange
      const handler = jaypieHandler(async () => {
        // 200ms is unnoticeable to us, but will catch anything that tries to log after the fact
        await new Promise((resolve) => setTimeout(resolve, 200));
      });
      // Act
      const start = Date.now();
      await handler();
      const end = Date.now();
      // Assert
      expect(end - start).toBeGreaterThanOrEqual(200);
    });
    it("Throws an unhandled error if async throws after a delay", async () => {
      // Arrange
      const handler = jaypieHandler(async () => {
        // 200ms is unnoticeable to us, but will catch anything that tries to log after the fact
        await new Promise((resolve) => setTimeout(resolve, 200));
        throw new Error("Sorpresa!");
      });
      // Act
      try {
        await handler();
      } catch (error) {
        // Assert
        expect(error.isProjectError).toBeTrue();
        expect(error.status).toBe(HTTP.CODE.INTERNAL_ERROR);
      }
      expect.assertions(2);
    });
  });
});
