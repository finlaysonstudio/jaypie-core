import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createLogWith, HTTP } from "../core.js";
import { mockLogFactory } from "../../test/mockLog.js";
import { jsonApiErrorSchema } from "../../test/jsonApiSchema.js";

// Subject
import expressHandler from "../expressHandler.module.js";

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
let mockedLog;
beforeEach(() => {
  process.env = { ...process.env };
  createLogWith.mockReturnValue((mockedLog = mockLogFactory()));
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  vi.clearAllMocks();
});

//
//
// Run tests
//

describe("Express Handler Module", () => {
  describe("Base Cases", () => {
    it("Works", () => {
      expect(expressHandler).toBeDefined();
      expect(expressHandler).toBeFunction();
    });
  });
  describe("Error Conditions", () => {
    it("Throws if not passed a function", () => {
      // Arrange
      // Act
      // Assert
      expect(() => expressHandler()).toThrow();
      expect(() => expressHandler(42)).toThrow();
      expect(() => expressHandler("string")).toThrow();
      expect(() => expressHandler({})).toThrow();
      expect(() => expressHandler([])).toThrow();
      expect(() => expressHandler(null)).toThrow();
      expect(() => expressHandler(undefined)).toThrow();
    });
    it("Returns a jaypie error if function throws", async () => {
      // Arrange
      const mockFunction = vi.fn();
      mockFunction.mockRejectedValue(new Error("This error should be caught"));
      const handler = expressHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBeObject();
      expect(result).toMatchSchema(jsonApiErrorSchema);
    });
    it("Returns an error if a lifecycle function throws", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction, {
        validate: [
          async () => {
            throw new Error("Sorpresa!");
          },
        ],
      });
      // Act
      const result = await handler();
      // Assert
      expect(result).toBeObject();
      expect(result).toMatchSchema(jsonApiErrorSchema);
      expect(result.errors[0].status).toBe(HTTP.CODE.INTERNAL_ERROR);
    });
    it("Returns unavailable if PROJECT_UNAVAILABLE is set", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction, {
        unavailable: true,
      });
      // Act
      const result = await handler();
      // Assert
      expect(result).toBeObject();
      expect(result).toMatchSchema(jsonApiErrorSchema);
      expect(result.errors[0].status).toBe(HTTP.CODE.UNAVAILABLE);
    });
  });
  describe("Observability", () => {
    it("Does not log above trace", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction);
      // Act
      await handler();
      // Assert
      expect(mockedLog.debug).not.toHaveBeenCalled();
      expect(mockedLog.info).not.toHaveBeenCalled();
      expect(mockedLog.warn).not.toHaveBeenCalled();
      expect(mockedLog.error).not.toHaveBeenCalled();
      expect(mockedLog.fatal).not.toHaveBeenCalled();
    });
    it.todo("Includes the invoke in the log", async () => {
      // TODO: mock the serverless function
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction);
      // Act
      await handler();
      // Assert
      expect(mockedLog.tag).toHaveBeenCalledTimes(1);
      expect(mockedLog.tag).toHaveBeenCalledWith({
        invoke: "MOCK_AWS_REQUEST_ID",
      });
    });
  });
  describe("Happy Paths", () => {
    it("Calls a function I pass it", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction);
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
      const handler = expressHandler(mockFunction);
      // Act
      await handler();
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
    it("Returns what the function returns", async () => {
      // Arrange
      const mockFunction = vi.fn(() => 42);
      const handler = expressHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBe(42);
    });
    it("Returns what async functions resolve", async () => {
      // Arrange
      const mockFunction = vi.fn(async () => 42);
      const handler = expressHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBe(42);
    });
  });
});
