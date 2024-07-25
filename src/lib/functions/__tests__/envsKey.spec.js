import { restoreLog, spyLog } from "@jaypie/testkit";
import { log } from "../../../core.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Subject
import envsKey from "../envsKey.js";

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
  spyLog(log);
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  vi.clearAllMocks();
  restoreLog(log);
});

//
//
// Run tests
//

describe("EnvsKey Function", () => {
  it("Works", async () => {
    // Arrange
    process.env.MOCK_KEY = "MOCK_VALUE";
    // Act
    const response = envsKey("MOCK_KEY");
    // Assert
    expect(response).not.toBeFalse();
    expect(response).toBe("MOCK_VALUE");
  });
  describe("Error Conditions", () => {
    it("Throws error if key is not provided", () => {
      expect(() => {
        envsKey();
      }).toThrowJaypieError();
    });
    it("Throws error if key is not a string", () => {
      expect(() => {
        envsKey(1);
      }).toThrowJaypieError();
    });
    it("Throws error if key is falsy", () => {
      expect(() => {
        envsKey();
      }).toThrowJaypieError();
    });
  });
  describe("Happy Path", () => {
    beforeEach(() => {
      // Arrange
      process.env.PROJECT_ENV = "TEST";
      process.env.ENV_TEST_MOCK_KEY = "MOCK_VALUE";
    });
    it("Does not log above trace", () => {
      // Act
      envsKey("MOCK_KEY");
      // Assert
      expect(log.trace).toHaveBeenCalled();
      expect(log.debug).not.toHaveBeenCalled();
      expect(log.info).not.toHaveBeenCalled();
      expect(log.warn).not.toHaveBeenCalled();
      expect(log.error).not.toHaveBeenCalled();
      expect(log.fatal).not.toHaveBeenCalled();
    });
  });
  describe("Features", () => {
    it("Is case insensitive on passed key", () => {
      // Arrange
      process.env.MOCK_KEY = "MOCK_VALUE";
      // Act
      const response = envsKey("mock_key");
      // Assert
      expect(response).not.toBeFalse();
      expect(response).toBe("MOCK_VALUE");
    });
    it("Is case insensitive on object key", () => {
      // Arrange
      process.env.mock_key = "MOCK_VALUE";
      // Act
      const response = envsKey("MOCK_KEY");
      // Assert
      expect(response).not.toBeFalse();
      expect(response).toBe("MOCK_VALUE");
    });
    describe("Logging", () => {
      it("Logs a warning if no env is set", () => {
        // Act
        envsKey("MOCK_KEY", { env: "" });
        // Assert
        expect(log.warn).toHaveBeenCalled();
        expect(log.warn).toHaveBeenCalledWith(
          "No environment key provided. Pass an environment key or set DEFAULT_ENV. Using ENV_LOCAL_MOCK_KEY as default environment key",
        );
      });
      it("Logs warning if env-specific key is overridden", () => {
        // Arrange
        process.env.MOCK_KEY = "MOCK_VALUE";
        process.env.ENV_TEST_MOCK_KEY = "MOCK_VALUE";
        // Act
        envsKey("MOCK_KEY", { env: "TEST" });
        // Assert
        expect(log.warn).toHaveBeenCalled();
        expect(log.warn).toHaveBeenCalledWith(
          "Overriding ENV_TEST_MOCK_KEY with MOCK_KEY. Remove MOCK_KEY to prefer ENV_TEST_MOCK_KEY.",
        );
      });
      it("Logs debug if global key is used", () => {
        // Arrange
        process.env.MOCK_KEY = "MOCK_VALUE";
        delete process.env.ENV_TEST_MOCK_KEY;
        // Act
        envsKey("MOCK_KEY", { env: "TEST" });
        // Assert
        expect(log.debug).toHaveBeenCalled();
      });
      it("Logs warning if key not found", () => {
        // Act
        envsKey("MOCK_KEY");
        // Assert
        expect(log.warn).toHaveBeenCalled();
        expect(log.warn).toHaveBeenCalledWith(
          "MOCK_KEY not found in environment",
        );
      });
    });
  });
});
