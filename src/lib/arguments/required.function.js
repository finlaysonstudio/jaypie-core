import { BadRequestError, ConfigurationError } from "../errors.lib.js";
import { TYPE } from "./constants.js";
import validate from "./validate.function.js";

//
//
// Main
//

const required = (value, type, options) => {
  switch (type) {
    case TYPE.ARRAY:
      return validate(value, { type: TYPE.ARRAY, required: true });
    case TYPE.BOOLEAN:
      validate(value, { type: TYPE.BOOLEAN });
      if (!value) {
        throw BadRequestError(
          `Argument "${value}" doesn't match required value "true" for type "boolean"`,
        );
      }
      return value;
    case TYPE.NUMBER:
      return validate(value, {
        type: TYPE.NUMBER,
        required: true,
        falsy: false,
        ...options,
      });
    case TYPE.OBJECT:
      return validate(value, { type: TYPE.OBJECT, required: true });
    case TYPE.STRING:
      return validate(value, {
        type: TYPE.STRING,
        required: true,
        falsy: false,
      });
    default:
      throw TypeError(`Unsupported type, "${type}"`);
  }
};

//
//
// Convenience Functions
//

required.array = (value) => required(value, Array);
required.boolean = (value) => required(value, Boolean);
required.number = (value) => required(value, Number);
required.object = (value) => required(value, Object);
required.positive = (value) => required(value, Number, { minimum: 0 });
required.string = (value, defaultValue = "") =>
  required(value, String, defaultValue);

//
//
// Export
//

export default required;
