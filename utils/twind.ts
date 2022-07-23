import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, apply } from "twind";

export * from "twind";

export const config: Configuration = {
  darkMode: "media",
  mode: "silent",
  theme: {
    extend: {
      backgroundColor: {
        "dark-mode": "#121212",
      },
      textColor: {
        "dark-mode": "rgb(201, 209, 217)",
      },
    },
  },
  plugins: {
    link: apply`text-yellow(600 hover:500 dark:400 dark:hover:300) hover:underline transition duration-75 ease-in-out`,
    paragraph: apply`leading-7 text(gray-900 lg dark:dark-mode)`,
  },
};

if (IS_BROWSER) setup(config);
