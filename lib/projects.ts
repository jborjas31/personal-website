import projectsData from "@/content/projects/projects.json";

export interface Project {
  slug: string;
  title: string;
  type: string;
  thumbClass: string;
  thumbLabel: string;
  description: string;
  tags: string[];
  url?: string;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}
