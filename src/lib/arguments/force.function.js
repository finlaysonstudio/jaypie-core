import { TYPE } from "./constants.js";

//
//
// Main
//

const force = (value, type, key = "") => {
  switch (type) {
    case TYPE.ARRAY:
      if (!Array.isArray(value)) return [value];
      return value;
    case TYPE.BOOLEAN:
      if (typeof value === "string") {
        value = value.toLowerCase();
        if (
          value === "" ||
          value === "0" ||
          value === "f" ||
          value === "false" ||
          value === "n" ||
          value === "no"
        ) {
          return false;
        } else {
          return true;
        }
      }
      return Boolean(value);
    case TYPE.NUMBER:
      return Number(value);
    case TYPE.OBJECT:
      if (!key) key = "value"; // eslint-disable-line no-param-reassign
      // If it is a string, try parsing as JSON but catch errors
      if (typeof value === "string") {
        try {
          value = JSON.parse(value); // eslint-disable-line no-param-reassign
        } catch (error) {
          // Do nothing
        }
      }
      if (typeof value !== "object") return { [key]: value };
      return value;
    case TYPE.STRING:
      if (value === null) return "null";
      if (value === undefined) return String(key);
      if (typeof value === "object") return JSON.stringify(value);
      return String(value);
    default:
      throw TypeError(`Unsupported type, "${type}"`);
  }
};

//
//
// Convenience Functions
//

force.array = (value) => force(value, Array);
force.boolean = (value) => force(value, Boolean);
force.number = (value) => force(value, Number);
force.object = (value, key = "value") => force(value, Object, key);
force.string = (value, defaultValue = "") => force(value, String, defaultValue);

//
//
// Export
//

export default force;
