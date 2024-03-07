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
    {
      files: ["*.cjs"],
      rules: {
        "import/no-commonjs": "off",
      },
    },
    {
      files: ["__tests__/**", "**/*.spec.js", "**/*.test.js"],
      plugins: ["vitest"],
      extends: ["plugin:vitest/recommended"],
      rules: {
        "vitest/no-focused-tests": "error",
        "vitest/no-disabled-tests": "warn",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "import/extensions": ["error", "ignorePackages"],
    "import/no-commonjs": "error",
  },
};
