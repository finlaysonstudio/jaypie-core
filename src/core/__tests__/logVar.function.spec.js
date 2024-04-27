import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import forceVar from "../forceVar.function.js";

// Subject
import logVar from "../logVar.function.js";

//
//
// Mock constants
//

const MOCK = {
  VAR: { key: "value" },
};

//
//
// Mock modules
//

vi.mock("../forceVar.function.js");

beforeEach(() => {
  forceVar.mockReturnValue(MOCK.VAR);
});

afterEach(() => {
  vi.clearAllMocks();
});

//
//
// Run tests
//

describe("LogVar Function", () => {
  it("Works", async () => {
    const response = logVar({ project: "mayhem" });
    expect(response).not.toBeUndefined();
    expect(response).toBeObject();
    expect(response).toEqual(MOCK.VAR);
  });
  describe("Features", () => {
    it("Calls forceVar first", () => {
      const response = logVar("key", "value");
      expect(forceVar).toHaveBeenCalled();
      expect(response).toBeObject();
    });
  });
});
