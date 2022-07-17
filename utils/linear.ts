import { type Issue, LinearClient, type Project } from "@linear/sdk";
import { config } from "dotenv";

const client = new LinearClient({
  apiKey: Deno.env.get("LINEAR_API_KEY") || config().LINEAR_API_KEY,
});

export async function getActiveProjects(): Promise<Project[]> {
  const projects = await client.projects();

  return projects.nodes.filter((project) => project.state === "started");
}

export type ProjectData = {
  project: Project;
  issues: Issue[];
};

export async function getActiveProjectDataBySlugId(
  projectSlugId: string,
): Promise<ProjectData | undefined> {
  const projects = await getActiveProjects();

  const project = projects.find((project) => project.slugId === projectSlugId);
  if (!project) {
    return undefined;
  }

  const issues = await project.issues();
  const filteredIssues = issues.nodes.filter((issue) => !issue.canceledAt);

  return { project, issues: filteredIssues };
}

export { type Project };
