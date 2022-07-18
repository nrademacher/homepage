import {
  type Issue,
  LinearClient,
  type Project,
  type ProjectLink,
} from "@linear/sdk";
import { config } from "dotenv";

const client = new LinearClient({
  apiKey: Deno.env.get("LINEAR_API_KEY") || config().LINEAR_API_KEY,
});

let projectsCache: Project[] = [];

export async function getActiveProjects(): Promise<Project[]> {
  const projects = await client.projects();
  projectsCache = projects.nodes.filter((project) =>
    project.state === "started"
  );

  return projectsCache;
}

export type ProjectData = {
  project: Project;
  issues: Issue[];
  links: ProjectLink[];
};

export async function getActiveProjectDataBySlugId(
  projectSlugId: string,
): Promise<ProjectData | undefined> {
  let project = projectsCache.find((project) =>
    project.slugId === projectSlugId
  );
  if (!project) {
    project = await client.project(projectSlugId);
  }
  if (!project) {
    return undefined;
  }

  const issues = await project.issues();
  const filteredIssues = issues.nodes.filter((issue) => !issue.canceledAt);

  const links = await project.links();

  return { project, issues: filteredIssues, links: links.nodes };
}

export type { Project };
