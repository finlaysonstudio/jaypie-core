// Core
import {
  ConfigurationError,
  createLogWith,
  HTTP,
  JAYPIE,
  logTags,
  moduleLogger as defaultLogger,
  UnhandledError,
} from "./core.js";
// Express
import getCurrentInvokeUuid from "./express/getCurrentInvokeUuid.adapter.js";
import summarizeRequest from "./express/summarizeRequest.function.js";
import summarizeResponse from "./express/summarizeResponse.function.js";
// Jaypie
import jaypieHandler from "./jaypieHandler.module.js";

//
//
// Main
//

const expressHandler = (
  handler,
  // We rely on jaypieHandler for all defaults... _except_ log
  { name, setup, teardown, unavailable, validate } = {},
) => {
  //
  //
  // Validate
  //

  if (typeof handler !== "function") {
    throw new ConfigurationError(
      "The handler responding to the request encountered a configuration error",
    );
  }

  //
  //
  // Setup
  //

  const moduleLogger = defaultLogger.with(
    logTags({
      handler: name || handler.name || JAYPIE.UNKNOWN,
      layer: JAYPIE.LAYER.EXPRESS,
      lib: JAYPIE.LIB.CORE,
    }),
  );
  moduleLogger.trace("[jaypie] Express init");

  // This will be the public logger
  const log = createLogWith(
    logTags({
      handler: name || handler.name || JAYPIE.UNKNOWN,
      layer: JAYPIE.LAYER.HANDLER,
    }),
  );

  //
  //
  // Preprocess
  //

  const jaypieFunction = jaypieHandler(handler, {
    log,
    moduleLogger,
    name,
    setup,
    teardown,
    unavailable,
    validate,
  });

  // eslint-disable-next-line no-unused-vars
  return async (req, res, ...unused) => {
    if (typeof res !== "object") {
      throw new ConfigurationError(
        "The handler encountered a response configuration error",
      );
    }
    let success = false;
    let response;

    try {
      moduleLogger.trace("[jaypie] Express execution");
      const invoke = getCurrentInvokeUuid();
      if (invoke) log.tag({ invoke });
      log.info.var({ req: summarizeRequest(req) });

      //
      //
      // Process
      //

      response = await jaypieFunction({ req });
      success = true;

      //
      //
      // Error Handling
      //
    } catch (error) {
      success = false;
      // Jaypie or "project" errors are intentional and should be handled like expected cases
      if (error.isProjectError) {
        log.debug("Caught jaypie error");
        log.var({ jaypieError: error });
        response = error.json();
      } else {
        // Otherwise, flag unhandled errors as fatal
        log.fatal("Caught unhandled error");
        log.var({ unhandledError: error.message });
        response = UnhandledError().json();
      }
    }

    //
    //
    // Postprocess
    //

    if (response === undefined || response === null) {
      res.status(HTTP.CODE.NO_CONTENT).send();
    } else {
      if (typeof response === "object") {
        res.json(response);
      } else {
        res.send(response);
      }
    }

    //
    //
    // Return
    //

    log.info.var({ res: summarizeResponse(res) });

    return success; // `true` on success, `false` on errors
  };
};

//
//
// Export
//

export default expressHandler;
