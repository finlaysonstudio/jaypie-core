import { describe, expect, it } from "vitest";

// Subject
import summarizeResponse from "../summarizeResponse.function.js";

//
//
// Run tests
//

describe("Summarize request util", () => {
  it("Is a function ^^", () => {
    expect(typeof summarizeResponse).toBe("function");
  });
  it("Returns an object with the expected properties", () => {
    const res = {
      getHeaders: () => "MOCK_HEADERS",
      statusCode: "MOCK_STATUS_CODE",
      statusMessage: "MOCK_STATUS_MESSAGE",
    };
    const result = summarizeResponse(res);
    expect(result).toEqual({
      headers: "MOCK_HEADERS",
      statusCode: "MOCK_STATUS_CODE",
      statusMessage: "MOCK_STATUS_MESSAGE",
    });
  });
  it("Works when extras are passed", () => {
    const res = {
      getHeaders: () => "MOCK_HEADERS",
      statusCode: "MOCK_STATUS_CODE",
      statusMessage: "MOCK_STATUS_MESSAGE",
    };
    const result = summarizeResponse(res, { extra: "value" });
    expect(result).toEqual({
      headers: "MOCK_HEADERS",
      statusCode: "MOCK_STATUS_CODE",
      statusMessage: "MOCK_STATUS_MESSAGE",
      extra: "value",
    });
  });
  it("Works when the response has no headers", () => {
    const res = {
      getHeaders: () => undefined,
      statusCode: "MOCK_STATUS_CODE",
      statusMessage: "MOCK_STATUS_MESSAGE",
    };
    const result = summarizeResponse(res);
    expect(result).toEqual({
      statusCode: "MOCK_STATUS_CODE",
      statusMessage: "MOCK_STATUS_MESSAGE",
    });
  });
  it("Works when res is not an object", () => {
    const res = "MOCK_RES";
    const result = summarizeResponse(res);
    expect(result).toEqual({});
  });
  it("Works when res is undefined", () => {
    const res = undefined;
    const result = summarizeResponse(res);
    expect(result).toEqual({});
  });
});
