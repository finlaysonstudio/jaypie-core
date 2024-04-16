import knowdevErrors from "@knowdev/errors";

import { TYPE } from "./constants.js";

const { BadRequestError, ConfigurationError } = knowdevErrors;

//
//
// Main
//

const validate = (
  argument,
  { type = TYPE.ANY, falsy = true, required = true, throws = true } = {},
) => {
  //
  //
  // Setup
  //
  const isUndefined = argument === undefined;
  let matchesType = false;
  let valid = false;

  //
  //
  // Check Type
  //
  switch (type) {
    case TYPE.ANY:
      matchesType = true;
      break;
    case TYPE.ARRAY:
      if (Array.isArray(argument)) matchesType = true;
      break;
    case TYPE.CLASS:
      if (typeof argument === "function") {
        try {
          // eslint-disable-next-line new-cap, no-new
          new argument();
          matchesType = true;
        } catch (e) {
          matchesType = false;
        }
      }
      break;
    case TYPE.FUNCTION:
      matchesType = typeof argument === "function";
      if (typeof argument === "function") {
        try {
          // eslint-disable-next-line new-cap, no-new
          new argument();
          matchesType = false;
        } catch (e) {
          matchesType = true;
        }
      }
      break;
    case TYPE.NUMBER:
      matchesType = typeof argument === "number";
      break;
    case TYPE.NULL:
      matchesType = argument === null;
      break;
    case TYPE.OBJECT:
      matchesType = typeof argument === "object";
      matchesType = matchesType && argument !== null;
      matchesType = matchesType && !Array.isArray(argument);
      break;
    case TYPE.STRING:
      matchesType = typeof argument === "string";
      break;
    case TYPE.UNDEFINED:
      matchesType = argument === undefined;
      break;

    default:
      throw ConfigurationError(`Unknown validate type "${type}"`);
  }

  //
  //
  // Determine Valid
  //
  valid = matchesType;
  // If it is required
  if (required) {
    // As long as the type isn't undefined
    if (type !== TYPE.UNDEFINED) {
      valid = valid && !isUndefined;

      // Reject falsy numbers and strings by default
      if (type === TYPE.NUMBER || type === TYPE.STRING) {
        if (!falsy) {
          if (!argument) valid = false;
        }
      }
    }
    // Otherwise (not required) allow undefined
  } else if (argument === undefined) valid = true;

  //
  //
  // Throw?
  //
  if (!valid && throws) {
    switch (type) {
      case TYPE.ANY:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "any"`,
        );
      case TYPE.ARRAY:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "array"`,
        );
      case TYPE.CLASS:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "class"`,
        );
      case TYPE.FUNCTION:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "function"`,
        );
      case TYPE.NUMBER:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "number"`,
        );
      case TYPE.NULL:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "null"`,
        );
      case TYPE.OBJECT:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "object"`,
        );
      case TYPE.STRING:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "string"`,
        );
      case TYPE.UNDEFINED:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "undefined"`,
        );

      default:
        throw BadRequestError(
          `Argument "${argument}" doesn't match type "${type}"`,
        );
    }
  }

  //
  //
  // Return
  //
  return valid;
};

//
//
// Export
//

export default validate;
