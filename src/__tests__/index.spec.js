import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Subject
import index from "../index.js";
import { CDK, getHeaderFrom, HTTP } from "../index.js";

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

describe("Jaypie Core", () => {
  it("Exposes a function", () => {
    expect(index).toBeFunction();
  });
  it("Function returns boolean", () => {
    const result = index();
    expect(result).not.toBeUndefined();
    expect(result).toBeBoolean();
  });
  it("Right now it is true 🙃", () => {
    expect(index()).toBeTrue();
  });
  describe("Constants", () => {
    it("Exposes HTTP", () => {
      expect(HTTP).toBeObject();
      expect(CDK).toBeObject();
    });
  });
  describe("Functions", () => {
    it("Exposes getHeaderFrom", () => {
      expect(getHeaderFrom).toBeFunction();
    });
  });
});
