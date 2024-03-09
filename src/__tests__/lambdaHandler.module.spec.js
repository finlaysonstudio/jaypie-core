// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import jaypieHandler from "../jaypieHandler.module.js";

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

vi.mock("../jaypieHandler.module.js");

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
  describe("Under the Hood jaypieHandler.mock", () => {
    it("Passes my handler onto jaypieHandler", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = lambdaHandler(mockFunction, { name: "test" });
      // console.log("jaypieHandler :>> ", jaypieHandler);
      // Act
      await handler();
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(jaypieHandler).toHaveBeenCalledTimes(1);
      const [passedHandler, options] = jaypieHandler.mock.calls[0];
      expect(passedHandler).toBe(mockFunction);
      expect(options).toBeObject();
      expect(options.name).toBe("test");
      expect(options.log).toBeObject();
    });
    it("Passes logger jaypieHandler", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = lambdaHandler(mockFunction);
      // Act
      await handler();
      // eslint-disable-next-line no-unused-vars
      const [passedHandler, options] = jaypieHandler.mock.calls[0];
      expect(options.log).toBeObject();
    });
  });
});
