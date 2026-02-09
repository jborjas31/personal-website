import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();

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
            href="/"
            className="text-fg-secondary text-[0.875rem] font-medium no-underline hover:text-fg transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </nav>
      <main className="pt-40 pb-24 max-w-[1080px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-8">
          Blog
        </div>
        <div className="flex flex-col">
          {posts.length === 0 ? (
            <p className="text-fg-secondary">No posts yet. Check back soon.</p>
          ) : (
            posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`flex flex-col md:flex-row justify-between md:items-baseline py-5 border-b border-border no-underline text-inherit transition-[padding-left] duration-200 hover:pl-2 ${
                  i === 0 ? "border-t border-border" : ""
                }`}
              >
                <div>
                  <h3 className="font-serif font-normal text-[1.1rem]">
                    {post.title}
                  </h3>
                  <p className="text-[0.85rem] text-fg-secondary mt-1">
                    {post.description}
                  </p>
                </div>
                <span className="text-[0.8rem] text-fg-tertiary whitespace-nowrap md:ml-8 mt-2 md:mt-0">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
