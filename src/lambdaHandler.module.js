import jaypieHandler from "./jaypieHandler.module.js";
import {
  createLogWith,
  JAYPIE,
  moduleLogger as defaultLogger,
  ConfigurationError,
} from "./core.js";

//
//
// Main
//

const lambdaHandler = (
  handler,
  // We rely on jaypieHandler for all defaults... _except_ log
  { name, setup, teardown, unavailable, validate } = {},
) => {
  //
  //
  // Validate
  //

  if (typeof handler !== "function") {
    throw new ConfigurationError(
      "The handler responding to the request encountered a configuration error",
    );
  }

  //
  //
  // Setup
  //

  const moduleLogger = defaultLogger.with({
    layer: JAYPIE.LAYER.LAMBDA,
    lib: JAYPIE.LIB.CORE,
  });
  moduleLogger.trace("[jaypie] Lambda handler init");
  const log = createLogWith({ layer: "handler" });

  //
  //
  // Return
  //

  return jaypieHandler(handler, {
    log,
    name,
    setup,
    teardown,
    unavailable,
    validate,
  });
};

//
//
// Export
//

export default lambdaHandler;
