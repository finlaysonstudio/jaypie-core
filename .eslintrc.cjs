module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    // "Add plugin:prettier/recommended as the last item in the extends array in your .eslintrc* config file, so that eslint-config-prettier has the opportunity to override other configs"
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: [
        "__tests__/**",
        "_templates/**",
        ".eslintrc.cjs",
        "*.spec.js",
        "*.test.js",
      ],
      env: {
        node: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
};
