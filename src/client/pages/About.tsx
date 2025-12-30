import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchJson } from "../utils/data";

interface AboutData {
    header: {
        badge: string;
        title: string;
        description: string;
    };
    bio: {
        title: string;
        content: string;
    };
    skills: {
        title: string;
        list: string[];
    };
    timeline: {
        title: string;
        items: {
            year: string;
            title: string;
            desc: string;
        }[];
    };
}

export default function About() {
    const radiusClass = "rounded-2xl";
    const borderClass = "border-2 border-[#2A2A2A] hover:border-[#404040]";

    const [data, setData] = useState<AboutData | null>(null);

    useEffect(() => {
        fetchJson<AboutData>('/data/about.json').then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center py-20 px-4 md:py-10 pb-32"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto h-auto">

                {/* 1. HEADER CARD */}
                <div className={`col-span-1 md:col-span-3 bg-[var(--card-bg)] ${radiusClass} ${borderClass} p-8 relative overflow-hidden flex flex-col justify-center min-h-[180px]`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider border border-[var(--accent)]/20 mb-3`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                            {data.header.badge}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            {data.header.title}
                        </h1>
                        <p className="text-[var(--text-muted)] text-sm md:text-base max-w-2xl">
                            {data.header.description}
                        </p>
                    </div>
                </div>

                {/* 2. BIO & SKILLS */}
                <div className={`col-span-1 md:col-span-2 bg-[var(--card-bg)] ${radiusClass} ${borderClass} p-8 flex flex-col border-2 overflow-hidden relative justify-between min-h-[500px]`}>
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Bio Section */}
                    <div className="mb-8 z-10 relative">
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[var(--accent)] rounded-full" />
                            {data.bio.title}
                        </h3>
                        <p className="text-[#a0a0a0] text-sm md:text-base leading-7 whitespace-pre-wrap font-medium">
                            {data.bio.content}
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div className="mt-auto pt-8 border-t border-[#1a1a1a] z-10 relative">
                        <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 text-[var(--text-muted)]">
                            {data.skills.title}
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {data.skills.list.map((skill, i) => (
                                <span key={i} className="px-3.5 py-1.5 bg-[#151515] border border-[#2A2A2A] rounded-lg text-xs font-semibold text-[#888] hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-300 cursor-default shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>


                {/* 3. TIMELINE */}
                <div className={`col-span-1 bg-[#0F0F0F] ${radiusClass} ${borderClass} p-6 flex flex-col`}>
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {data.timeline.title}
                    </h3>

                    <div className="flex flex-col gap-6 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[#222]" />

                        {data.timeline.items.map((item, i) => (
                            <div key={i} className="flex gap-4 relative z-10 group">
                                <div className="w-4 h-4 rounded-full bg-[#1a1a1a] border border-[#333] shrink-0 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors mt-0.5" />
                                <div>
                                    <span className="text-[10px] font-mono text-[var(--accent)] mb-0.5 block">{item.year}</span>
                                    <h4 className="text-white text-sm font-bold">{item.title}</h4>
                                    <p className="text-[11px] text-[#666]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
