import { lambdaHandler, log } from "@jaypie/core";

export default lambdaHandler(
  // eslint-disable-next-line no-unused-vars
  async (event, context) => {
    log.trace("Logging in trace mode");
    log.info("Hello, world!");
    return "Hello, world!";
  },
  {
    name: "helloWorld",
  },
);
