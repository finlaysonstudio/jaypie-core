import { getCurrentInvoke } from "@codegenie/serverless-express";

//
//
// Main
//

// Adapter for the "@vendia/serverless-express" uuid
function getServerlessExpressUuid() {
  const currentInvoke = getCurrentInvoke();
  if (
    currentInvoke &&
    currentInvoke.context &&
    currentInvoke.context.awsRequestId
  ) {
    return currentInvoke.context.awsRequestId;
  }
  return undefined;
}

//
//
// Export
//

// Must be deferred to runtime
export default () => getServerlessExpressUuid();
