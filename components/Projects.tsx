import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default function Projects() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="py-24 border-b border-border">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-8">
          Projects
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const isInternal = project.url?.startsWith("/");
            const CardTag = isInternal ? Link : project.url ? "a" : Link;
            const cardProps = isInternal
              ? { href: project.url! }
              : project.url
              ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
              : { href: `/projects/${project.slug}` };
            return (
            <CardTag
              key={project.slug}
              {...cardProps}
              className="bg-bg-card border border-border rounded-[10px] overflow-hidden transition-all duration-[250ms] no-underline text-inherit block hover:border-[#ccc] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px]"
            >
              <div
                className={`w-full aspect-video flex items-center justify-center text-[2.5rem] relative overflow-hidden ${
                  project.thumbClass === "game"
                    ? "bg-[linear-gradient(135deg,#1a2a1f_0%,#2a4a35_50%,#1a3025_100%)] text-[rgba(255,255,255,0.15)]"
                    : "bg-[linear-gradient(135deg,#f0ebe4_0%,#e8e0d4_100%)] text-[rgba(0,0,0,0.08)]"
                }`}
              >
                <span
                  className={`font-sans text-[0.8rem] font-bold tracking-[0.15em] uppercase relative z-10 ${
                    project.thumbClass === "game"
                      ? "text-[rgba(255,255,255,0.35)]"
                      : "text-[rgba(0,0,0,0.25)]"
                  }`}
                >
                  {project.thumbLabel}
                </span>
              </div>
              <div className="p-6">
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-accent mb-2">
                  {project.type}
                </div>
                <h3 className="font-serif font-normal text-[1.3rem] mb-2 tracking-[-0.01em]">
                  {project.title}
                </h3>
                <p className="text-[0.875rem] text-fg-secondary leading-[1.65]">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.7rem] font-medium px-[0.65rem] py-1 bg-accent-light text-accent rounded-[4px] tracking-[0.02em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardTag>
            );
          })}
        </div>
        <p className="mt-8 text-[0.875rem] text-fg-tertiary italic">
          More projects coming soon.
        </p>
      </div>
    </section>
  );
}
