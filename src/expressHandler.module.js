// Core
import {
  ConfigurationError,
  createLogWith,
  JAYPIE,
  logTags,
  moduleLogger as defaultLogger,
  UnhandledError,
} from "./core.js";
// Express
import getCurrentInvokeUuid from "./express/getCurrentInvokeUuid.adapter.js";
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
    let response;

    try {
      moduleLogger.trace("[jaypie] Express execution");
      const invoke = getCurrentInvokeUuid();
      if (invoke) log.tag({ invoke });
      // TODO: Log the request
      // log.info.var({ req: summarizeRequest(req) });

      //
      //
      // Process
      //

      response = await jaypieFunction({ req });

      //
      //
      // Error Handling
      //
    } catch (error) {
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
    // Return
    //

    // TODO: Log the response
    // log.info.var({ res: summarizeResponse(res) });

    // TODO: send the response with res.send
    return response;
  };
};

//
//
// Export
//

export default expressHandler;
