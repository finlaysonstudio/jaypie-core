import HTTP from "@knowdev/http";
import log from "@knowdev/log";

//
//
// Functions
//

const getHeaderFrom = HTTP.getHeaderFrom;

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

// Constants
export { CDK } from "./constants";
export { HTTP };
export const LOG_LEVEL = log.LOG_LEVEL;

// Functions
export { getHeaderFrom };

// Logging
const Logger = log.Logger;
const moduleLogger = log.moduleLogger;
const silent = log.silent;

export { log, Logger, moduleLogger, silent };
