// ! Heads up!
// * Everything exported from this file is exported from the package
// * Do _NOT ADD_ without consideration as to whether it should be public
// * Do _NOT REMOVE_ without replacement in core and exporting that replacement in index
// ====== END WARNING

import validate from "../lib/arguments.lib.js";
import { force, TYPE as VALIDATE } from "../lib/arguments.lib.js";
import log from "../lib/log.lib.js";

import { getHeaderFrom } from "../lib/functions.lib.js";

//
//
// Export
//

// Constants
export { VALIDATE };
export const LOG = {
  FORMAT: log.LOG_FORMAT,
  LEVEL: log.LOG_LEVEL,
};

// Functions
export { force, getHeaderFrom, validate };
export { envBoolean, placeholders } from "../lib/functions.lib.js";
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
} from "../lib/errors.lib.js";
