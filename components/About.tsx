const details = [
  { label: "Background", value: "Industrial Engineering" },
  { label: "Location", value: "Atlanta, GA" },
  { label: "Focus", value: "Quality & Manufacturing" },
  { label: "Currently", value: "Building & Learning" },
];

export default function About() {
  return (
    <section id="about" className="py-24 border-b border-border">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-8">
          About
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div>
            <p className="text-fg-secondary mb-4 leading-[1.75]">
              I&apos;m Juan — an industrial engineer with experience across
              manufacturing, healthcare technology, real estate investing, and
              international commodities trading. I&apos;ve worked on production
              floors, built marketing operations from scratch, and navigated the
              realities of cross-border business.
            </p>
            <p className="text-fg-secondary mb-4 leading-[1.75]">
              In my spare time I build things — web apps, games, and tools that
              solve problems I actually have. I&apos;m especially interested in
              bringing industrial engineering concepts out of the factory and
              into software, making complex systems intuitive and interactive.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {details.map((d) => (
              <div
                key={d.label}
                className="p-5 bg-bg-card border border-border rounded-lg"
              >
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-fg-tertiary mb-[0.35rem]">
                  {d.label}
                </div>
                <div className="text-[0.95rem] font-medium text-fg">
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
