export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-8">
          Contact
        </div>
        <div className="max-w-[540px]">
          <p className="text-fg-secondary leading-[1.75] mb-8">
            I&apos;m open to quality engineering roles, interesting
            collaborations, or just a good conversation about manufacturing,
            technology, or building things. Best way to reach me is email.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:jborjas94@gmail.com"
              className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-fg no-underline transition-colors duration-200 hover:text-accent"
            >
              jborjas94@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jayborjas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-fg no-underline transition-colors duration-200 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jborjas31"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-fg no-underline transition-colors duration-200 hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
