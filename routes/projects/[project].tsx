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
          class={tw`leading-tight text(gray-900 2xl md:3xl dark:white) font-semibold`}
        >
          {data.project.name}
        </h1>
      </header>
      {data.project.description
        ? (
          <Fragment>
            <h2
              class={tw`mb-4 leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
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
              class={tw`mt-8 mb-4 leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
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
              class={tw`mt-8 mb-4 leading-tight text(gray-900 xl md:2xl dark:white) font-medium`}
            >
              Tasks/Issues
            </h2>
            <ul class={tw`ml-8 list-none`}>
              {data.issues.map((issue) => (
                <li class={tw`dark:text-dark-mode`}>
                  <span class={tw`mr-2`}>
                    {issue.issue.completedAt ? "✅" : "⬜"}
                  </span>
                  <span
                    class={tw`${
                      issue.issue.completedAt
                        ? "line-through text-gray-300"
                        : ""
                    }`}
                  >
                    {issue.issue.title}
                  </span>
                  <ul class={tw`ml-8 list-none`}>
                    {issue.subIssues.map((issue) => (
                      <li class={tw`dark:text-dark-mode`}>
                        <span class={tw`mr-2`}>
                          {issue.completedAt ? "✅" : "⬜"}
                        </span>
                        <span
                          class={tw`${
                            issue.completedAt
                              ? "line-through text-gray-300"
                              : ""
                          }`}
                        >
                          {issue.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Fragment>
        )
        : null}
      <div class={tw`pt-16`}>
        <a
          href="/"
          class={tw`inline-flex items-center gap-1 link`}
          title="Back to Index Page"
        >
          <svg
            class={tw`inline-block w-5 h-5`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.91675 14.4167L3.08341 10.5833C3.00008 10.5 2.94119 10.4097 2.90675 10.3125C2.87175 10.2153 2.85425 10.1111 2.85425 10C2.85425 9.88889 2.87175 9.78472 2.90675 9.6875C2.94119 9.59028 3.00008 9.5 3.08341 9.41667L6.93758 5.5625C7.09036 5.40972 7.27786 5.33334 7.50008 5.33334C7.7223 5.33334 7.91675 5.41667 8.08341 5.58334C8.23619 5.73611 8.31258 5.93056 8.31258 6.16667C8.31258 6.40278 8.23619 6.59722 8.08341 6.75L5.66675 9.16667H16.6667C16.9029 9.16667 17.1006 9.24639 17.2601 9.40584C17.4201 9.56584 17.5001 9.76389 17.5001 10C17.5001 10.2361 17.4201 10.4339 17.2601 10.5933C17.1006 10.7533 16.9029 10.8333 16.6667 10.8333H5.66675L8.10425 13.2708C8.25703 13.4236 8.33341 13.6111 8.33341 13.8333C8.33341 14.0556 8.25008 14.25 8.08341 14.4167C7.93064 14.5694 7.73619 14.6458 7.50008 14.6458C7.26397 14.6458 7.06953 14.5694 6.91675 14.4167Z"
              fill="currentColor"
            >
            </path>
          </svg>Back
        </a>
      </div>
    </DefaultLayout>
  );
}
