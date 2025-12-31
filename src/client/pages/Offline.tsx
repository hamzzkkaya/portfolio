import React from 'react';
import { motion } from 'framer-motion';

const Offline: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0A0A0A]">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Main Card */}
                <div className="bg-[#121212] rounded-[2.5rem] border-2 border-[#2A2A2A] p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-black/50 text-center group">

                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] z-0 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Icon Container with Radar Effect */}
                        <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                            <span className="absolute inset-0 border-2 border-red-500/20 rounded-full animate-ping [animation-duration:3s]" />
                            <span className="absolute inset-2 border-2 border-red-500/40 rounded-full animate-ping [animation-duration:2s]" />
                            <div className="relative w-24 h-24 bg-[#1a1a1a] border-2 border-[#333] rounded-full flex items-center justify-center shadow-xl z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                                    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                                    <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                                    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                                    <line x1="12" y1="20" x2="12.01" y2="20"></line>
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Bağlantı Kesildi</h1>
                        <p className="text-[#888] mb-10 leading-relaxed font-medium">
                            Yörünge dışına çıktınız.<br />Bağlantı bekleniyor...
                        </p>

                        {/* Minimalist Bordered Button */}
                        <button
                            onClick={() => window.location.reload()}
                            className="group relative px-10 py-4 rounded-full border-2 border-[#333] bg-[#0A0A0A]/50 backdrop-blur-md text-[#888] font-medium tracking-wide hover:border-red-500 hover:text-white hover:bg-red-500/10 transition-all duration-300 transform active:scale-95 w-full md:w-auto"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
                                Yeniden Dene
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Offline;
