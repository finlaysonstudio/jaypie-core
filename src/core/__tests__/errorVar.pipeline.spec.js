import { afterEach, describe, expect, it, vi } from "vitest";

// Subject
import errorVar from "../errorVar.pipeline.js";

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

describe("ErrorVar Pipeline", () => {
  it("Works", async () => {
    const response = await errorVar();
    console.log("response :>> ", response);
    expect(response).not.toBeUndefined();
  });
});
