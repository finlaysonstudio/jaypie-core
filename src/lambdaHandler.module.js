import jaypieHandler from "./jaypieHandler.module.js";
import { createLogWith, moduleLogger } from "./core.js";

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
  moduleLogger.trace("[jaypie] Lambda handler init");
  const log = createLogWith({ module: "lambdaHandler" });
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
