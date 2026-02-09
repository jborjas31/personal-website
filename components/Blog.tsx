import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const upcomingPosts = [
  "What Four Years of Cold Calling Taught Me About Systems",
  "Bottlenecks Are Everywhere (Not Just on the Factory Floor)",
];

export default function Blog() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-24 border-b border-border">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-8">
          Blog
        </div>
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex flex-col md:flex-row justify-between md:items-baseline py-5 border-b border-border no-underline text-inherit transition-[padding-left] duration-200 hover:pl-2 ${
                i === 0 ? "border-t border-border" : ""
              }`}
            >
              <h3 className="font-serif font-normal text-[1.1rem]">
                {post.title}
              </h3>
              <span className="text-[0.8rem] text-fg-tertiary whitespace-nowrap md:ml-8">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Link>
          ))}
          {upcomingPosts.map((title, i) => (
            <div
              key={title}
              className={`flex flex-col md:flex-row justify-between md:items-baseline py-5 border-b border-border ${
                posts.length === 0 && i === 0 ? "border-t border-border" : ""
              }`}
            >
              <h3 className="font-serif font-normal text-[1.1rem]">{title}</h3>
              <span className="text-[0.8rem] text-fg-tertiary whitespace-nowrap md:ml-8">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
