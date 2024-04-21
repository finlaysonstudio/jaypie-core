import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js", // Path to your main JavaScript file
  output: [
    {
      file: "dist/jaypie-core.cjs.js", // Output file for CommonJS
      format: "cjs", // CommonJS format
    },
    {
      file: "dist/jaypie-core.esm.js", // Output file for ES Module
      format: "esm", // ES Module format
    },
  ],
  plugins: [
    resolve(), // Tells Rollup how to find node modules
    commonjs(), // Converts CommonJS modules to ES6
  ],
};
