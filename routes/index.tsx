/** @jsx h */
import { Handlers, type PageProps } from "$fresh/server.ts";
import { getActiveProjects, type Project } from "@linear";
import { h } from "preact";
import { DefaultLayout } from "../layouts/DefaultLayout.tsx";
import { tw } from "@twind";
import { Projects } from "../components/Projects.tsx";
import { SocialLinks } from "../components/SocialLinks.tsx";

export const handler: Handlers<Project[] | null> = {
  async GET(_, ctx) {
    const projects = await getActiveProjects();
    if (!projects.length) {
      return ctx.render(null);
    }
    return ctx.render(projects);
  },
};

export default function Home({ data: projects }: PageProps<Project[] | null>) {
  return (
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
        with an affinity for efficient, user-friendly solutions. If you want to
        work with me, need my expertise, or are interested in my projects or
        collaborations, I'm happy to{" "}
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
      {projects ? <Projects class="mb-12" projects={projects} /> : null}
      <SocialLinks />
    </DefaultLayout>
  );
}
