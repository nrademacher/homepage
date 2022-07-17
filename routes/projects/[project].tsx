/** @jsx h */
import {
  getActiveProjectBySlugId,
  getIssuesByProjectId,
  type Issue,
  type Project,
} from "@linear";
import { Handlers, type PageProps } from "$fresh/server.ts";
import { Fragment, h } from "preact";
import { DefaultLayout } from "../../layouts/DefaultLayout.tsx";
import { tw } from "@twind";

type ProjectData = {
  project: Project;
  issues: Issue[];
};

export const handler: Handlers<ProjectData | null> = {
  async GET(_, ctx) {
    const { project: projectSlugId } = ctx.params;
    const project = await getActiveProjectBySlugId(projectSlugId);
    if (!project) {
      return ctx.render(null);
    }
    const issues = await getIssuesByProjectId(project.id);
    return ctx.render({ project, issues });
  },
};

export default function ProjectPage(
  { data }: PageProps<ProjectData | null>,
) {
  if (!data) {
    return <DefaultLayout>Project not found</DefaultLayout>;
  }

  return (
    <DefaultLayout pageName={data.project.name}>
      <header class={tw`mb-8 flex flex(col sm:row) items-center`}>
        <h1 class={tw`leading-tight text(gray-900 2xl md:3xl) font-semibold`}>
          {data.project.name}
        </h1>
      </header>
      <p>{data.project.description}</p>
      {data.issues.length
        ? (
          <Fragment>
            <h2
              class={tw
                `mt-8 mb-4 leading-tight text(gray-900 xl md:2xl) font-medium`}
            >
              Tasks/Issues
            </h2>
            <ul class={tw`ml-8 list-none`}>
              {data.issues.reverse().map((issue) => (
                <li>
                <span class={tw`mr-2`}>{issue.completedAt ? '✅' : '⬜'}</span>
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
