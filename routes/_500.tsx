/** @jsx h */
import { h } from "preact";
import { DefaultLayout } from "../layouts/DefaultLayout.tsx";
import { tw } from "twind";

export default function Error500Page() {
  return (
    <DefaultLayout pageName="Error">
      <p class={tw`mb-4 paragraph`}>
        Sorry, it looks like there was an error 🙁
      </p>
      <p class={tw`paragraph`}>
        Please try again later, or else please{" "}
        <a href="mailto:rademacher.nikolay@gmail.com" class={tw`link`}>
          email me
        </a>{" "}
        if the error persists.
      </p>
    </DefaultLayout>
  );
}
