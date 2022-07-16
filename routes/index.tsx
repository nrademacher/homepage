/** @jsx h */
import { tw } from "@twind";
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";
import { SocialLinks } from "../components/SocialLinks.tsx";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>Nikolay Rademacher</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400&family=Work+Sans:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome@5.15.3/css/all.min.css"
        />
      </Head>
      <div
        class={tw`mx-auto max-w-screen-md px(4 sm:8 md:16) my(8 sm:16 md:32)`}
      >
        <header class={tw`mb-8 flex flex(col sm:row) gap-8 items-center`}>
          <h1 class={tw`leading-tight text(gray-900 4xl md:5xl) font-semibold`}>
            Hello 👋
          </h1>
        </header>
        <p class={tw`mb-8 leading-7 text(gray-900 lg)`}>
          I'm Nikolay Rademacher, a highly motivated{" "}
          <a href="https://github.com/lucacasonato" class={tw`link`}>
            Full-stack web developer{" "}
          </a>
          with an affinity for efficient, user-friendly solutions. If you want
          to work with me, need my expertise, or are interested in my projects
          or collaborations, I'm happy to{" "}
          <a href="mailto:rademacher.nikolay@gmail.com" class={tw`link`}>
            hear from you
          </a>
          .
        </p>
        <p class={tw`mb-8 leading-7 text(lg gray-900)`}>
          I occasionally post updates about my projects and learning on my{" "}
          <a href="https://blog.nikolayrademacher.net" class={tw`link`}>
            blog
          </a>
          .
        </p>
        <SocialLinks />
      </div>
    </Fragment>
  );
}
