import { moduleLogger } from "../core.js";

//
//
// Main
//

export default function summarizeResponse(res, extras) {
  if (typeof res !== "object") {
    return {};
  }

  let headers;
  const { getHeaders, statusCode, statusMessage } = res;
  try {
    headers = getHeaders ? getHeaders() : undefined;
  } catch (error) {
    moduleLogger.warn("[jaypie] Failed to get headers from Express response");
    moduleLogger.var({ managedError: error.message });
  }

  return {
    headers,
    statusCode,
    statusMessage,
    ...extras,
  };
}
