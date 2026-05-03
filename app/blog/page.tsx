import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest news, articles, and tutorials.",
};

const blogs = [
  {
    id: "1",
    slug: "how-to-convert-docx-to-pdf",
    title: "How to Convert DOCX to PDF Programmatically",
    excerpt: "Learn the best practices and easiest ways to convert Word documents to PDF using our API in Node.js and Python.",
    date: "May 1, 2026",
    readTime: "5 min read",
    category: "Tutorial",
  },
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
    slug: "optimizing-document-workflows",
    title: "Optimizing Document Workflows for Enterprises",
    excerpt: "A deep dive into how automating your document conversion pipeline can save thousands of hours and reduce operational costs.",
    date: "April 2, 2026",
    readTime: "7 min read",
    category: "Business",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Blog
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Latest news, tutorials, and insights from the ILoveDox team.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-800/80"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    {blog.category}
                  </span>
                  <time dateTime={blog.date}>{blog.date}</time>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h2>
                <p className="mt-3 text-sm text-zinc-400 line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-medium text-zinc-500">
                <span>{blog.readTime}</span>
                <span className="flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                  Read more
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
