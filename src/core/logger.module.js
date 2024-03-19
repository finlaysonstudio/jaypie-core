import Logger from "@knowdev/log";

import { JAYPIE } from "./constants.js";
import { ConfigurationError, envBoolean, LOG } from "./knowdev.lib.js";
import logTags from "./logTags.function.js";

//
//
// Jaypie Logger Chassis
//

class JaypieLogger {
  constructor({
    layer = JAYPIE.UNKNOWN,
    level = process.env.LOG_LEVEL, // DEFAULT.LEVEL provided by Logger is debug
    tags = {},
  } = {}) {
    this.level = level;
    this.layer = layer;
    // _NOT_ tagging `level`
    this._tags = { ...logTags(), layer, ...tags };
    this._logger = new Logger.Logger({
      format: LOG.FORMAT.JSON,
      level,
      tags: this._tags,
    });
    this._loggers = [];
    this._loggers.push(this._logger);
    this._withLoggers = {};
    // Make sure `var()` is available under each level
    const levels = ["debug", "error", "fatal", "info", "trace", "warn"];
    for (const level of levels) {
      this[level].var = (...args) => {
        this._logger[level].var(...args);
      };
    }
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
    if (!args || typeof args !== "object") {
      throw new ConfigurationError();
    }
    const loggerKey = JSON.stringify(args);
    if (Object.keys(this._withLoggers).includes(loggerKey)) {
      return this._withLoggers[loggerKey];
    }
    const logger = new JaypieLogger({
      layer: this.layer,
      level: this.level,
      tags: { ...this._tags },
    });
    logger._logger = this._logger.with(...args);
    logger._loggers = [logger._logger];
    this._withLoggers[loggerKey] = logger;
    this._loggers.push(logger._logger);
    return logger;
  }

  // Jaypie-specifics

  lib({ layer, lib, tags = {} } = {}) {
    const logger = new JaypieLogger({
      layer,
      level: () => {
        if (process.env.MODULE_LOG_LEVEL) {
          return process.env.MODULE_LOG_LEVEL;
        }
        if (envBoolean("MODULE_LOGGER", { defaultValue: false })) {
          return process.env.LOG_LEVEL;
        }
        return LOG.LEVEL.SILENT;
      },
      tags: { ...this._tags, lib, ...tags },
    });
    this._loggers.push(logger);
    return logger;
  }

  silent({ layer, lib, tags = {} } = {}) {
    const logger = new JaypieLogger({
      layer,
      level: LOG.LEVEL.SILENT,
      tags: { ...this._tags, lib, ...tags },
    });
    this._loggers.push(logger);
    return logger;
  }
}

//
//
// Main
//

const init = ({ layer = JAYPIE.UNKNOWN, tags = {} } = {}) => {
  const jaypieLogger = new JaypieLogger({
    layer,
    tags,
  });
  return jaypieLogger;
};

//
//
// Export
//

export default init;
