/** @jsx h */
import type { Handler, PageProps } from "$fresh/server.ts";
import { getActiveProjects, type Project } from "@linear";
import { h } from "preact";
import { DefaultLayout } from "../layouts/DefaultLayout.tsx";
import { tw } from "@twind";
import { SocialLinks } from "../components/SocialLinks.tsx";

export const handler: Handler<Project[] | null> = async (_, ctx) => {
  const projects = await getActiveProjects();
  if (!projects.length) {
    return ctx.render(null);
  }
  return ctx.render(projects);
};

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
          at{" "}
          <a href="https://www.valuedesk.de/homepage/" class={tw`link`}>
            Valuedesk
          </a>.
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
      {projects
        ? (
          <section class={tw`mb-12`}>
            <header class={tw`mb-4 flex flex(col sm:row) gap-8 items-center`}>
              <h2
                class={tw
                  `leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
              >
                My current personal projects
              </h2>
            </header>
            <ol class={tw`ml-8 list-decimal dark:text-dark-mode`}>
              {projects.map((project) => (
                <li>
                  <a class={tw`link`} href={`/projects/${project.slugId}`}>
                    {project.name}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )
        : null}
      <SocialLinks />
    </DefaultLayout>
  );
}
