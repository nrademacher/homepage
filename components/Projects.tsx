/** @jsx h */
import type { Project } from "@linear";
import { h } from "preact";
import { tw } from "@twind";

export function Projects(props: { projects: Project[]; class?: string }) {
  return (
    <section class={tw`${props.class}`}>
      <header class={tw`mb-4 flex flex(col sm:row) gap-8 items-center`}>
        <h1 class={tw`leading-tight text(gray-900 xl md:2xl) font-medium`}>
          My current personal projects
        </h1>
      </header>
      <ol class={tw`ml-8 list-decimal`}>
        {props.projects.map((project) => (
          <li>
            <a class={tw`link`} href={`/projects/${project.slugId}`}>
              {project.name}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
