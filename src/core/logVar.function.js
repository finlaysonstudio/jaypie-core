import forceVar from "./forceVar.function.js";

//
//
// Main
//

const logVar = (key, value) => {
  const keyValue = forceVar(key, value);
  return keyValue;
};

//
//
// Export
//

export default logVar;
