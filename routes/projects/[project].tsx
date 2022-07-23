/** @jsx h */
import type { Handler, PageProps } from "$fresh/server.ts";
import { getActiveProjectDataBySlugId, type ProjectData } from "@linear";
import { Fragment, h } from "preact";
import { DefaultLayout } from "../../layouts/DefaultLayout.tsx";
import { tw } from "@twind";

export const handler: Handler<ProjectData | null> = async (_, ctx) => {
  const { project: projectSlugId } = ctx.params;
  const projectData = await getActiveProjectDataBySlugId(projectSlugId);
  if (!projectData) {
    return ctx.render(null);
  }
  return ctx.render(projectData);
};

export default function ProjectPage(
  { data }: PageProps<ProjectData | null>,
) {
  if (!data) {
    return <DefaultLayout>Project not found</DefaultLayout>;
  }

  return (
    <DefaultLayout pageName={data.project.name}>
      <header class={tw`mb-12 flex flex(col sm:row) items-center`}>
        <h1
          class={tw
            `leading-tight text(gray-900 2xl md:3xl dark:white) font-semibold`}
        >
          {data.project.name}
        </h1>
      </header>
      {data.project.description
        ? (
          <Fragment>
            <h2
              class={tw
                `mb-4 leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
            >
              Motivation
            </h2>
            <p class={tw`paragraph`}>
              {data.project.description}
            </p>
          </Fragment>
        )
        : null}
      {data.links.length
        ? (
          <Fragment>
            <h2
              class={tw
                `mt-8 mb-4 leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
            >
              Links
            </h2>
            <ul class={tw`ml-8 list-disc`}>
              {data.links.map((link) => (
                <li class={tw`dark:text-dark-mode`}>
                  <a class={tw`link`} href={link.url}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Fragment>
        )
        : null}
      {data.issues.length
        ? (
          <Fragment>
            <h2
              class={tw
                `mt-8 mb-4 leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
            >
              Tasks/Issues
            </h2>
            <ul class={tw`ml-8 list-none`}>
              {data.issues.map((issue) => (
                <li class={tw`dark:text-dark-mode`}>
                  <span class={tw`mr-2`}>{issue.completedAt ? "✅" : "⬜"}</span>
                  <span
                    class={tw`${
                      issue.completedAt ? "line-through text-gray-300" : ""
                    }`}
                  >
                    {issue.title}
                  </span>
                </li>
              ))}
            </ul>
          </Fragment>
        )
        : null}
    </DefaultLayout>
  );
}
