import axiosResponseVarPipeline from "./axiosResponseVar.pipeline.js";
import forceVar from "./forceVar.function.js";

const pipelines = [axiosResponseVarPipeline];

//
//
// Helpers
//

function keyValueToArray(keyValue) {
  return [Object.keys(keyValue)[0], keyValue[Object.keys(keyValue)[0]]];
}

//
//
// Main
//

const logVar = (key, value) => {
  // This back-and-forth is needed to support (key, value) and ({ key: value }) formats
  [key, value] = keyValueToArray(forceVar(key, value));

  for (const pipeline of pipelines) {
    if (key === pipeline.key) {
      value = pipeline.filter(value);
    }
  }

  return { [key]: value };
};

//
//
// Export
//

export default logVar;
