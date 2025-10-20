/** @jsx h */
import type { Handler, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { DefaultLayout } from "../layouts/DefaultLayout.tsx";
import { tw } from "@twind";
import { SocialLinks } from "../components/SocialLinks.tsx";

export default function Home({ data: projects }: PageProps<Project[] | null>) {
  return (
    <DefaultLayout>
      <section>
        <header
          class={tw`mb-12 flex flex(col sm:row) gap-8 items-center`}
        >
          <h1
            class={tw
              `leading-tight text(gray-900 4xl md:5xl dark:white) font-semibold`}
          >
            Hello 👋
          </h1>
        </header>
        <p class={tw`mb-8 paragraph`}>
          I'm Nikolay Rademacher, a highly motivated{" "}
          <a href="https://github.com/nrademacher" class={tw`link`}>
            Full-stack web developer{" "}
          </a>
          .
        </p>
        <p class={tw`mb-8 paragraph`}>
          I have an affinity for efficient, user-friendly web solutions. If you
          want to work with me, need my expertise, or are interested in my
          projects or collaborations, I'm happy to{" "}
          <a href="mailto:rademacher.nikolay@gmail.com" class={tw`link`}>
            hear from you
          </a>
          .
        </p>
        {
          /*}<p class={tw`mb-8 paragraph`}>
          I occasionally post updates about my projects and learning on my{" "}
          <a href="https://blog.nikolayrademacher.net" class={tw`link`}>
            blog
          </a>
          .
        </p>*/
        }
      </section>
      <SocialLinks />
    </DefaultLayout>
  );
}
