// Import Third-party Dependencies
import { ESLintConfig, globals } from "@openally/config.eslint";

export default [
  ...ESLintConfig,
  {
    rules: {
      "@openally/imports": "off",
      "func-names": "off",
      "no-eval": "off",
      "func-style": "off",
      "no-undef": "off"
    },
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    ignores: [
      "**/node_modules/",
      "**/tmp/",
      "**/dist/",
      "**/coverage/",
      "**/fixtures/"
    ]
  }
];
