import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
    role: 'user' | 'model';
    text: string;
};

type FAQ = {
    id: string;
    question: string;
    answer: string;
};

// User provided complex icon path
const AssistantIcon = ({ className }: { className?: string }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className={className} fill="currentColor">
        <path d="M481.500122,482.395630 C473.334778,482.398071 465.168823,482.344269 457.004303,482.427673 C453.149078,482.467041 449.666840,483.551147 447.998169,487.476532 C446.354462,491.343262 449.002869,493.757843 451.347717,496.116882 C484.152954,529.120544 517.075867,562.008179 549.720032,595.170166 C556.012024,601.561951 561.870056,604.697937 571.417175,602.009216 C582.162903,598.982849 593.573853,598.300293 604.707886,596.684265 C607.655090,596.256531 610.425537,596.726013 611.782410,599.896423 C613.021851,602.792358 611.586182,604.820557 609.689819,606.981934 C604.315125,613.107849 597.888611,618.130249 592.237183,623.933105 C575.856567,640.752747 558.545898,656.611450 541.877625,673.130493 C533.510437,681.422791 525.216797,689.790039 516.802368,698.033936 C500.873688,713.639771 484.966492,729.269775 468.843506,744.673218 C465.690094,747.685852 463.133179,750.425781 465.058502,754.896606 C466.968109,759.330872 471.085052,759.638733 475.190613,759.639465 C503.853516,759.644531 532.516418,759.618652 561.179321,759.650085 C564.462097,759.653687 567.480469,759.075989 569.919373,756.750000 C573.161072,753.658203 576.687500,750.855774 579.922058,747.805542 C596.003784,732.640381 611.787781,717.159485 627.682495,701.795898 C638.258484,691.573364 648.820862,681.336609 659.432190,671.150818 C670.699829,660.335144 681.471008,649.013550 693.203491,638.664185 C698.133972,634.315002 697.957825,630.126526 693.680847,625.756897 C681.772400,613.590637 669.864441,601.423218 657.866638,589.345276 C645.419006,576.814392 632.842651,564.411499 620.364990,551.910400 C598.731201,530.236084 577.081238,508.577454 555.568359,486.783661 C552.372925,483.546509 548.973572,482.272949 544.491455,482.307831 C523.828735,482.468658 503.164093,482.389038 481.500122,482.395630 M445.336090,558.133240 C444.348175,557.023499 443.412354,555.861755 442.364441,554.811890 C429.353210,541.776672 416.399445,528.682556 403.252197,515.785767 C399.816620,512.415649 396.758087,507.697784 390.912476,508.560028 C377.317200,510.565369 363.747467,512.749573 350.186890,514.979858 C347.032288,515.498718 343.761292,515.750732 342.247284,512.628479 C340.575592,509.181030 341.640503,505.633911 344.819916,503.307678 C347.810364,501.119659 350.288147,498.443054 352.881287,495.868439 C363.495667,485.329895 373.982269,474.660950 384.690521,464.219055 C403.786346,445.598145 423.024628,427.123383 442.170502,408.553650 C450.296417,400.672302 458.102844,392.443756 466.492432,384.857300 C473.665405,378.370941 480.500549,371.569550 487.031464,364.483978 C490.769653,360.428314 489.141418,355.482117 484.102051,353.153381 C482.013885,352.188446 479.872803,352.375519 477.726685,352.374481 C451.570007,352.362030 425.408600,352.655426 399.259247,352.218689 C390.029633,352.064545 383.202271,354.422852 376.414185,361.267151 C357.132935,380.707977 336.790009,399.091339 317.042969,418.076050 C298.027039,436.357880 279.240326,454.878052 260.336975,473.277161 C255.474167,478.010345 255.238266,480.482178 260.021149,485.394684 C274.981537,500.760681 289.585815,516.464722 304.825287,531.569519 C335.934418,562.403687 366.801178,593.483337 397.605408,624.622559 C400.458496,627.506714 403.220490,628.729431 407.155060,628.712097 C431.811829,628.603394 456.469299,628.661621 481.126556,628.660706 C487.124237,628.660461 493.121918,628.630127 499.119537,628.644653 C502.123901,628.651917 504.273071,627.196899 505.432953,624.577393 C506.602844,621.935303 506.132751,619.378967 504.042053,617.236877 C502.762299,615.925659 501.509552,614.587952 500.220520,613.286011 C482.138031,595.022766 464.051361,576.763733 445.336090,558.133240 M597.584167,460.060944 C597.921326,460.998596 598.297241,461.924347 598.588989,462.875946 C600.002869,467.488403 601.833984,472.342926 607.392456,472.359894 C612.875488,472.376648 614.109436,467.203033 615.676941,463.006439 C620.789734,449.318237 626.506592,435.810638 630.727661,421.851532 C633.201172,413.671661 638.754517,411.020935 645.649597,408.546906 C659.710022,403.501953 673.619446,398.037231 687.613770,392.806335 C691.999573,391.166962 693.445801,387.973602 692.400635,383.709381 C691.490051,379.994171 687.998047,378.776917 684.951355,377.644836 C669.726196,371.987488 654.419556,366.549835 639.155457,360.996796 C635.851929,359.794983 633.713379,357.482513 632.474792,354.110107 C626.701782,338.391296 620.756836,322.735504 615.012878,307.006287 C613.557861,303.022034 611.901917,299.328644 607.003418,299.487793 C602.459534,299.635406 600.695984,303.304352 599.331909,306.957520 C593.830139,321.691986 587.943481,336.307037 583.150757,351.271027 C580.976990,358.058075 576.583191,360.450714 570.683899,362.522125 C556.005737,367.676178 541.442505,373.163300 526.898926,378.689789 C524.052856,379.771271 521.875183,381.896729 521.456543,385.287323 C521.004150,388.951447 523.338196,390.753632 526.021912,392.301086 C527.894409,393.380829 529.770508,394.538239 531.786560,395.271637 C544.403137,399.861053 557.155884,404.094025 569.658142,408.971466 C575.111938,411.099182 580.835876,412.587524 583.054749,420.070190 C587.005920,433.394196 592.525269,446.253204 597.584167,460.060944 M767.619812,339.792847 C762.533203,336.993225 757.102783,334.971039 751.561646,333.393860 C745.632019,331.706024 741.863159,328.626495 740.369507,322.256012 C739.172974,317.152649 737.231750,312.115784 734.569153,307.481659 C733.634460,305.854828 732.410645,304.312836 730.327332,304.481689 C728.110352,304.661377 726.934021,306.201294 726.218811,308.278992 C724.329468,313.767792 722.230103,319.185059 720.384399,324.687897 C719.206360,328.200073 717.419006,330.660156 713.564331,331.812805 C708.667969,333.276917 703.936218,335.333832 699.218384,337.335388 C696.594604,338.448547 692.615356,338.707916 692.682129,342.483856 C692.752380,346.458069 696.531067,347.448883 699.671692,348.592926 C704.345215,350.295349 708.984131,352.103149 713.706543,353.657227 C716.965454,354.729675 719.006653,356.582275 720.023743,359.985413 C721.634033,365.373657 723.578247,370.667816 725.539185,375.943115 C726.461426,378.424103 727.503601,381.321045 730.664612,381.426483 C733.985535,381.537201 734.771179,378.541870 735.683533,376.045837 C737.561096,370.908813 739.521545,365.795746 741.182068,360.588043 C742.262573,357.199524 743.874878,354.821747 747.536987,353.693420 C753.388062,351.890594 759.145691,349.742798 764.832764,347.465759 C767.927856,346.226471 771.581543,344.774231 767.619812,339.792847 M652.923035,282.380676 C650.665894,283.326355 648.098328,283.826050 646.970154,286.433411 C647.712891,288.838470 649.608887,289.957214 651.701416,290.533081 C657.208191,292.048553 661.297058,294.727173 662.045837,300.993866 C662.288940,303.028412 663.608398,305.056091 665.738892,305.241760 C668.357361,305.469940 669.421021,303.080048 669.889343,300.986237 C671.194580,295.150848 674.801758,291.929535 680.461426,290.478638 C682.339844,289.997101 684.464539,289.011383 684.586792,286.651581 C684.736450,283.762939 682.038513,283.066528 680.140991,282.755280 C674.225037,281.784912 671.325195,278.124664 669.922363,272.731049 C669.673096,271.772705 669.299500,270.838562 668.903381,269.928009 C667.517212,266.741577 665.531921,266.980011 663.673279,269.331085 C662.681702,270.585327 661.994690,272.238739 661.650940,273.816711 C660.673096,278.306061 658.362671,281.354309 652.923035,282.380676 z" />
    </svg>
);

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Offline / FAQ logic
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const [faqs, setFaqs] = useState<FAQ[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Setup: Check Connection & Load FAQs
    useEffect(() => {
        // Load FAQs with safety check
        fetch('/data/faq.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load FAQ');
                return res.json();
            })
            .then(setFaqs)
            .catch(err => console.log('FAQ load failed:', err));

        // Listen for network changes
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check Connectivity (Simulated with a timeout failure or health check)
        const checkConnection = async () => {
            // Should not check if navigator says offline
            if (!navigator.onLine) {
                setIsOnline(false);
                setMessages([{
                    role: 'model',
                    text: "Yapay zeka bağlantısı sağlanamadığı için akıllı seçim modu devreye alındı. Aşağıdan dilediğiniz soruyu seçebilirsiniz. 🔴"
                }]);
                return;
            }

            try {
                // Try to hit the chat endpoint with a dummy ping or just check HEAD
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

                const res = await fetch('/api/chat', {
                    method: 'POST',
                    body: JSON.stringify({ ping: true }),
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                // Critical: Check if we got HTML back (SPA fallback) -> implies 404 API not found
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("text/html")) {
                    throw new Error("API not found (HTML response)");
                }

                if (res.ok || res.status === 405 || res.status === 400) {
                    // If we get a response (even error) from server, it's online
                    setIsOnline(true);
                    setMessages([{
                        role: 'model',
                        text: "Merhaba! Yapay zeka bağlantısı kuruldu. Ben Hamza'nın yapay zeka asistanıyım. Portfolio hakkında bana sorular sorabilirsin. 🟢"
                    }]);
                } else {
                    console.warn("API Error, switching to offline mode");
                    throw new Error("API Response not OK");
                }
            } catch (error) {
                // Network error or timeout -> Offline
                setIsOnline(false);
                setMessages([{
                    role: 'model',
                    text: "Yapay zeka bağlantısı sağlanamadığı için akıllı seçim modu devreye alındı. Aşağıdan dilediğiniz soruyu seçebilirsiniz. 🔴"
                }]);
            }
        };

        checkConnection();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text })
            });
            const data = await res.json();
            setMessages(prev => [...prev, data]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: 'Üzgünüm, bağlantı koptu.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFaqSelect = (faq: FAQ) => {
        // User asks
        const userMsg: Message = { role: 'user', text: faq.question };
        setMessages(prev => [...prev, userMsg]);

        // Bot responds (fake delay for realism)
        setIsLoading(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'model', text: faq.answer }]);
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: {
                        width: 'min(90vw, 340px)',
                        height: 480,
                        borderRadius: "1.5rem",
                        backgroundColor: "rgba(18, 18, 18, 0.85)"
                    },
                    closed: {
                        width: 60,
                        height: 60,
                        borderRadius: "1.5rem",
                        backgroundColor: "rgba(10, 10, 10, 0.6)"
                    }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                className="shadow-2xl backdrop-blur-xl border-2 border-[#262626] overflow-hidden relative flex flex-col"
                style={{ originX: 1, originY: 1 }}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    {isOpen ? (
                        <motion.div
                            key="content-panel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col h-full w-full absolute inset-0"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[#262626] bg-[#121212]/30 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border-2 border-[#2A2A2A] flex items-center justify-center relative overflow-hidden group shadow-lg">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] z-0 pointer-events-none" />
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--accent)]/20 rounded-full blur-[10px] -mr-3 -mt-3" />
                                        <AssistantIcon className="w-8 h-8 text-[var(--accent)] relative z-10" />
                                    </div>
                                    <span className="font-semibold text-white tracking-wide text-sm font-outfit">Assistant Of Hamza</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="text-[#666] hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Card Noise Texture */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0 pointer-events-none" />

                            {/* Messages Area */}
                            <div className="relative z-10 flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                                        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-3">
                                            <AssistantIcon className="w-5 h-5 text-[var(--accent)]" />
                                        </div>
                                        <span className="text-sm font-medium">Nasıl yardımcı olabilirim?</span>
                                    </div>
                                )}

                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`
                                            max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-lg backdrop-blur-md relative
                                            ${msg.role === 'user'
                                                ? 'bg-gradient-to-br from-[var(--accent)] to-[#3b82f6] text-white rounded-3xl'
                                                : 'bg-[#1a1a1a]/60 border-2 border-[#333] text-[#e5e5e5] rounded-3xl'}
                                        `}>
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a
                                                            {...props}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 underline-offset-2 transition-colors"
                                                        />
                                                    ),
                                                    p: ({ node, ...props }) => <p {...props} className="mb-0 last:mb-0" />
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-[#1a1a1a]/60 border-2 border-[#333] px-4 py-3 rounded-3xl flex gap-1.5 items-center backdrop-blur-md shadow-lg">
                                            <div className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce delay-75" />
                                            <div className="w-1.5 h-1.5 bg-[#888] rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="relative z-10 px-4 pb-4 pt-2 bg-transparent shrink-0">
                                {isOnline ? (
                                    <form
                                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                        className="relative flex items-center bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#333] rounded-3xl shadow-2xl focus-within:border-[var(--accent)] focus-within:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] transition-all duration-300"
                                    >
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Mesaj yazın..."
                                            className="w-full bg-transparent text-white placeholder-[#555] text-sm px-5 py-4 focus:outline-none font-medium"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className="mr-2 p-2 rounded-xl text-[#666] hover:text-[var(--accent)] hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                        </button>
                                    </form>
                                ) : (
                                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#333] rounded-3xl shadow-2xl overflow-hidden">
                                        <select
                                            onChange={(e) => {
                                                const selected = faqs.find(f => f.id === e.target.value);
                                                if (selected) handleFaqSelect(selected);
                                                e.target.value = ""; // Reset selection
                                            }}
                                            className="w-full bg-transparent text-white text-sm px-5 py-4 focus:outline-none font-medium appearance-none cursor-pointer hover:bg-white/5 transition-colors"
                                            disabled={isLoading}
                                        >
                                            <option value="" className="bg-[#1a1a1a] text-[#888]">Bir soru seçin...</option>
                                            {faqs.map(faq => (
                                                <option key={faq.id} value={faq.id} className="bg-[#1a1a1a] text-white py-2">
                                                    {faq.question}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--accent)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.button
                            key="content-button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(true)}
                            className="w-full h-full flex items-center justify-center text-[var(--accent)] absolute inset-0 hover:bg-white/5 transition-colors"
                        >
                            <AssistantIcon className="w-12 h-12" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
