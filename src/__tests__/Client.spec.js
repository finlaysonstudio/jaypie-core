/**
 * The goal of the "Client" test (in uppercase to distinguish it)
 * is to test the library interface as a client would use it
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import { lambdaHandler, log } from "../index.js";
import { createLogWith, moduleLogger } from "../core.js";
import { mockLogFactory, restoreLog, spyLog } from "../../test/mockLog.js";

//
//
// Mock constants
//

//
//
// Mock modules
//

vi.mock("../core.js", async () => {
  const actual = await vi.importActual("../core.js");
  const module = {
    ...actual,
    createLogWith: vi.fn(),
  };
  return module;
});

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
  createLogWith.mockReturnValue(mockLogFactory());
  spyLog(log);
  spyLog(moduleLogger);
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  restoreLog(log);
  restoreLog(moduleLogger);
  vi.resetAllMocks();
});

//
//
// Run tests
//

describe("Client", () => {
  describe("Lambda Handler", () => {
    it("Calls a function I provide it", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = lambdaHandler(mockFunction);
      const args = [1, 2, 3];
      // Act
      await handler(...args);
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(...args);
    });
    it("Creates a logger", async () => {
      // Arrange
      const handler = lambdaHandler(vi.fn());
      // Act
      await handler();
      // Assert
      expect(createLogWith).toHaveBeenCalledTimes(1);
    });
    it("Passes jaypieHandler its own log, not the one we pass it", async () => {
      // Arrange
      const honeypot = mockLogFactory();
      const handler = lambdaHandler(vi.fn(), { log: honeypot });
      // Act
      await handler();
      // Assert
      expect(createLogWith).toHaveBeenCalledTimes(1);
      expect(honeypot.trace).not.toHaveBeenCalled();
      expect(moduleLogger.trace).toHaveBeenCalled();
    });
  });
});
