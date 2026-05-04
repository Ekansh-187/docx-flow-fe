import { BlogBlock } from "@/types/blog";

export function BlogRenderer({ content }: { content: BlogBlock[] }) {
    return (
        <div className="space-y-6">
            {content.map((block, index) => {
                switch (block.type) {
                    case "paragraph":
                        return (
                            <p key={index} className="text-zinc-300 text-lg leading-relaxed">
                                {block.content}
                            </p>
                        );

                    case "heading":
                        return (
                            <h2 key={index} className="text-2xl font-semibold text-white mt-10">
                                {block.content}
                            </h2>
                        );

                    case "list":
                        return (
                            <ul key={index} className="list-disc pl-6 text-zinc-300 space-y-2">
                                {block.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        );

                    case "code":
                        return (
                            <pre
                                key={index}
                                className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg overflow-x-auto"
                            >
                                <code>{block.content}</code>
                            </pre>
                        );

                    case "callout":
                        return (
                            <div
                                key={index}
                                className="border border-blue-500/30 bg-blue-500/10 p-4 rounded-lg text-blue-300"
                            >
                                {block.content}
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}