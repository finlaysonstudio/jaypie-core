import jaypieHandler from "./jaypieHandler.module.js";
import {
  createLogWith,
  JAYPIE,
  moduleLogger as defaultLogger,
} from "./core.js";

//
//
// Constants
//

//
//
// Helper Functions
//

//
//
// Main
//

const lambdaHandler = (
  handler,
  // We rely on jaypieHandler for all defaults... _except_ log
  { name, setup, teardown, unavailable, validate } = {},
) => {
  const moduleLogger = defaultLogger.with({
    layer: JAYPIE.LAYER.LAMBDA,
    lib: JAYPIE.LIB.CORE,
  });
  moduleLogger.trace("[jaypie] Lambda handler init");
  const log = createLogWith({ layer: "handler" });
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
