import {
  type Issue,
  LinearClient,
  type Project,
  type ProjectLink,
} from "@linear/sdk";
import { config } from "dotenv";

const PRIVATE_PROJECT_PREFIX = "PRIVATE:"

const client = new LinearClient({
  apiKey: Deno.env.get("LINEAR_API_KEY") || config().LINEAR_API_KEY,
});

let projectsCache: Project[] = [];

export async function getActiveProjects(): Promise<Project[]> {
  const projects = await client.projects();
  projectsCache = projects.nodes.filter((project) =>
    !project.name.startsWith(PRIVATE_PROJECT_PREFIX) && project.state === "started"
  );

  return projectsCache;
}

type IssueItem = {
  issue: Issue;
  subIssues: Issue[];
};

export type ProjectData = {
  project: Project;
  issues: IssueItem[];
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

  // Get issues, filter out canceled ones, then sort completed ones to bottom
  const issues = await project.issues();
  const filteredIssues = issues.nodes.filter((issue) => !issue.canceledAt);
  const sortedIssues = filteredIssues.sort((a, b) => {
    if (a.completedAt && !b.completedAt) {
      return 1;
    } else if (!a.completedAt && b.completedAt) {
      return -1;
    }
    return 0;
  });
  const issueItems = [];
  for (const issue of sortedIssues) {
    if (issue.parent) {
      continue;
    }
    const subIssuesConnection = await issue.children();
    const subIssues = subIssuesConnection.nodes;
    issueItems.push({ issue, subIssues });
  }

  const links = await project.links();

  return { project, issues: issueItems, links: links.nodes };
}

export type { Project };
