import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-mobile-input",
    path: "./lib/jb-mobile-input.ts",
    outputPath: "./dist/jb-mobile-input.js",
    umdName: "JBMobileInput",
    external: ["jb-input", "jb-validation", "jb-core", "jb-core/i18n"],
    globals: {
      "jb-input": "JBInput",
      "jb-validation": "JBValidation",
      "jb-core":"JBCore",
      "jb-core/i18n":"JBCoreI18N"
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
      "jb-input": "JBInput",
      "jb-mobile-input": "JBMobileInput",
    },
    umdName:"JBMobileInputReact",
    dir:"./react"
  },
];