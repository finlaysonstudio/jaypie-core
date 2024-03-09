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
    createLogWith: vi.fn((tags) => actual.exportedLog.with(tags)),
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
    it("Creates a logger with module:lambda", async () => {
      // Arrange
      const handler = lambdaHandler(vi.fn());
      // Act
      await handler();
      // Assert
      expect(createLogWith).toHaveBeenCalledTimes(1);
      expect(createLogWith).toHaveBeenCalledWith({ module: "lambdaHandler" });
    });
    it("Passes jaypieHandler its own log, not the one we pass it", async () => {
      // Arrange
      const log = mockLogFactory();
      const handler = lambdaHandler(vi.fn(), { log });
      // Act
      await handler();
      // Assert
      expect(createLogWith).toHaveBeenCalledTimes(1);
      expect(log.trace).not.toHaveBeenCalled();
      expect(moduleLogger.trace).toHaveBeenCalled();
    });
  });
});