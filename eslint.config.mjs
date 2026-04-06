import nextConfig from "eslint-config-next";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextConfig,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      // Prefer IDE + periodic cleanup; strict unused enforcement was ~130 legacy warnings.
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-img-element": "off",
      "no-unused-vars": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "max-lines": ["warn", { max: 2000, skipBlankLines: true, skipComments: true }],
      "max-depth": ["warn", { max: 10 }],
      "max-lines-per-function": [
        "warn",
        { max: 1000, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      // Heuristic rules; many valid patterns (URL sync, localStorage, derived UI) still trip these.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/incompatible-library": "off",
    },
  },
  {
    files: ["next.config.js", "next.config.mjs", "**/*.cjs", "eslint.config.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
  {
    files: ["shared/db/**/*.ts", "shared/db/**/*.js", "shared/db/**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: [
      "**/app/**/page.tsx",
      "**/app/**/layout.tsx",
      "**/app/**/not-found.tsx",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["src/scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",
      "max-depth": "off",
    },
  },
  {
    files: ["src/lib/utils/logger.ts"],
    rules: {
      "no-console": "off",
    },
  },
];

export default config;
