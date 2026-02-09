import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

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
            href="/blog"
            className="text-fg-secondary text-[0.875rem] font-medium no-underline hover:text-fg transition-colors duration-200"
          >
            All Posts
          </Link>
        </div>
      </nav>
      <main className="pt-40 pb-24 max-w-[720px] mx-auto px-8">
        <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-fg-tertiary mb-4">
          Blog
        </div>
        <h1 className="font-serif font-light text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.25] tracking-[-0.02em] text-fg mb-4">
          {post.title}
        </h1>
        <div className="text-[0.85rem] text-fg-tertiary mb-12">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
}
