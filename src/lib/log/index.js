import { FORMAT, LEVEL } from "./util/constants.js";
import Logger from "./Logger.js";

//
//
// Normalize environment
//

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
// Export
//

export default log;
