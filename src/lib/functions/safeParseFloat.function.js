//
//
// Main
//

export default (value) => {
  if (typeof value === "string") {
    return Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  }
  return value;
};
