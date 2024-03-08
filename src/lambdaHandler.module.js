import jaypieHandler from "./jaypieHandler.module.js";

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
  // We rely on jaypieHandler for all defaults
  { name, setup, teardown, unavailable, validate } = {},
) => {
  return jaypieHandler(handler, {
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
