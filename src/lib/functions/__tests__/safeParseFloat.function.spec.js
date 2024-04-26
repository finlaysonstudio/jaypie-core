import { describe, expect, it } from "vitest";

// Subject
import safeParseFloat from "../safeParseFloat.function.js";

//
//
// Run tests
//

describe("Safe Parse Float Function", () => {
  it("Works", () => {
    expect(safeParseFloat("1")).toBe(1);
    expect(safeParseFloat("1.1")).toBe(1.1);
    expect(safeParseFloat("NaN")).toBe(0);
  });
});
