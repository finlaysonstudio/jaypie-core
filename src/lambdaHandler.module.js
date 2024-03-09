import jaypieHandler from "./jaypieHandler.module.js";
import {
  createLogWith,
  JAYPIE,
  logTags,
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

  let response;

  const moduleLogger = defaultLogger.with(
    logTags({
      handler: name || handler.name || JAYPIE.UNKNOWN,
      layer: JAYPIE.LAYER.LAMBDA,
      lib: JAYPIE.LIB.CORE,
    }),
  );
  moduleLogger.trace("[jaypie] Lambda handler init");

  // This will be the public logger
  const log = createLogWith(
    logTags({
      handler: name || handler.name || JAYPIE.UNKNOWN,
      layer: JAYPIE.LAYER.HANDLER,
    }),
  );

  //
  //
  // Process
  //

  response = jaypieHandler(handler, {
    log,
    name,
    setup,
    teardown,
    unavailable,
    validate,
  });

  //
  //
  // Error Handling
  //

  //
  //
  // Postprocess
  //

  //
  //
  // Return
  //

  return response;
};

//
//
// Export
//

export default lambdaHandler;
