import handler from "./index.js";

const result = await handler({}, { awsRequestId: "_abc123" });
// eslint-disable-next-line no-console
console.log("result :>> ", result);
