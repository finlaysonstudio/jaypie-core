import { envBoolean } from "../functions.lib.js";

import { FORMAT, LEVEL } from "./util/constants.js";
import Logger from "./Logger.js";

//
//
// Normalize environment
//

process.env.MODULE_LOGGER = envBoolean("MODULE_LOGGER", {
  defaultValue: false,
});

//
//
// Instance
//

const log = new Logger();

//
//
// Decorate
//

log.log = log.debug;
log.LOG_FORMAT = FORMAT;
log.LOG_LEVEL = LEVEL;
log.Logger = Logger;
log.silent = new Logger({ level: LEVEL.SILENT });

//
//
// Sub-module logger
//

if (process.env.MODULE_LOGGER) {
  if (process.env.MODULE_LOG_LEVEL) {
    log.moduleLogger = new Logger({ level: process.env.MODULE_LOG_LEVEL });
  } else {
    log.moduleLogger = new Logger({ level: process.env.LOG_LEVEL });
  }
} else {
  log.moduleLogger = new Logger({ level: LEVEL.SILENT });
}

//
//
// Export
//

export default log;
