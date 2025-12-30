import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CustomMarkdown } from "../components/CustomMarkdown";
import { fetchMarkdown, MarkdownPost } from "../utils/data";

export default function ProjectDetail({ slug }: { slug: string }) {
    const [post, setPost] = useState<MarkdownPost | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchMarkdown(`/data/projects/${slug}.md`, slug)
            .then(setPost)
            .catch(() => setError(true));
    }, [slug]);

    if (error) return <div className="text-white text-center py-20">Proje bulunamadı.</div>;
    if (!post) return <div className="text-white text-center py-20">Yükleniyor...</div>;

    const { frontmatter, content } = post;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen py-20 px-4 md:py-10 pb-32"
        >
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mb-8 flex items-center gap-2 text-[#888] hover:text-white transition-colors text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Geri Dön
                </button>

                {/* Header */}
                <div className={`relative overflow-hidden rounded-3xl border-2 border-[#2A2A2A] mb-8 min-h-[200px] flex flex-col justify-end p-8 bg-gradient-to-br ${frontmatter.gradient || "from-gray-800 to-gray-900"}`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{frontmatter.title}</h1>
                        <p className="text-white/80 text-lg">{frontmatter.desc}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {frontmatter.tags && frontmatter.tags.map((tag: string, i: number) => (
                                <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                {/* Content Card */}
                {/* Content Card */}
                <div className="bg-[var(--card-bg)] rounded-3xl border-2 border-[#2A2A2A] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--accent)]/5 to-transparent pointer-events-none" />
                    <CustomMarkdown content={content} />
                </div>
            </div>
        </motion.div>
    );
}
