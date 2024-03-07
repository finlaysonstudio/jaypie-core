import HTTP from "@knowdev/http";
import log from "@knowdev/log";

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

// Constants
export { CDK } from "./constants.js";
export { HTTP };
export const LOG_LEVEL = log.LOG_LEVEL;

// Functions
const getHeaderFrom = HTTP.getHeaderFrom;
export { getHeaderFrom };
export { envBoolean, placeholders } from "@knowdev/functions";
export { default as cloneDeep } from "lodash.clonedeep";

// Errors
export {
  BadGatewayError,
  BadRequestError,
  ConfigurationError,
  ERROR,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  IllogicalError,
  InternalError,
  MethodNotAllowedError,
  MultiError,
  // NAME, // Do not export NAME
  NotFoundError,
  NotImplementedError,
  ProjectError,
  ProjectMultiError,
  RejectedError,
  TeapotError,
  UnauthorizedError,
  UnavailableError,
  UnhandledError,
  UnreachableCodeError,
} from "@knowdev/errors";

// Logging
const Logger = log.Logger;
const moduleLogger = log.moduleLogger;
const silent = log.silent;

export { log, Logger, moduleLogger, silent };
