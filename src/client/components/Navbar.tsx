import { motion } from "framer-motion";
import { Link, useRouter } from "../router";

export default function Navbar() {
    const { path } = useRouter();

    // Icons
    const navItems = [
        { path: '/', label: 'Home', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { path: '/about', label: 'About', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { path: '/projects', label: 'Projects', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { path: '/blog', label: 'Blog', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg> },
    ];

    return (
        <>
            {/* DESKTOP NAVBAR (Right Side) */}
            <nav className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
                <motion.div
                    // Outer Radius: 20px (1.25rem)
                    className="relative bg-[#0A0A0A]/60 backdrop-blur-xl border-2 border-[#333] py-2 px-2 shadow-2xl flex flex-col gap-1.5 overflow-hidden"
                    style={{ borderRadius: "1.25rem" }}
                    initial="closed"
                    whileHover="open"
                    animate="closed"
                    variants={{
                        open: { width: "160px", alignItems: "flex-start", backgroundColor: "rgba(10,10,10,0.9)" },
                        closed: { width: "60px", alignItems: "center", backgroundColor: "rgba(10,10,10,0.6)" }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] pointer-events-none" />

                    <div className="relative z-10 w-full flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                // Inner Radius: 12px (0.75rem)
                                // IMPORTANT: justify-start by default, but this can cause centering issues if p-2 aligns left.
                                // With p-2 and w-full in a 60px closed container, we need to be careful. 
                                // Best fix: use justifty-center IF closed? No, because we cant detect closed state easily in CSS.
                                // Solution: Use a fixed width for the icon container (w-10 or w-full) that centers itself?
                                // Let's try: 'pl-2.5' aligns the icon better in closed state? 44px box inside 56px...
                                // Or simply 'justify-start' but rely on consistent padding.
                                className={`group flex items-center gap-3 p-2 rounded-xl transition-all w-full relative h-[40px] overflow-hidden ${path === item.path
                                    ? "text-white"
                                    : "text-[#777] hover:text-white"
                                    }`}
                            >
                                {/* Active Background: ACCENT (Blue) */}
                                {path === item.path && (
                                    <motion.div
                                        layoutId="nav-bg-desktop"
                                        className="absolute inset-0 bg-[var(--accent)] rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}

                                {/* Icon Wrapper: w-6 to limit width. Centering logic: flex justify-center? */}
                                <span className="shrink-0 flex items-center justify-center w-6 relative z-10">
                                    {item.icon}
                                </span>

                                <motion.span
                                    className="font-medium text-[13px] whitespace-nowrap relative z-10"
                                    variants={{
                                        open: { opacity: 1, x: 0, display: "block" },
                                        closed: { opacity: 0, x: 20, display: "none" }
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.label}
                                </motion.span>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </nav>

            {/* MOBILE NAVBAR (Bottom Bar) */}
            <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
                <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333] px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-4">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} className={`relative flex items-center justify-center w-12 h-12`}>
                            {/* Mobile Active: Accent */}
                            {path === item.path && (
                                <motion.div
                                    layoutId="nav-bg-mobile"
                                    className="absolute inset-0 bg-[var(--accent)] rounded-xl shadow-lg"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}

                            <div className={`relative z-10 p-2 transition-all ${path === item.path ? 'text-white' : 'text-[#666] hover:text-white'}`}>
                                {item.icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}
