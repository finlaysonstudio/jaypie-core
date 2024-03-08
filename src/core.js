import { LOG, Logger } from "./core/knowdev.lib.js";

export * from "./core/knowdev.lib.js";
export { CDK } from "./constants.js";

//
//
// Functions
//

const init = () => {
  // Placeholder
  return true;
};

//
//
// Export
//

// Default
export default init;

const log = new Logger({
  format: LOG.FORMAT.JSON,
});
export { log };
