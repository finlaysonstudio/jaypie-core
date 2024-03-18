import { JAYPIE } from "./constants.js";
import { LOG, Logger } from "./knowdev.lib.js";
import logTags from "./logTags.function.js";

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
    this._logger = new Logger({
      format: LOG.FORMAT.JSON,
      level: LOG.LEVEL.SILENT,
      tags: {
        ...logTags(),
        handler,
        layer,
        logger,
        ...tags,
      },
    });
    this._loggers = [];
    this._loggers.push(this._logger);
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
    for (const logger of this._loggers) {
      logger.tag(...args);
    }
  }
  trace(...args) {
    return this._logger.trace(...args);
  }
  untag(...args) {
    for (const logger of this._loggers) {
      logger.untag(...args);
    }
  }
  var(...args) {
    return this._logger.var(...args);
  }
  warn(...args) {
    return this._logger.warn(...args);
  }
  with(...args) {
    const logger = this._logger.with(...args);
    this._loggers.push(logger);
    return logger;
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
