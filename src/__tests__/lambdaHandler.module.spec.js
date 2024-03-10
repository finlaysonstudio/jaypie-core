import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createLogWith } from "../core.js";
import { mockLogFactory } from "../../test/mockLog.js";
import { jsonApiErrorSchema } from "../../test/jsonApiSchema.js";

// Subject
import lambdaHandler from "../lambdaHandler.module.js";

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

describe("Lambda Handler Module", () => {
  describe("Base Cases", () => {
    it("Works", () => {
      expect(lambdaHandler).toBeDefined();
      expect(lambdaHandler).toBeFunction();
    });
  });
  describe("Error Conditions", () => {
    it("Throws if not passed a function", () => {
      // Arrange
      // Act
      // Assert
      expect(() => lambdaHandler()).toThrow();
      expect(() => lambdaHandler(42)).toThrow();
      expect(() => lambdaHandler("string")).toThrow();
      expect(() => lambdaHandler({})).toThrow();
      expect(() => lambdaHandler([])).toThrow();
      expect(() => lambdaHandler(null)).toThrow();
      expect(() => lambdaHandler(undefined)).toThrow();
    });
    it("Returns a jaypie error if function throws", async () => {
      // Arrange
      const mockFunction = vi.fn();
      mockFunction.mockRejectedValue(new Error("This error should be caught"));
      const handler = lambdaHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBeObject();
      expect(result).toMatchSchema(jsonApiErrorSchema);
    });
  });
  describe("Observability", () => {
    it("Does not log above trace", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = lambdaHandler(mockFunction);
      // Act
      await handler();
      // Assert
      expect(mockedLog.debug).not.toHaveBeenCalled();
      expect(mockedLog.info).not.toHaveBeenCalled();
      expect(mockedLog.warn).not.toHaveBeenCalled();
      expect(mockedLog.error).not.toHaveBeenCalled();
      expect(mockedLog.fatal).not.toHaveBeenCalled();
    });
    it("Includes the invoke in the log", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = lambdaHandler(mockFunction);
      // Act
      await handler({}, { awsRequestId: "MOCK_AWS_REQUEST_ID" });
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
      const handler = lambdaHandler(mockFunction);
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
      const handler = lambdaHandler(mockFunction);
      // Act
      await handler();
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
    it("Returns what the function returns", async () => {
      // Arrange
      const mockFunction = vi.fn(() => 42);
      const handler = lambdaHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBe(42);
    });
    it("Returns what async functions resolve", async () => {
      // Arrange
      const mockFunction = vi.fn(async () => 42);
      const handler = lambdaHandler(mockFunction);
      // Act
      const result = await handler();
      // Assert
      expect(result).toBe(42);
    });
  });
});
