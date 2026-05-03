import Link from "next/link";
import { notFound } from "next/navigation";

// Reuse the same static data for now
const blogs = [
  {
    id: "1",
    slug: "how-to-convert-docx-to-pdf",
    title: "How to Convert DOCX to PDF Programmatically",
    content: "Converting DOCX to PDF is a common requirement for many applications. In this tutorial, we will explore the best practices and easiest ways to convert Word documents to PDF using our API in Node.js and Python. First, make sure you have generated an API key from your dashboard. Then, install the required SDK or simply use a standard HTTP client...",
    date: "May 1, 2026",
    readTime: "5 min read",
    author: "Alice Developer",
  },
  {
    id: "2",
    slug: "introducing-ilovedox-api",
    title: "Introducing the ILoveDox API",
    content: "Today we are excited to launch the public beta of the ILoveDox API. Discover what you can build with our scalable document conversion engine. We have been working hard for the past few months to bring you a reliable, fast, and easy-to-use API for converting DOCX files to PDF. Check out our documentation to get started today!",
    date: "April 15, 2026",
    readTime: "3 min read",
    author: "Bob Founder",
  },
  {
    id: "3",
    slug: "optimizing-document-workflows",
    title: "Optimizing Document Workflows for Enterprises",
    content: "Enterprises process thousands of documents every day. A deep dive into how automating your document conversion pipeline can save thousands of hours and reduce operational costs. By integrating our API into your existing systems, you can eliminate manual file processing, reduce errors, and ensure a consistent output format across your organization.",
    date: "April 2, 2026",
    readTime: "7 min read",
    author: "Charlie Manager",
  },
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="flex flex-1 flex-col items-center px-6 py-20">
      <div className="w-full max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
        
        <header className="mt-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {blog.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
            <span className="font-medium text-zinc-300">{blog.author}</span>
            <span>&bull;</span>
            <time dateTime={blog.date}>{blog.date}</time>
            <span>&bull;</span>
            <span>{blog.readTime}</span>
          </div>
        </header>

        <div className="mt-10 max-w-none">
          <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
            {blog.content}
          </p>
          <div className="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <p className="text-sm text-zinc-500">
              This is a static blog post demonstration. In the future, this content can be managed and loaded from a headless CMS.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
