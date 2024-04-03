// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import { JAYPIE, log, PROJECT } from "../core.js";

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
  it("Exposes constants", () => {
    expect(JAYPIE).toBeObject();
    expect(PROJECT.SPONSOR.FINLAYSON).toBe("finlaysonstudio");
  });
  it("Exports log", () => {
    expect(log).toBeObject();
    expect(log.debug).toBeFunction();
    expect(log.error).toBeFunction();
    expect(log.fatal).toBeFunction();
    expect(log.info).toBeFunction();
    expect(log.lib).toBeFunction();
    expect(log.tag).toBeFunction();
    expect(log.trace).toBeFunction();
    expect(log.untag).toBeFunction();
    expect(log.warn).toBeFunction();
    expect(log.with).toBeFunction();
  });
});
