import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchJson } from "../utils/data";
import { useRouter } from "../router";

interface HomeData {
    hero: {
        badge: string;
        title: string;
        description_prefix: string;
        description_highlight1: string;
        description_highlight2: string;
        description_suffix: string;
    };
    featured: {
        label: string;
        title: string;
        description: string;
    };
    socials: {
        platform: string;
        url: string;
    }[];
    ticker: string;
    ads: {
        title: string;
        subtitle: string;
        url: string;
    };
}

// Icon mapper
const getIcon = (platform: string) => {
    switch (platform) {
        case 'github': return <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
        case 'steam': return <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><title>Steam icon</title><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" /></svg>;
        case 'contact': return <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>;
        case 'instagram': return <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><title>Instagram icon</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>;
        default: return null;
    }
}

// Hover colors
const getHoverBg = (platform: string) => {
    switch (platform) {
        case 'github': return "hover:bg-[#24292e]";
        case 'steam': return "hover:bg-[#1b2838]";
        case 'contact': return "hover:bg-emerald-500";
        case 'instagram': return "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-600";
        default: return "hover:bg-white hover:text-black";
    }
}

export default function Home() {
    const radiusClass = "rounded-3xl";
    const borderClass = "border-2 border-[#2A2A2A] hover:border-[#404040]";

    const { navigate } = useRouter();

    const [data, setData] = useState<HomeData | null>(null);

    useEffect(() => {
        fetchJson<HomeData>('/data/home.json').then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col justify-center items-center py-20 px-4 md:py-10 pb-32"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto h-auto">

                {/* 1. HERO CARD */}
                <div className={`col-span-1 md:col-span-2 bg-[var(--card-bg)] ${radiusClass} ${borderClass} p-8 relative overflow-hidden group flex flex-col justify-center shadow-2xl shadow-black/20 min-h-[340px]`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] z-0 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-[100px] -mr-20 -mt-20 transition-all duration-700 group-hover:bg-[var(--accent)]/15 group-hover:blur-[80px]" />

                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#333] text-[var(--accent)] text-[11px] font-bold uppercase tracking-wider mb-6 shadow-sm`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            {data.hero.badge}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5 drop-shadow-lg">
                            {data.hero.title}<span className="text-[var(--accent)]">.</span>
                        </h1>
                        <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed max-w-sm font-medium">
                            {data.hero.description_prefix}
                            <br />
                            <span className="text-white font-semibold decoration-[var(--accent)] decoration-2 underline-offset-2">{data.hero.description_highlight1}</span> ve <span className="text-white font-semibold">{data.hero.description_highlight2}</span> {data.hero.description_suffix}
                        </p>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN */}
                <div className="col-span-1 flex flex-col gap-4 h-full">

                    {/* Featured Teaser */}
                    <div className={`h-[140px] bg-[#0F0F0F] ${radiusClass} ${borderClass} p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer`} onClick={() => navigate('/projects')}>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

                        <div className="relative z-20 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-[var(--accent)] font-mono uppercase tracking-widest mb-0.5">{data.featured.label}</span>
                                <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform">{data.featured.title}</h3>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                        <div className="relative z-20">
                            <p className="text-[#666] text-[10px] font-medium leading-tight mt-1 group-hover:text-[#888] transition-colors">
                                {data.featured.description}
                            </p>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex-grow grid grid-cols-2 gap-4">
                        {data.socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                className={`w-full h-full min-h-[100px] md:min-h-0 flex items-center justify-center rounded-3xl bg-[var(--card-bg)] text-[#888] ${getHoverBg(social.platform)} hover:text-white border-2 border-[#2A2A2A] hover:border-transparent transition-all duration-300 shadow-xl`}
                            >
                                {getIcon(social.platform)}
                            </a>
                        ))}
                    </div>

                </div>

                {/* 3. BRAND TICKER */}
                <div className={`col-span-1 md:col-span-2 h-[64px] bg-[var(--card-bg)] ${radiusClass} ${borderClass} relative overflow-hidden flex items-center`}>
                    <motion.div
                        className="flex whitespace-nowrap absolute"
                        animate={{ x: [0, -1000] }}
                        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                    >
                        {Array(20).fill(data.ticker).map((text, i) => (
                            <span key={i} className="text-3xl font-black text-[var(--accent)] opacity-10 mr-8 tracking-tighter">
                                {text}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* 4. ADS */}
                <a
                    href={data.ads.url}
                    target="_blank"
                    className={`col-span-1 h-[64px] bg-[#0A0A0A] ${radiusClass} ${borderClass} flex items-center justify-between px-6 group cursor-pointer hover:bg-[#1a1a1a] transition-all`}
                >
                    <div className="flex flex-col">
                        <span className="font-bold text-white text-sm">{data.ads.title}</span>
                        <span className="text-[10px] text-[var(--text-muted)] group-hover:text-[#888]">{data.ads.subtitle}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </a>

            </div>
        </motion.div>
    );
}
