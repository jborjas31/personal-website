export default function Hero() {
  return (
    <header className="pt-40 pb-24 max-w-[1080px] mx-auto px-8 border-b border-border">
      <div className="fade-in">
        <h1 className="font-serif font-light text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.2] tracking-[-0.02em] text-fg max-w-[720px] mb-6">
          Industrial engineer who likes to{" "}
          <em className="italic text-accent">build things.</em>
        </h1>
        <p className="text-[1.1rem] text-fg-secondary max-w-[540px] leading-[1.7]">
          I work at the intersection of manufacturing, technology, and
          problem-solving. This is where I share what I&apos;m making and what
          I&apos;m learning along the way.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="inline-flex items-center gap-[0.4rem] text-[0.9rem] font-medium bg-fg text-bg px-[1.2rem] py-[0.6rem] border border-fg rounded-[6px] no-underline transition-all duration-200 hover:bg-[#333]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-[0.4rem] text-[0.9rem] font-medium text-fg px-[1.2rem] py-[0.6rem] border border-border rounded-[6px] no-underline transition-all duration-200 hover:border-fg hover:bg-fg hover:text-bg"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
}
