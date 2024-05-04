import { describe, expect, it } from "vitest";

// Subject
import errorVar from "../errorVar.pipeline.js";

const { key, filter } = errorVar;

describe("ErrorVar Pipeline", () => {
  it("Works", () => {
    expect(key).toBe("error");
    const result = filter({ key: "value" });
    expect(result).not.toBeUndefined();
    expect(result).toBeObject();
    expect(result).toEqual({ key: "value" });
  });
  it("Doesn't touch an error string", () => {
    expect(key).toBe("error");
    const result = filter("sorpresa");
    expect(result).not.toBeUndefined();
    expect(result).toBeString();
    expect(result).toEqual("sorpresa");
  });
  it("Doesn't touch an error plain object", () => {
    expect(key).toBe("error");
    const result = filter({ message: "sorpresa" });
    expect(result).not.toBeUndefined();
    expect(result).toBeObject();
    expect(result).toEqual({ message: "sorpresa" });
  });
  it("Only returns the message if the object is an error instance", () => {
    // Arrange
    const error = new Error("Oh, I am slain!");
    // Act
    const result = filter(error);
    // Assert
    expect(result).not.toBeUndefined();
    expect(result).toBeObject();
    expect(result).toEqual({ message: "Oh, I am slain!" });
  });
});
