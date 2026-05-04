export type BlogBlock =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string }
    | { type: "list"; items: string[] }
    | { type: "code"; language: string; content: string }
    | { type: "callout"; content: string };

export type Blog = {
  id: string;
  slug: string;
  title: string;
  content: BlogBlock[];
  date: string;
  readTime: string;
  author: string;
};