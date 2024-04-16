import { afterEach, beforeEach, describe, expect, it } from "vitest";

// Subject
import argumentsLib from "../arguments.lib.js";
import { force, TYPE } from "../arguments.lib.js";

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

describe("Arguments Lib", () => {
  it("Exports what we expect", () => {
    expect(force).toBeFunction();
    expect(TYPE).toBeObject();
    expect(argumentsLib).toBeFunction();
  });
});
