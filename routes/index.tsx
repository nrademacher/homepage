/** @jsx h */
import { tw } from "@twind";
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";
import { DefaultLayout } from "../layouts/DefaultLayout.tsx";
import Projects from "../islands/Projects.tsx";
import { SocialLinks } from "../components/SocialLinks.tsx";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>Nikolay Rademacher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <header class={tw`mb-8 flex flex(col sm:row) gap-8 items-center`}>
          <h1 class={tw`leading-tight text(gray-900 4xl md:5xl) font-semibold`}>
            Hello 👋
          </h1>
        </header>
        <p class={tw`mb-8 leading-7 text(gray-900 lg)`}>
          I'm Nikolay Rademacher, a highly motivated{" "}
          <a href="https://github.com/nrademacher" class={tw`link`}>
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
        <Projects class="mb-12" />
        <SocialLinks />
      </DefaultLayout>
    </Fragment>
  );
}
