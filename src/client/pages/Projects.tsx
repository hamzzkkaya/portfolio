import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchJson, getProjectList, MarkdownPost } from "../utils/data";
import { useRouter } from "../router";

interface ProjectsHeader {
    header: {
        badge: string;
        title: string;
        description: string;
    }
}

export default function Projects() {
    const { navigate } = useRouter();
    const radiusClass = "rounded-2xl";
    const borderClass = "border-2 border-[#2A2A2A] hover:border-[#404040]";

    const [header, setHeader] = useState<ProjectsHeader | null>(null);
    const [projects, setProjects] = useState<MarkdownPost[]>([]);

    useEffect(() => {
        // Fetch Header Info
        fetchJson<ProjectsHeader>('/data/projects.json').then(setHeader);
        // Fetch Project Items
        getProjectList().then(setProjects);
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

                {/* 1. HEADER */}
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
                        <p className="text-[var(--text-muted)] text-sm md:text-base max-w-xl">
                            {header.header.description}
                        </p>
                    </div>
                </div>

                {/* 2. GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/projects/${projects[i].slug}`)} // Assuming project items align with slugs from getProjectList
                            className={`group bg-[var(--card-bg)] ${radiusClass} ${borderClass} relative overflow-hidden flex flex-col min-h-[220px] cursor-pointer transition-transform duration-300 hover:-translate-y-1`}
                        >
                            {/* Abstract Header Image */}
                            <div className={`h-24 w-full bg-gradient-to-br ${project.frontmatter.gradient || 'from-gray-500/20 to-slate-500/20'} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2]" />
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-2 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                                        {project.frontmatter.title}
                                    </h3>
                                    <p className="text-[#888] text-sm leading-relaxed mb-4">
                                        {project.frontmatter.desc}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.frontmatter.tags && project.frontmatter.tags.map((tag: string, t: number) => (
                                        <span key={t} className="px-2 py-1 bg-[#1a1a1a] border border-[#333] rounded-md text-[10px] text-[#777] font-mono">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </motion.div>
    );
}
