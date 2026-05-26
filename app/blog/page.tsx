import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest news, articles, and tutorials.",
};

const blogs = [
  {
    id: "2",
    slug: "introducing-ilovedox-api",
    title: "Introducing the ILoveDox API",
    excerpt: "We are thrilled to announce the public beta of the ILoveDox API. Discover what you can build with our scalable document conversion engine.",
    date: "April 15, 2026",
    readTime: "3 min read",
    category: "Announcement",
  },
  {
    id: "3",
    slug: "delete-page-in-word-without-formatting-issues",
    title: "How to Delete a Page in Word (Without the Formatting Headache)",
    excerpt: "Deleting a page in Microsoft Word sounds simple—until it isn't. Learn how to remove unwanted pages without breaking your document's layout.",
    date: "May 4, 2026",
    readTime: "5 min read",
    category: "Tutorial",
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Blog</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-heading md:text-4xl">
            Our Blog
          </h1>
          <p className="mt-4 text-secondary">
            Latest news, tutorials, and insights from the ILoveDox team.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-border-hover hover:shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-accent-border bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-text">
                    {blog.category}
                  </span>
                  <time dateTime={blog.date} className="text-xs text-muted">
                    {blog.date}
                  </time>
                  <span className="text-xs text-muted">&middot; {blog.readTime}</span>
                </div>
                <h2 className="mt-4 text-base font-semibold text-heading transition-colors group-hover:text-accent">
                  {blog.title}
                </h2>
                <p className="mt-3 text-sm text-secondary line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-accent">
                Read more
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
