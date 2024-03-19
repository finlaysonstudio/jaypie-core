import Logger from "@knowdev/log";

import { JAYPIE } from "./constants.js";
import { envBoolean, LOG } from "./knowdev.lib.js";
import logTags from "./logTags.function.js";

//
//
// Jaypie Logger Chassis
//

class JaypieLogger {
  constructor({
    handler = JAYPIE.UNKNOWN,
    layer = JAYPIE.UNKNOWN,
    level = process.env.LOG_LEVEL, // DEFAULT.LEVEL provided by Logger is debug
    logger = JAYPIE.UNKNOWN,
    ...tags
  } = {}) {
    this.level = level;
    // _NOT_ tagging `level`
    this._tags = { ...logTags(), handler, layer, logger, ...tags };
    this._logger = new Logger.Logger({
      format: LOG.FORMAT.JSON,
      level,
      tags: this._tags,
    });
    this._loggers = [];
    this._loggers.push(this._logger);
  }

  // @knowdev/log "classic" methods

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
    // Add args to this._tags
    this._tags = { ...this._tags, ...args };
  }
  trace(...args) {
    return this._logger.trace(...args);
  }
  untag(...args) {
    for (const logger of this._loggers) {
      logger.untag(...args);
    }
    // Remove args from this._tags
    for (const key of Object.keys(args)) {
      delete this._tags[key];
    }
  }
  var(...args) {
    return this._logger.var(...args);
  }
  warn(...args) {
    return this._logger.warn(...args);
  }
  with(...args) {
    const logger = new JaypieLogger({
      ...this._tags,
      level: this.level,
      ...args,
    });
    this._loggers.push(logger);
    return logger;
  }

  // Jaypie-specifics

  lib({ layer, lib, ...tags } = {}) {
    const logger = new JaypieLogger({
      ...this._tags,
      layer,
      lib,
      ...tags,
      level: () => {
        if (process.env.MODULE_LOG_LEVEL) {
          return process.env.MODULE_LOG_LEVEL;
        }
        if (envBoolean("MODULE_LOGGER", { defaultValue: false })) {
          return process.env.LOG_LEVEL;
        }
        return LOG.LEVEL.SILENT;
      },
    });
    this._loggers.push(logger);
    return logger;
  }

  silent({ ...tags } = {}) {
    const logger = new JaypieLogger({
      ...this._tags,
      ...tags,
      level: LOG.LEVEL.SILENT,
    });
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
