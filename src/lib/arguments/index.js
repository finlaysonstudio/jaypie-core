import { TYPE } from "./constants.js";
import force from "./force.function.js";
import validate from "./validate.function.js";

//
//
// Convenience functions
//

validate.array = (argument, options) =>
  validate(argument, { type: TYPE.ARRAY, ...options });
validate.boolean = (argument, options) =>
  validate(argument, { type: TYPE.BOOLEAN, ...options });
validate.class = (argument, options) =>
  validate(argument, { type: TYPE.CLASS, ...options });
validate.function = (argument, options) =>
  validate(argument, { type: TYPE.FUNCTION, ...options });
validate.null = (argument, options) =>
  validate(argument, { type: TYPE.NULL, ...options });
validate.number = (argument, options) =>
  validate(argument, { type: TYPE.NUMBER, ...options });
validate.object = (argument, options) =>
  validate(argument, { type: TYPE.OBJECT, ...options });
validate.string = (argument, options) =>
  validate(argument, { type: TYPE.STRING, ...options });
validate.undefined = (argument, options) =>
  validate(argument, { type: TYPE.UNDEFINED, ...options });

//
//
// Export
//

export default validate;
export { force, TYPE };
