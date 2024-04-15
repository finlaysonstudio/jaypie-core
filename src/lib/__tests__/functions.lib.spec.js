import { describe, expect, it } from "vitest";

// Subject
import { formatError, getHeaderFrom } from "../functions.lib.js";

//
//
// Run tests
//

describe("Functions Lib", () => {
  it("Exports functions we expect", () => {
    expect(formatError).toBeFunction();
    expect(getHeaderFrom).toBeFunction();
  });
});
