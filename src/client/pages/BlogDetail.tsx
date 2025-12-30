import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CustomMarkdown } from "../components/CustomMarkdown";
import { fetchMarkdown, MarkdownPost } from "../utils/data";

export default function BlogDetail({ slug }: { slug: string }) {
    const [post, setPost] = useState<MarkdownPost | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchMarkdown(`/data/blog/${slug}.md`, slug)
            .then(setPost)
            .catch(() => setError(true));
    }, [slug]);

    if (error) return <div className="text-white text-center py-20">Yazı bulunamadı.</div>;
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
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mb-8 flex items-center gap-2 text-[#888] hover:text-white transition-colors text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Blog'a Dön
                </button>

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs font-mono text-[var(--accent)] mb-4 uppercase tracking-widest">
                        <span>{frontmatter.date}</span>
                        <span className="w-1 h-3 bg-[#333]" />
                        <span>{frontmatter.tag}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{frontmatter.title}</h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-[#666]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{frontmatter.readTime} okuma süresi</span>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#222] mb-10" />

                {/* Content */}
                {/* Content Card */}
                <div className="bg-[var(--card-bg)] rounded-3xl border-2 border-[#2A2A2A] p-8 md:p-12 relative overflow-hidden">
                    {/* Subtle Glow at top */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                    <CustomMarkdown content={content} />
                </div>
            </div>
        </motion.div>
    );
}
