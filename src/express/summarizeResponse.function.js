//
//
// Main
//

export default function summarizeResponse(res, extras) {
  if (typeof res !== "object") {
    return {};
  }

  const { getHeaders, statusCode, statusMessage } = res;
  const headers = getHeaders ? getHeaders() : undefined;

  return {
    headers,
    statusCode,
    statusMessage,
    ...extras,
  };
}
