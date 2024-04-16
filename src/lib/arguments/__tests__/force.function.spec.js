import { describe, expect, it } from "vitest";

import force from "../force.function.js";

//
//
// Run tests
//

describe("Force function", () => {
  describe("Arrays", () => {
    it("Forces arrays", () => {
      const response = force("taco", Array);
      expect(response).toBeArray();
      expect(response).toIncludeSameMembers(["taco"]);
    });
    it("Returns arrays untouched", () => {
      const tacos = ["beef", "chicken"];
      const response = force(tacos, Array);
      expect(response).toBeArray();
      expect(response).toBe(tacos);
    });
  });
  describe("Objects", () => {
    it("Forces objects", () => {
      const response = force("taco", Object);
      expect(response).toBeObject();
      expect(response).toEqual({ value: "taco" });
    });
    it("Forces objects with a key", () => {
      const response = force("taco", Object, "food");
      expect(response).toBeObject();
      expect(response).toEqual({ food: "taco" });
    });
    it("Returns objects untouched", () => {
      const taco = { type: "beef" };
      const response = force(taco, Object);
      expect(response).toBeObject();
      expect(response).toBe(taco);
    });
    it("Parses JSON", () => {
      const response = force('{"taco":"beef"}', Object);
      expect(response).toBeObject();
      expect(response).toEqual({ taco: "beef" });
    });
  });
  describe("Strings", () => {
    it("Converts null to 'null'", () => {
      const response = force(null, String);
      expect(response).toBeString();
    });
    it("Converts objects to JSON", () => {
      const response = force({ taco: "beef" }, String);
      expect(response).toBeString();
      expect(response).toBe('{"taco":"beef"}');
    });
    it("Runs everything else through toString()", () => {
      const response = force(42, String);
      expect(response).toBeString();
      expect(response).toBe("42");
    });
    it("Converts undefined to empty string (because this is the default)", () => {
      const response = force(undefined, String);
      expect(response).toBeString();
      expect(response).toBe("");
    });
    it("Converts undefined to default when passed", () => {
      const response = force(undefined, String, 42);
      expect(response).toBeString();
      expect(response).toBe("42");
    });
    it("Returns strings untouched", () => {
      const response = force("taco", String);
      expect(response).toBeString();
      expect(response).toBe("taco");
    });
  });

  describe("Convenience Functions", () => {
    it("Forces arrays", () => {
      expect(force.array).toBeFunction();
      expect(force.array("taco")).toBeArray();
    });
    it("Forces objects", () => {
      expect(force.object).toBeFunction();
      expect(force.object("taco")).toBeObject();
    });
    it("Forces strings", () => {
      expect(force.string).toBeFunction();
      expect(force.string(42)).toBeString();
      expect(force.string()).toBeString();
      expect(force.string(undefined, "taco")).toBe("taco");
    });
  });
});
