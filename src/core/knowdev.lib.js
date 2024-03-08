import validate from "@knowdev/arguments";
import HTTP from "@knowdev/http";
import log from "@knowdev/log";

//
//
// Export
//

// Constants
const VALIDATE = validate.TYPE;

export { HTTP, VALIDATE };
export const LOG = {
  FORMAT: log.LOG_FORMAT,
  LEVEL: log.LOG_LEVEL,
};

// Functions
const force = validate.force;
const getHeaderFrom = HTTP.getHeaderFrom;
export { force, getHeaderFrom, validate };
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

// Intentionally not exporting `log` or `moduleLogger`
export { Logger, silent };
