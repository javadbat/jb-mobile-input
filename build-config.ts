import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-mobile-input",
    path: "./lib/jb-mobile-input.ts",
    outputPath: "./dist/jb-mobile-input.js",
    umdName: "JBMobileInput",
    external: ["jb-input", "jb-validation"],
    globals: {
      "jb-input": "JBInput",
      "jb-validation": "JBValidation"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-mobile-input-react",
    path: "./react/lib/JBMobileInput.tsx",
    outputPath: "./react/dist/JBMobileInput.js",
    external: ["jb-input", "jb-mobile-input", "prop-types", "react"],
    globals: {
      react: "React",
      "jb-input": "JBInput"
    },
  },
];