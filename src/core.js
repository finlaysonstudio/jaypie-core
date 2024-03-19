import logger from "./core/logger.module.js";

//
//
// Export
//

// Core
export { CDK, JAYPIE, PROJECT } from "./core/constants.js";
export * from "./core/knowdev.lib.js";

// Logger
export const log = logger();
