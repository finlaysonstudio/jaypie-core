// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: "input",
    name: "nameInput",
    message: "Model name, singular (e.g., 'user'):",
    onSubmit: (name, value, input) => {
      input.state.answers.name = value;
    },
  },
  {
    type: "input",
    name: "pathInput",
    initial: "express/models",
    message: "Path (always 'express/models'):",
    onSubmit: (name, value, input) => {
      // Remove leading './' and trailing '/'
      value = value.replace(/^\.?\/|\/$/g, "");
      input.state.answers.path = value;
    },
  },
  {
    type: "input",
    name: "subtypeInput",
    initial: "schema",
    message: "Subtype (always 'schema'):",
    onSubmit: (name, value, input) => {
      input.state.answers.subtype = value;
      input.state.answers.dotSubtype = value ? `.${value}` : "";
    },
  },
  {
    type: "input",
    name: "subspecInput",
    initial: "express:model",
    message: "Sub-spec test command (always 'express:model'):",
    onSubmit: (name, value, input) => {
      input.state.answers.subspec = value;
      input.state.answers.colonSubspec = value ? `:${value}` : "";
    },
  },
];
