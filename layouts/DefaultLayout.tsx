/** @jsx h */
import { type ComponentChildren, Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";

export function DefaultLayout(
  props: { children: ComponentChildren; pageName?: string },
) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>
          Nikolay Rademacher{props.pageName && ` | ${props.pageName}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        class={tw`mx-auto max-w-screen-md px(4 sm:8 md:16) my(8 sm:16 md:32)`}
      >
        {props.children}
      </main>
    </Fragment>
  );
}
