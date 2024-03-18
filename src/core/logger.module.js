import { envBoolean, LOG, Logger } from "./knowdev.lib.js";

import { JAYPIE } from "./constants.js";

import logTags from "./logTags.function.js";

//
//
// Constants
//

const LOG_METHOD_NAMES = [
  "debug",
  "error",
  "fatal",
  "info",
  "tag",
  "trace",
  "untag",
  "var",
  "warn",
  "with",
];

//
//
// Helpers
//

function logFactory({ ...tags } = {}) {
  const log = new Logger({
    format: LOG.FORMAT.JSON,
    tags: {
      ...logTags(),
      ...tags,
    },
  });
  return log;
}

//
//
// Jaypie Logger Chassis
//

class JaypieLogger {
  constructor({
    handler = JAYPIE.UNKNOWN,
    layer = JAYPIE.UNKNOWN,
    logger = JAYPIE.UNKNOWN,
    ...tags
  } = {}) {
    this._logger = logFactory({
      handler,
      layer,
      logger,
      ...tags,
    });
    this._initialLogger = this._logger;
  }
  debug(...args) {
    return this._logger.debug(...args);
  }
  error(...args) {
    return this._logger.error(...args);
  }
  fatal(...args) {
    return this._logger.fatal(...args);
  }
  info(...args) {
    return this._logger.info(...args);
  }
  tag(...args) {
    return this._logger.tag(...args);
  }
  trace(...args) {
    return this._logger.trace(...args);
  }
  untag(...args) {
    return this._logger.untag(...args);
  }
  var(...args) {
    return this._logger.var(...args);
  }
  warn(...args) {
    return this._logger.warn(...args);
  }
  with(...args) {
    return this._logger.with(...args);
  }
}

//
//
// Main
//

const init = ({
  handler = JAYPIE.UNKNOWN,
  layer = JAYPIE.UNKNOWN,
  logger = JAYPIE.UNKNOWN,
  ...tags
} = {}) => {
  const jaypieLogger = new JaypieLogger({
    handler,
    layer,
    logger,
    ...tags,
  });
  return jaypieLogger;
};

//
//
// Export
//

export default init;
