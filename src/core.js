import { JAYPIE } from "./core/constants.js";
import logger from "./core/logger.module.js";

//
//
// Export
//

// Core
export { CDK, JAYPIE, PROJECT } from "./core/constants.js";
export * from "./core/knowdev.lib.js";

// Logger
export const log = logger({
  handler: JAYPIE.UNKNOWN,
  layer: JAYPIE.UNKNOWN,
  logger: JAYPIE.LOGGER.DEFAULT,
});
