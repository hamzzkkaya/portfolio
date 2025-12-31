import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '../router';

const NotFound: React.FC = () => {
    const { push } = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0A0A0A]">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-xl"
            >
                {/* Main Card Container */}
                <div className="bg-[#121212] rounded-[2.5rem] border-2 border-[#2A2A2A] p-12 relative overflow-hidden shadow-2xl shadow-black/50 flex flex-col items-center group">

                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] z-0 pointer-events-none" />

                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] -mr-20 -mt-20 transition-all duration-700 group-hover:bg-[var(--accent)]/10 group-hover:blur-[80px]" />

                    {/* Glitchy 404 Text - Minimalist */}
                    <div className="relative mb-10 z-10">
                        <h1 className="text-[10rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-[6rem] md:text-[8rem] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]">
                                404
                            </h1>
                        </div>
                    </div>

                    {/* Minimalist Bordered Button */}
                    <button
                        onClick={() => push('/')}
                        className="relative z-10 group px-10 py-4 rounded-full border-2 border-[#333] bg-[#0A0A0A]/50 backdrop-blur-md text-[#888] font-medium tracking-wide hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 transform active:scale-95"
                    >
                        <span className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                            Ana Sayfaya Dön
                        </span>
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default NotFound;
