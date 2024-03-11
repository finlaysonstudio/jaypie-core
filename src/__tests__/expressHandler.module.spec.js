import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  createLogWith,
  ForbiddenError,
  HTTP,
  NotFoundError,
  MultiError,
} from "../core.js";
import { mockLogFactory } from "../../test/mockLog.js";
import { jsonApiErrorSchema } from "../../test/jsonApiSchema.js";

import getCurrentInvokeUuid from "../express/getCurrentInvokeUuid.adapter.js";
import summarizeRequest from "../express/summarizeRequest.function.js";
import summarizeResponse from "../express/summarizeResponse.function.js";

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

vi.mock("../express/getCurrentInvokeUuid.adapter.js");
vi.mock("../express/summarizeRequest.function.js");
vi.mock("../express/summarizeResponse.function.js");

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
let mockedLog;
let req;
let res;
beforeEach(() => {
  process.env = { ...process.env };
  createLogWith.mockReturnValue((mockedLog = mockLogFactory()));
  getCurrentInvokeUuid.mockReturnValue("MOCK_AWS_REQUEST_ID");
  req = { MOCK: "REQUEST" };
  res = mockRes();
  summarizeRequest.mockReturnValue("MOCK_SUMMARIZED_REQUEST");
  summarizeResponse.mockReturnValue("MOCK_SUMMARIZED_RESPONSE");
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  vi.clearAllMocks();
});

//
//
// Mock factory
//

function mockRes() {
  const res = {
    json: vi.fn(),
    send: vi.fn(),
    status: vi.fn(),
  };
  // Loop over the methods and make them all return the res
  for (const method of Object.keys(res)) {
    res[method].mockReturnValue(res);
  }
  return res;
}

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
      const result = await handler(req, res);
      // Assert
      expect(result).toBeFalse();
      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HTTP.CODE.INTERNAL_ERROR);
      const body = res.json.mock.calls[0][0];
      expect(body).toMatchSchema(jsonApiErrorSchema);
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
      const result = await handler(req, res);
      // Assert
      expect(result).toBeFalse();
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HTTP.CODE.INTERNAL_ERROR);
      const body = res.json.mock.calls[0][0];
      expect(body).toMatchSchema(jsonApiErrorSchema);
      expect(body.errors[0].status).toBe(HTTP.CODE.INTERNAL_ERROR);
    });
    it("Returns unavailable if PROJECT_UNAVAILABLE is set", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction, {
        unavailable: true,
      });
      // Act
      const result = await handler(req, res);
      // Assert
      expect(result).toBeFalse();
      expect(result).toBeFalse();
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HTTP.CODE.UNAVAILABLE);
      const body = res.json.mock.calls[0][0];
      expect(body).toMatchSchema(jsonApiErrorSchema);
      expect(body.errors[0].status).toBe(HTTP.CODE.UNAVAILABLE);
    });
    it("Calls status with the error status thrown", async () => {
      // Arrange
      const mockFunction = vi.fn(() => {
        throw new NotFoundError("This error should be caught");
      });
      const handler = expressHandler(mockFunction);
      // Act
      await handler(req, res);
      // Assert
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HTTP.CODE.NOT_FOUND);
    });
    it("Observes multi-error merging", async () => {
      // Arrange
      const mockFunction = vi.fn(() => {
        throw new MultiError([
          new NotFoundError("This error should be caught"),
          new ForbiddenError("This error should be caught"),
        ]);
      });
      const handler = expressHandler(mockFunction);
      // Act
      await handler(req, res);
      // Assert
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HTTP.CODE.BAD_REQUEST);
    });
    it.todo("Returns an error if a local throws");
  });
  describe("Observability", () => {
    it("Does not log above trace", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction);
      // Act
      await handler(req, res);
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
      const handler = expressHandler(mockFunction);
      // Act
      await handler(req, res);
      // Assert
      expect(getCurrentInvokeUuid).toHaveBeenCalled();
      expect(mockedLog.tag).toHaveBeenCalledTimes(1);
      expect(mockedLog.tag).toHaveBeenCalledWith({
        invoke: "MOCK_AWS_REQUEST_ID",
      });
    });
    it("Logs the request and response as info", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction);
      // Act
      await handler(req, res);
      // Assert
      expect(summarizeRequest).toHaveBeenCalled();
      expect(summarizeResponse).toHaveBeenCalled();
      expect(mockedLog.info.var).toHaveBeenCalledTimes(2);
    });
  });
  describe("Happy Paths", () => {
    it("Calls a function I pass it", async () => {
      // Arrange
      const mockFunction = vi.fn();
      const handler = expressHandler(mockFunction);
      const args = ["one", res, "three"];
      // Act
      await handler(...args);
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith({ req: "one" });
    });
    it("Awaits a function I pass it", async () => {
      // Arrange
      const mockFunction = vi.fn(async () => {});
      const handler = expressHandler(mockFunction);
      // Act
      await handler(req, res);
      // Assert
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
    describe("Features", () => {
      it("Responds no content if the function returns undefined", async () => {
        // Arrange
        const mockFunction = vi.fn(() => undefined);
        const handler = expressHandler(mockFunction);
        // Act
        const result = await handler({}, res);
        // Assert
        expect(result).toBeTrue();
        expect(res.json).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(HTTP.CODE.NO_CONTENT);
      });
      it("Responds no content if the function returns null", async () => {
        // Arrange
        const mockFunction = vi.fn(() => null);
        const handler = expressHandler(mockFunction);
        // Act
        const result = await handler({}, res);
        // Assert
        expect(result).toBeTrue();
        expect(res.json).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(HTTP.CODE.NO_CONTENT);
      });
      it("Responds text/html if the function returns a non-object", async () => {
        // Arrange
        const mockFunction = vi.fn(() => "Hello, world!");
        const handler = expressHandler(mockFunction);
        // Act
        const result = await handler({}, res);
        // Assert
        expect(result).toBeTrue();
        expect(res.json).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith("Hello, world!");
        expect(res.status).not.toHaveBeenCalled();
      });
      it("Response JSON when the function returns an object", async () => {
        // Arrange
        const mockFunction = vi.fn(() => ({ hello: "world" }));
        const handler = expressHandler(mockFunction);
        // Act
        const result = await handler({}, res);
        // Assert
        expect(result).toBeTrue();
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ hello: "world" });
        expect(res.send).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
      });
      it("Response JSON when the function returns an array", async () => {
        // Arrange
        const mockFunction = vi.fn(() => ["hello", "world"]);
        const handler = expressHandler(mockFunction);
        // Act
        const result = await handler({}, res);
        // Assert
        expect(result).toBeTrue();
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(["hello", "world"]);
        expect(res.send).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
      });
      it.todo("Decorates response headers");
      it.todo("Populates locals");
    });
  });
});
