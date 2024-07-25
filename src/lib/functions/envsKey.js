import getObjectKeyCaseInsensitive from "./getObjectKeyCaseInsensitive.js";
import validate, { force } from "../arguments/index.js";
import { JAYPIE, log as defaultLogger } from "../../core.js";

const LOCAL_ENV = "local";

//
//
// Main
//

/**
 * return process.env.${KEY} || ENV_${ENV}_${KEY}
 * @param {Object} options - Options.
 * @param {string} options.env - Environment key.
 * @param {boolean} options.hints - Log hints that encourage best practices
 * @returns {string} MongoDB URI.
 * @example const mongodbUri = envsKey("MONGODB_URI", { env: "SANDBOX", hints: true }); // returns MONGODB_URI || ENV_SANDBOX_MONGODB_URI
 */
const envsKey = (
  key,
  {
    env = process.env.PROJECT_ENV || process.env.DEFAULT_ENV,
    quiet = false,
  } = {},
) => {
  const log = defaultLogger.lib({ lib: JAYPIE.LIB.CORE });

  // Validate
  env = force.string(env);
  validate.string(key, { falsy: false });

  if (!env) {
    env = LOCAL_ENV;
    if (!quiet) {
      log.warn(
        `No environment key provided. Pass an environment key or set DEFAULT_ENV. Using ${String(`ENV_${env}_${key}`).toUpperCase()} as default environment key`,
      );
    }
  }

  // Setup
  const envKey = String(`ENV_${env}_${key}`).toUpperCase();
  const envValue = getObjectKeyCaseInsensitive(process.env, envKey);
  const overrideKey = getObjectKeyCaseInsensitive(process.env, key);

  // Return ${key} first, but hint about ${envKey}
  if (overrideKey) {
    if (!quiet) {
      log.trace(`Using ${key} from environment.`);
      if (envValue) {
        log.warn(
          `Overriding ${envKey} with ${key}. Remove ${key} to prefer ${envKey}.`,
        );
      } else {
        log.debug(
          "MONGODB_URI overrides environment-specific values. Set ENV_SANDBOX_MONGODB_URI to connect to sandbox by default and pass --env KEY to use the ENV_${KEY}_MONGODB_URI",
        );
      }
    }
    return overrideKey;
  }

  if (envValue) {
    if (!quiet) log.trace(`Using ${envKey} from environment.`);
    return envValue;
  }
  if (!quiet) log.warn(`${key} not found in environment`);
  return false;
};

//
//
// Export
//

export default envsKey;
