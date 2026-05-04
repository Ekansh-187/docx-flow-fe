import { BlogRenderer } from "@/app/components/blog/BlogRenderer";
import { Blog } from "@/types/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

const blogs: Blog[] = [
  {
    id: "2",
    slug: "introducing-ilovedox-api",
    title: "Introducing the ILoveDox API",
    date: "April 15, 2026",
    readTime: "3 min read",
    author: "Bob Founder",
    content: [
      {
        type: "paragraph",
        content:
          "Today, we are incredibly excited to announce the public beta of the ILoveDox API—a lightning-fast, highly scalable document conversion engine built entirely for developers.",
      },
      {
        type: "paragraph",
        content:
          "For years, developers have struggled with brittle workarounds, bloated enterprise software, or unstable headless browser setups just to convert a simple Word document into a reliable PDF. If you've ever tried to script LibreOffice on an AWS Lambda function, you know exactly the pain we are talking about.",
      },
      {
        type: "paragraph",
        content:
          "We built ILoveDox to solve this exact problem. Our API is designed from the ground up to offer pixel-perfect DOCX to PDF conversions with zero infrastructure overhead. Whether you are generating automated invoices, legal contracts, or student reports, ILoveDox ensures that your formatting, fonts, and layouts are perfectly preserved every single time.",
      },
      {
        type: "heading",
        content: "What can you expect from the beta?",
      },
      {
        type: "list",
        items: [
          "Blazing Fast Conversions: Most documents convert in under a second, thanks to our optimized rendering engine.",
          "Simple Integration: You don't need a PhD in document formats. A single POST request is all it takes.",
          "Generous Free Tier: During our beta period, every user gets access to a highly generous free tier to build, test, and deploy.",
          "High Fidelity: We support complex tables, nested lists, headers, footers, and custom fonts.",
        ],
      },
      {
        type: "heading",
        content: "Example API Call",
      },
      {
        type: "paragraph",
        content: "Getting started is as simple as sending a multipart/form-data request with your file. Here is how you can do it using cURL:",
      },
      {
        type: "code",
        language: "bash",
        content: `curl -X POST https://api.ilovedox.com/v1/file-convertor/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.docx" \\
  -o output.pdf`,
      },
      {
        type: "paragraph",
        content: "We also have comprehensive documentation and examples available for Node.js, Python, Java, and C++, making it incredibly easy to integrate into your existing tech stack.",
      },
      {
        type: "heading",
        content: "Looking Ahead",
      },
      {
        type: "paragraph",
        content: "This is just the beginning. While our core focus today is DOCX to PDF, our roadmap includes a suite of new conversion endpoints, including Image to PDF, Excel to PDF, and advanced PDF manipulation tools.",
      },
      {
        type: "callout",
        content:
          "We cannot wait to see what you build. Head over to our API Documentation to get your API key and make your first request today! 🚀",
      },
    ],
  },
  {
    id: "3",
    slug: "delete-page-in-word-without-formatting-issues",
    title: "How to Delete a Page in Word (Without the Formatting Headache)",
    date: "May 4, 2026",
    readTime: "5 min read",
    author: "Archit Gupta",
    content: [
      {
        type: "paragraph",
        content:
          "Deleting a page in Microsoft Word sounds simple—until it isn’t. Most users expect to just press backspace and move on, but Word’s formatting system often makes things more complicated. Blank pages refuse to disappear, layouts break, and suddenly your clean document turns into a formatting mess.",
      },
      {
        type: "paragraph",
        content:
          "If you’ve ever struggled with a stubborn blank page or accidentally ruined your formatting while trying to remove one, you’re not alone. The good news is that once you understand how Word structures documents, deleting pages becomes predictable and easy.",
      },
      {
        type: "heading",
        content: "Why Pages in Word Are Tricky",
      },
      {
        type: "paragraph",
        content:
          "Unlike tools like Google Docs, Microsoft Word does not treat pages as fixed entities. Instead, pages are a result of content flow, spacing, and formatting rules. This means you’re not really deleting a 'page'—you’re removing the content or formatting that caused that page to exist.",
      },
      {
        type: "paragraph",
        content:
          "Common causes of unwanted pages include extra paragraph marks, page breaks, section breaks, and tables that extend beyond the page boundary. Understanding these elements is key to solving the problem correctly.",
      },
      {
        type: "heading",
        content: "Step 1: Show Hidden Formatting Marks",
      },
      {
        type: "paragraph",
        content:
          "The first step to fixing any page issue in Word is to make the invisible visible. Word hides formatting marks like paragraph symbols and breaks by default, which makes debugging difficult.",
      },
      {
        type: "list",
        items: [
          "Go to the Home tab in the toolbar",
          "Click on the ¶ (Show/Hide) button",
          "Look for extra paragraph marks or page breaks",
        ],
      },
      {
        type: "paragraph",
        content:
          "Once enabled, you’ll immediately see what’s causing the extra page. This is often the single most important step in resolving formatting issues.",
      },
      {
        type: "heading",
        content: "Step 2: Delete a Blank Page at the End",
      },
      {
        type: "paragraph",
        content:
          "One of the most common problems is a blank page at the end of the document. This usually happens because of extra paragraph marks or an unavoidable trailing paragraph after tables.",
      },
      {
        type: "list",
        items: [
          "Scroll to the last page",
          "Select all paragraph marks (¶)",
          "Press Backspace or Delete",
        ],
      },
      {
        type: "paragraph",
        content:
          "If the page still doesn’t disappear, try reducing the font size of the last paragraph mark to 1pt or adjusting line spacing. This is especially useful when dealing with tables.",
      },
      {
        type: "heading",
        content: "Step 3: Remove Page Breaks",
      },
      {
        type: "paragraph",
        content:
          "Sometimes the issue is not extra space but an intentional page break that was inserted earlier. These breaks force content onto a new page.",
      },
      {
        type: "code",
        language: "text",
        content: "Page Break → Always pushes content to next page",
      },
      {
        type: "paragraph",
        content:
          "To fix this, simply locate the 'Page Break' label in your document (visible after enabling formatting marks) and delete it. The content will automatically shift up.",
      },
      {
        type: "heading",
        content: "Step 4: Handle Section Breaks Carefully",
      },
      {
        type: "paragraph",
        content:
          "Section breaks are more complex than page breaks. They control layout settings like margins, headers, and orientation. Deleting them without care can disrupt your entire document.",
      },
      {
        type: "list",
        items: [
          "Identify the type of section break (Next Page, Continuous, etc.)",
          "Delete only if you understand its impact",
          "Check formatting after removal",
        ],
      },
      {
        type: "callout",
        content:
          "Pro Tip: If removing a section break breaks your formatting, try changing it to a 'Continuous' section instead of deleting it.",
      },
      {
        type: "heading",
        content: "Step 5: Delete a Page with Content",
      },
      {
        type: "paragraph",
        content:
          "If you want to delete a page that contains actual content, the simplest approach is to select everything on that page and remove it.",
      },
      {
        type: "list",
        items: [
          "Click and drag to select all content on the page",
          "Or use Ctrl + Shift + ↓ to select quickly",
          "Press Delete",
        ],
      },
      {
        type: "paragraph",
        content:
          "This method works well when the page is not tied to complex formatting rules.",
      },
      {
        type: "heading",
        content: "Common Mistakes to Avoid",
      },
      {
        type: "list",
        items: [
          "Trying to delete pages without enabling formatting marks",
          "Removing section breaks blindly",
          "Ignoring hidden paragraph marks",
          "Using excessive backspace instead of targeted fixes",
        ],
      },
      {
        type: "paragraph",
        content:
          "These mistakes often lead to more frustration and broken layouts, especially in professional documents.",
      },
      {
        type: "heading",
        content: "Final Thoughts",
      },
      {
        type: "paragraph",
        content:
          "Deleting a page in Word is less about the page itself and more about understanding the structure behind it. Once you start thinking in terms of formatting elements rather than pages, the process becomes much simpler and more reliable.",
      },
      {
        type: "paragraph",
        content:
          "With these techniques, you can confidently remove unwanted pages without breaking your document’s layout. Whether you’re working on reports, contracts, or templates, mastering this skill will save you time and frustration.",
      },
    ],
  }
] as const;

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
          <div className="mt-10 max-w-none">
            <BlogRenderer content={blog.content} />
          </div>
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
