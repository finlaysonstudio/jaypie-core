import { JAYPIE } from "./core/constants.js";
import logger from "./core/logger.module.js";

//
//
// Export
//

// Constants
export { CDK, JAYPIE, PROJECT } from "./core/constants.js";

// Handler
export { default as jaypieHandler } from "./jaypieHandler.module.js";

// KnowDev Libs
export * from "./core/knowdev.lib.js";

// Logger
export const log = logger({
  handler: JAYPIE.UNKNOWN,
  layer: JAYPIE.UNKNOWN,
  logger: JAYPIE.LOGGER.DEFAULT,
});
