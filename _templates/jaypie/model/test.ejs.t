---
to: <%= path %>/__tests__/<%= name %><%= dotSubtype %>.spec.js
---
<%_ 
  let Subtype = "";
  // If subtype is defined, capitalize the first letter
  if(subtype) Subtype = " " + subtype.charAt(0).toUpperCase() + subtype.slice(1);
_%>
// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { model } from "mongoose";

// Subject
import <%= name %> from "../<%= name %><%= dotSubtype %>.js";

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

describe("<%= Name %> <%= Subtype %>", () => {
  describe("Baseline", () => {
    it("Works", () => {
      expect(<%= name %>).not.toBeUndefined();
      expect(<%= name %>).toBeObject();
    });
    it("Can be turned into a model", () => {
      const Model = model("<%= name %>", <%= name %>);
      expect(Model).not.toBeUndefined();
      expect(() => new Model()).not.toThrow(); // It is a class
    });
    it("Can be instantiated from a model", () => {
      const Model = model("<%= name %>", <%= name %>);
      const document = new Model();
      expect(document).not.toBeUndefined();
      expect(document).toBeObject();
    });
  });
});
