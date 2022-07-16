import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, apply } from "twind";

export * from "twind";

export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      backgroundColor: {
        html: "#ee6535",
        css: "#0c6aa7",
        javascript: "#fcdc00",
        typescript: "#007acc",
        react: "#61dafb",
        lua: "#2c2d72",
      },
      textColor: {
        html: "#ee6535",
        css: "#0c6aa7",
        javascript: "#fcdc00",
        typescript: "#007acc",
        react: "#61dafb",
        lua: "#2c2d72",
        a11y: "#3b4bbf",
        figma: "#f04e27",
        npm: "#ca3739",
        node: "#6a9f65",
      },
    },
  },
  plugins: {
    link: apply`text-yellow(600 hover:500) hover:underline transition duration-75 ease-in-out`,
  },
};

if (IS_BROWSER) setup(config);
