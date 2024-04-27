import { afterEach, describe, expect, it, vi } from "vitest";

// Subject
import logVar from "../logVar.function.js";

//
//
// Mock modules
//

// vi.mock("../file.js");
// vi.mock("module");

afterEach(() => {
  vi.clearAllMocks();
});

//
//
// Run tests
//

describe("LogVar Function", () => {
  it("Works", async () => {
    const response = logVar();
    expect(response).not.toBeUndefined();
    expect(response).toBeObject();
    expect(response).toEqual({});
  });
  describe("Features", () => {
    it("Returns the key:value", () => {
      const response = logVar("key", "value");
      expect(response).toEqual({ key: "value" });
    });
    it("Value param is empty and first param is object with one pair, return it", () => {
      const response = logVar({ key: "value" }, undefined);
      expect(response).toEqual({ key: "value" });
    });
    it("Value param is empty and first param is string with one pair, return key:value of undefined", () => {
      const response = logVar("key", undefined);
      expect(response).toEqual({ key: "" });
    });
    it("If key and value are empty, return empty object", () => {
      const response = logVar(undefined, undefined);
      expect(response).toEqual({});
    });
    it("If key is object with more than one pair, return a single-key object with the key `value`", () => {
      const response = logVar({ key: "value", key2: "value2" });
      expect(response).toEqual({ value: { key: "value", key2: "value2" } });
    });
    it("If the key is a string and the value is an object, return key:object", () => {
      const response = logVar("key", { key: "value" });
      expect(response).toEqual({ key: { key: "value" } });
    });
  });
});
