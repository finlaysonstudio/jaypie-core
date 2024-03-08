/**
 * The goal of the "Client" test (in uppercase to distinguish it)
 * is to test the library interface as a client would use it
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import { lambdaHandler, log } from "../index.js";

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

describe("Client", () => {
  describe("Lambda Handler", () => {
    it("Calls a function I provide it", () => {
      // Arrange
      const mockFunction = vi.fn((...args) => {
        log.info("Mock function called");
        log.var({ args });
      });
      const handler = lambdaHandler(mockFunction);
      const args = [1, 2, 3];
      // Act
      handler(...args);
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(...args);
    });
    it.todo("Provides the handler a logger with module:lambda");
  });
});
