// eslint-disable-next-line no-unused-vars
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import logger from "../logger.module.js";

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

afterEach(() => {
  vi.clearAllMocks();
});

//
//
// Custom Matchers
//

const LOG_METHOD_NAMES = [
  "debug",
  "error",
  "fatal",
  "info",
  "tag",
  "trace",
  "untag",
  "var",
  "warn",
  "with",
];

expect.extend({
  toBeJaypieLogger(received) {
    const isObject = typeof received === "object" && received !== null;
    const hasLoggerMethods = LOG_METHOD_NAMES.every(
      (method) => typeof received[method] === "function",
    );

    if (isObject && hasLoggerMethods) {
      return {
        message: () => `expected ${received} to be a JaypieLogger`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be a JaypieLogger with all required logger methods`,
        pass: false,
      };
    }
  },
});

//
//
// Run tests
//

describe("Logger Module", () => {
  it("Is a function", () => {
    expect(logger).toBeFunction();
  });
  it("Works", () => {
    const response = logger();
    expect(response).not.toBeUndefined();
  });
  describe("Features", () => {
    it("Returns a logger", () => {
      const response = logger();
      expect(response).toBeObject();
      expect(response).toBeJaypieLogger();
    });
    it("The logger logs", () => {
      const log = logger();
      const nothing = log.debug("Hello, world!");
      expect(nothing).toBeUndefined();
    });
    it("Can be forked with `with`", () => {
      // Arrange
      const log = logger();
      // Act
      const fork = log.with({ project: "mayhem" });
      // Assert
      expect(fork).toBeJaypieLogger();
      expect(fork).not.toBe(log);
    });
    it("Calls to `tag` push down to children", () => {
      // Arrange
      const log = logger();
      const fork = log.with({ project: "mayhem" });
      vi.spyOn(log, "tag");
      vi.spyOn(fork, "tag");
      // Assure
      expect(log.tag).not.toHaveBeenCalled();
      expect(fork.tag).not.toHaveBeenCalled();
      // Act
      log.tag({ street: "paper" });
      // Assert
      expect(log.tag).toHaveBeenCalled();
      expect(fork.tag).toHaveBeenCalled();
    });
    it("Calls to `untag` push down to children", () => {
      // Arrange
      const log = logger();
      const fork = log.with({ project: "mayhem" });
      vi.spyOn(log, "untag");
      vi.spyOn(fork, "untag");
      // Assure
      expect(log.untag).not.toHaveBeenCalled();
      expect(fork.untag).not.toHaveBeenCalled();
      // Act
      log.untag("street");
      // Assert
      expect(log.untag).toHaveBeenCalled();
      expect(fork.untag).toHaveBeenCalled();
    });
    it("Tagging a child logger does not affect the parent", () => {
      // Arrange
      const log = logger();
      const fork = log.with({ project: "mayhem" });
      vi.spyOn(log, "tag");
      vi.spyOn(fork, "tag");
      // Assure
      expect(log.tag).not.toHaveBeenCalled();
      expect(fork.tag).not.toHaveBeenCalled();
      // Act
      fork.tag({ street: "paper" });
      // Assert
      expect(log.tag).not.toHaveBeenCalled();
      expect(fork.tag).toHaveBeenCalled();
    });
    it("Untagging a child logger does not affect the parent", () => {
      // Arrange
      const log = logger();
      const fork = log.with({ project: "mayhem" });
      vi.spyOn(log, "untag");
      vi.spyOn(fork, "untag");
      // Assure
      expect(log.untag).not.toHaveBeenCalled();
      expect(fork.untag).not.toHaveBeenCalled();
      // Act
      fork.untag("street");
      // Assert
      expect(log.untag).not.toHaveBeenCalled();
      expect(fork.untag).toHaveBeenCalled();
    });
    it("Calling log.module({...tags}) presents the module logger", () => {
      // Arrange
      const log = logger();
      vi.spyOn(log, "with");
      // Act
      const moduleLogger = log.module({ project: "mayhem" });
      // Assert
      expect(moduleLogger).toBeJaypieLogger();
    });
    it("module logger responds to tags of the original logger", () => {
      // Arrange
      const log = logger();
      const moduleLogger = log.module({ project: "mayhem" });
      vi.spyOn(moduleLogger, "tag");
      // Act
      log.tag({ street: "paper" });
      // Assert
      expect(moduleLogger.tag).toHaveBeenCalled();
    });
  });
});
