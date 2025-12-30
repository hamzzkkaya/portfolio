import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchJson, getBlogList, type MarkdownPost } from "../utils/data";
import { useRouter } from "../router";

interface BlogHeader {
    header: {
        badge: string;
        title: string;
        description: string;
    }
}

export default function Blog() {
    const { navigate } = useRouter();
    const radiusClass = "rounded-2xl";
    const borderClass = "border-2 border-[#2A2A2A] hover:border-[#404040]";

    const [header, setHeader] = useState<BlogHeader | null>(null);
    const [posts, setPosts] = useState<MarkdownPost[]>([]);

    useEffect(() => {
        fetchJson<BlogHeader>('/data/blog.json').then(setHeader);
        getBlogList().then(setPosts);
    }, []);

    if (!header) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center py-20 px-4 md:py-10 pb-32"
        >
            <div className="w-full max-w-4xl mx-auto h-auto">

                {/* 1. HEADER CARD */}
                <div className={`bg-[var(--card-bg)] ${radiusClass} ${borderClass} p-8 relative overflow-hidden flex flex-col justify-center min-h-[160px] mb-6`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider border border-[var(--accent)]/20 mb-3`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                            {header.header.badge}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            {header.header.title}<span className="text-[var(--accent)]">.</span>
                        </h1>
                        <p className="text-[var(--text-muted)] text-sm md:text-base max-w-lg">
                            {header.header.description}
                        </p>
                    </div>
                </div>

                {/* 2. BLOG POST LIST */}
                <div className="flex flex-col gap-4">
                    {posts.map((post, i) => (
                        <div
                            key={i}
                            className={`group bg-[var(--card-bg)] ${radiusClass} ${borderClass} p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer transition-all duration-300 hover:scale-[1.005] hover:bg-[#0F0F0F]`}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                            {/* Left: Meta Info */}
                            <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1 text-[var(--text-muted)] text-xs font-mono shrink-0 md:w-32">
                                <span className="text-white/80">{post.frontmatter.date}</span>
                                <span className="hidden md:inline w-8 h-[1px] bg-[#333] my-1" />
                                <span>{post.frontmatter.readTime} read</span>
                            </div>

                            {/* Middle: Content */}
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                                        {post.frontmatter.title}
                                    </h2>
                                    <span className="hidden md:inline-flex px-2 py-0.5 rounded border border-[#333] bg-[#1a1a1a] text-[10px] text-[#888] font-medium">
                                        {post.frontmatter.tag}
                                    </span>
                                </div>
                                <p className="text-[#888] text-sm leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                                    {post.frontmatter.excerpt}
                                </p>
                                {/* Mobile Tag */}
                                <span className="md:hidden mt-3 inline-flex px-2 py-0.5 rounded border border-[#333] bg-[#1a1a1a] text-[10px] text-[#888] font-medium">
                                    {post.frontmatter.tag}
                                </span>
                            </div>

                            {/* Right: Arrow */}
                            <div className="hidden md:flex text-[#444] group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </motion.div>
    );
}
