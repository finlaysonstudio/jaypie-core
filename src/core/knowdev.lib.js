// ! Heads up!
// * Everything exported from this file is exported from the package
// * Do _NOT ADD_ without consideration as to whether it should be public
// * Do _NOT REMOVE_ without replacement in core and exporting that replacement in index
// ====== END WARNING

import validate from "@knowdev/arguments";
import log from "@knowdev/log";

import { getHeaderFrom } from "../lib/functions.lib.js";

//
//
// Export
//

// Constants
const VALIDATE = validate.TYPE;

export { VALIDATE };
export const LOG = {
  FORMAT: log.LOG_FORMAT,
  LEVEL: log.LOG_LEVEL,
};

// Functions
const force = validate.force;
export { force, getHeaderFrom, validate };
import functions from "@knowdev/functions";
const { envBoolean, placeholders } = functions;
export { envBoolean, placeholders };
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
