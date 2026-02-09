import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-[rgba(250,250,248,0.9)] backdrop-blur-[12px] border-b border-border z-100 px-8">
        <div className="max-w-[1080px] mx-auto flex justify-between items-center h-[60px]">
          <Link
            href="/"
            className="font-serif font-semibold text-[1.15rem] text-fg no-underline tracking-[-0.01em]"
          >
            Juan Borjas
          </Link>
          <Link
            href="/#projects"
            className="text-fg-secondary text-[0.875rem] font-medium no-underline hover:text-fg transition-colors duration-200"
          >
            All Projects
          </Link>
        </div>
      </nav>
      <main className="pt-40 pb-24 max-w-[720px] mx-auto px-8">
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-accent mb-4">
          {project.type}
        </div>
        <h1 className="font-serif font-light text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.25] tracking-[-0.02em] text-fg mb-4">
          {project.title}
        </h1>
        <p className="text-fg-secondary leading-[1.75] mb-8">
          {project.description}
        </p>
        <div className="flex gap-2 flex-wrap mb-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.7rem] font-medium px-[0.65rem] py-1 bg-accent-light text-accent rounded-[4px] tracking-[0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[0.4rem] text-[0.9rem] font-medium bg-fg text-bg px-[1.2rem] py-[0.6rem] border border-fg rounded-[6px] no-underline transition-all duration-200 hover:bg-[#333]"
          >
            Visit Live App &rarr;
          </a>
        ) : (
          <div className="p-8 bg-bg-card border border-border rounded-[10px] text-center">
            <p className="text-fg-tertiary text-[0.95rem] italic">
              Live demo coming soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
