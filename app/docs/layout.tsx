import Sidebar, { SidebarSection } from "../components/Sidebar";

const docsSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Base URL", href: "/docs#base-url" },
      { title: "Authentication", href: "/docs#authentication" },
      { title: "Rate Limits", href: "/docs#rate-limits" },
    ],
  },
  {
    title: "Endpoints",
    items: [
      { title: "Convert DOCX to PDF", href: "/docs#convert" },
      { title: "PDF to DOCX", href: "/docs/pdf-to-docx", isNew: true },
      { title: "Image to PDF", href: "/docs/image-to-pdf" },
    ],
  },
  {
    title: "SDKs & Libraries",
    items: [
      { title: "Node.js SDK", href: "/docs/sdks/node" },
      { title: "Python SDK", href: "/docs/sdks/python" },
      { title: "Go SDK", href: "/docs/sdks/go" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col md:flex-row relative">
      <Sidebar sections={docsSections} />
      <div className="flex-1 min-w-0 bg-zinc-950">
        {children}
      </div>
    </div>
  );
}
