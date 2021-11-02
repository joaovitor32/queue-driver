export const presets = [["@babel/preset-env"], "@babel/preset-typescript"];
export const plugins = [
  [
    "module-resolver",
    {
      alias: {
        "@config": "../src/config",
        "@shared": "../src/shared",
      },
    },
  ],
];
export const ignore = ["**/*.spec.ts"];
