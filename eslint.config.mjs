import next from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "src/scripts/**",
    ],
  },
  ...next,
  {
    // Reglas del React Compiler: el proyecto no lo usa y marcan patrones
    // intencionales (refs en hooks, setState inicial, etc.).
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
  },
];

export default eslintConfig;
