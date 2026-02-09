const timeline = [
  {
    date: "2024 — 2025",
    title: "Project Manager",
    company: "SPFO Group",
    description:
      "Worked on cross-border oil trading operations in European and Latin American markets, coordinating logistics, stakeholder coordination, and due diligence.",
  },
  {
    date: "2020 — 2024",
    title: "Marketing & Operations Lead",
    company: "B&R Investments and Construction LLC",
    description:
      "Built and managed real estate marketing operations including cold calling, lead generation, and marketing systems. Developed repeatable processes for investor acquisition.",
  },
  {
    date: "2017 — 2019",
    title: "Manufacturing Engineer",
    company: "Carrier Global",
    description:
      "Completed rotations across production, quality, and manufacturing engineering. Applied industrial engineering principles to real manufacturing environments.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-b border-border">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-8">
          Experience
        </div>
        <div className="flex flex-col">
          {timeline.map((item, i) => (
            <div
              key={item.title}
              className={`grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-8 py-7 border-b border-border ${
                i === 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="text-[0.8rem] text-fg-tertiary font-medium pt-[0.15rem]">
                {item.date}
              </div>
              <div>
                <h3 className="font-semibold text-[1rem] mb-[0.2rem]">
                  {item.title}
                </h3>
                <div className="text-[0.875rem] text-fg-secondary mb-2">
                  {item.company}
                </div>
                <p className="text-[0.875rem] text-fg-secondary leading-[1.65]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
