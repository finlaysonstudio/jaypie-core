import { describe, expect, it } from "vitest";

// Subject
import {
  envBoolean,
  formatError,
  getHeaderFrom,
  getObjectKeyCaseInsensitive,
  placeholders,
} from "../functions.lib.js";

//
//
// Run tests
//

describe("Functions Lib", () => {
  it("Exports functions we expect", () => {
    expect(envBoolean).toBeFunction();
    expect(formatError).toBeFunction();
    expect(getHeaderFrom).toBeFunction();
    expect(getObjectKeyCaseInsensitive).toBeFunction();
    expect(placeholders).toBeFunction();
  });
});
