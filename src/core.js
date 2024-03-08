/* eslint-env node */
import { LOG, Logger } from "./core/knowdev.lib.js";

export * from "./core/knowdev.lib.js";
export { CDK } from "./constants.js";

//
//
// Functions
//

const init = () => {
  // Placeholder
  return true;
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
export { log };

let moduleLogger;
if (
  process &&
  process.env &&
  (process.env.MODULE_LOGGER || process.env.MODULE_LOG_LEVEL)
) {
  if (process.env.MODULE_LOG_LEVEL) {
    moduleLogger = new Logger({
      format: LOG.FORMAT.JSON,
      level: process.env.MODULE_LOG_LEVEL,
    });
  } else {
    moduleLogger = new Logger({
      format: LOG.FORMAT.JSON,
      level: process.env.LOG_LEVEL,
    });
  }
} else {
  moduleLogger = new Logger({
    format: LOG.FORMAT.JSON,
    level: LOG.LEVEL.SILENT,
  });
}
export { moduleLogger };
