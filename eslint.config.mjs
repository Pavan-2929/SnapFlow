import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable explicit 'any' type error
      "@typescript-eslint/no-unused-vars": "off", // Disable unused vars warning
      "no-var": "off", // Disable var warning, use let or const instead
    },
  },
];

export default eslintConfig;
