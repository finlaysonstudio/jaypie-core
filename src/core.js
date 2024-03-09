/* eslint-env node */
import { envBoolean, LOG, Logger } from "./core/knowdev.lib.js";

export * from "./core/knowdev.lib.js";
export { CDK, JAYPIE } from "./constants.js";

//
//
// Functions
//

const init = () => {
  // Placeholder
  return true;
};

export const createLogWith = (tags) => {
  return exportedLog.with(tags);
};

const logMethodNames = [
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

/**
 * Redirects the handler's runtime logging to the provided logger
 */
export const redirectLogger = (logger) => {
  for (const method of logMethodNames) {
    exportedLog[`_${method}`] = exportedLog[method];
    exportedLog[method] = logger[method];
  }
};

export const restoreLogger = () => {
  for (const method of logMethodNames) {
    exportedLog[method] = exportedLog[`_${method}`];
  }
};

//
//
// Export
//

// Default
export default init;

const log = new Logger({
  format: LOG.FORMAT.JSON,
});

export const exportedLog = {
  ...log,
  tag: log.tag,
  untag: log.untag,
  with: log.with,
};

let moduleLogger;
if (
  process &&
  process.env &&
  (envBoolean("MODULE_LOGGER", { defaultValue: false }) ||
    process.env.MODULE_LOG_LEVEL)
) {
  if (process.env.MODULE_LOG_LEVEL) {
    moduleLogger = new Logger({
      format: LOG.FORMAT.JSON,
      level: process.env.MODULE_LOG_LEVEL,
      tags: { layer: "module" },
    });
  } else {
    moduleLogger = new Logger({
      format: LOG.FORMAT.JSON,
      level: process.env.LOG_LEVEL,
      tags: { layer: "module" },
    });
  }
} else {
  moduleLogger = new Logger({
    format: LOG.FORMAT.JSON,
    level: LOG.LEVEL.SILENT,
    tags: { layer: "module" },
  });
}
export { moduleLogger };
