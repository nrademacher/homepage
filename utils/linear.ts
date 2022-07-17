import { type Issue, LinearClient, type Project } from "@linear/sdk";
import { config } from "dotenv";

const client = new LinearClient({
  apiKey: Deno.env.get("LINEAR_API_KEY") || config().LINEAR_API_KEY,
});

export async function getActiveProjects(): Promise<Project[]> {
  const projects = await client.projects();

  return projects.nodes.filter((project) => project.state === "started");
}

export async function getActiveProjectBySlugId(
  projectSlugId: string,
): Promise<Project | undefined> {
  const projects = await getActiveProjects();

  return projects.find((project) => project.slugId === projectSlugId);
}

export async function getProjectById(projectId: string): Promise<Project> {
  return await client.project(projectId);
}

export async function getIssuesByProjectId(
  projectId: string,
): Promise<Issue[]> {
  const project = await getProjectById(projectId);
  const issues = await project.issues();

  return issues.nodes.filter((issue) => !issue.canceledAt);
}

export { type Issue, type Project };
