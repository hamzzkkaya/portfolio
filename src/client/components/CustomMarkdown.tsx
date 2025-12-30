import React, { ReactNode } from 'react';
import { motion } from "framer-motion";

interface CustomMarkdownProps {
    content: string;
}

export const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ content }) => {
    // 1. Split content into logical blocks (Code blocks, Tables, Normal text)
    const blocks: { type: string; content: string }[] = [];
    const lines = content.split('\n');

    let currentBlock = { type: 'text', content: '' };
    let insideCodeBlock = false;
    let insideTable = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // --- Code Block handling ---
        if (line.trim().startsWith('```')) {
            if (insideCodeBlock) {
                // End of code block
                currentBlock.content += line; // Add closing ticks
                blocks.push(currentBlock);
                currentBlock = { type: 'text', content: '' };
                insideCodeBlock = false;
            } else {
                // Start of code block
                if (currentBlock.content) blocks.push(currentBlock);
                currentBlock = { type: 'code', content: line + '\n' };
                insideCodeBlock = true;
            }
            continue;
        }

        if (insideCodeBlock) {
            currentBlock.content += line + '\n';
            continue;
        }

        // --- Table Handling ---
        // A simple check: does the line start and end with | ?
        const isTableLine = line.trim().startsWith('|') && line.trim().endsWith('|');
        if (isTableLine) {
            if (!insideTable) {
                if (currentBlock.content) blocks.push(currentBlock);
                currentBlock = { type: 'table', content: line + '\n' };
                insideTable = true;
            } else {
                currentBlock.content += line + '\n';
            }
            continue;
        } else if (insideTable) {
            // End of table
            blocks.push(currentBlock);
            currentBlock = { type: 'text', content: '' };
            insideTable = false;
        }

        // --- Normal Text ---
        // If we are just accumulating text
        currentBlock.content += line + '\n';
    }
    if (currentBlock.content) blocks.push(currentBlock);


    // 2. Render each block
    return (
        <div className="flex flex-col gap-4 text-[#B0B0B0] leading-relaxed">
            {blocks.map((block, index) => {
                if (block.type === 'code') return <CodeBlock key={index} content={block.content} />;
                if (block.type === 'table') return <TableBlock key={index} content={block.content} />;
                return <TextBlock key={index} content={block.content} />;
            })}
        </div>
    );
};

// --- Sub-Components ---

const CodeBlock = ({ content }: { content: string }) => {
    // Remove first and last line (the backticks)
    const lines = content.trim().split('\n');
    // Basic cleanup
    const code = lines.slice(1, lines.length - 1).join('\n');
    return (
        <div className="my-4 rounded-xl overflow-hidden border border-[#333] bg-[#111]">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-[var(--accent)]">
                <code>{code}</code>
            </pre>
        </div>
    );
};

const TableBlock = ({ content }: { content: string }) => {
    const rows = content.trim().split('\n').map(row =>
        row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
    );
    // Assuming first row is header, second is separator
    const header = rows[0];
    // separator is rows[1], ignore it
    const body = rows.slice(2);

    return (
        <div className="my-6 overflow-hidden rounded-xl border border-[#333]">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-[#1a1a1a] text-white">
                            {header.map((head, i) => (
                                <th key={i} className="px-6 py-4 font-bold border-b border-[#333] tracking-wider">
                                    <InlineParser text={head} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222] bg-[#0F0F0F]">
                        {body.map((row, i) => (
                            <tr key={i} className="hover:bg-[#151515] transition-colors">
                                {row.map((cell, j) => (
                                    <td key={j} className="px-6 py-4 text-[#888]">
                                        <InlineParser text={cell} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TextBlock = ({ content }: { content: string }) => {
    const lines = content.split('\n');
    return (
        <>
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-4" />; // Spacer

                // --- Headers ---
                if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 tracking-tight"><InlineParser text={line.substring(2)} /></h1>;
                }
                if (line.startsWith('## ')) {
                    // Removed border-b as requested suitable for "custom plan"
                    return <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4"><InlineParser text={line.substring(3)} /></h2>;
                }

                // --- Blockquotes / Indented Text ---
                if (line.startsWith('> ')) {
                    return (
                        <div key={i} className="pl-4 border-l-4 border-[var(--accent)] bg-[#1a1a1a] p-4 rounded-r-xl italic text-white/80 my-4">
                            <InlineParser text={line.substring(2)} />
                        </div>
                    );
                }

                // --- Divider ---
                if (trimmed === '-----') {
                    return <hr key={i} className="my-8 border-[#333]" />;
                }

                // --- Lists ---
                if (line.trim().startsWith('- ')) {
                    // Check indent to determine nestedness (simple approach)
                    const isNested = line.startsWith('  ');
                    return (
                        <div key={i} className={`flex items-start gap-2 mb-2 ${isNested ? 'ml-6' : ''}`}>
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                            <span><InlineParser text={line.trim().substring(2)} /></span>
                        </div>
                    );
                }

                // --- Checkboxes ---
                if (trimmed.startsWith('[ ] ')) {
                    return (
                        <div key={i} className="flex items-center gap-3 mb-2 group">
                            <div className="w-5 h-5 rounded border-2 border-[#444] group-hover:border-[var(--accent)] transition-colors" />
                            <span className="text-[#999] group-hover:text-white transition-colors"><InlineParser text={trimmed.substring(4)} /></span>
                        </div>
                    );
                }
                if (trimmed.startsWith('[x] ')) {
                    return (
                        <div key={i} className="flex items-center gap-3 mb-2">
                            <div className="w-5 h-5 rounded bg-[var(--accent)] border-2 border-[var(--accent)] flex items-center justify-center text-black font-bold text-xs">✓</div>
                            <span className="text-white line-through decoration-[#555] opacity-60"><InlineParser text={trimmed.substring(4)} /></span>
                        </div>
                    );
                }

                // --- Regular Paragraph ---
                // User wanted indentation if it's a paragraph after a blank line.
                // We simplify by just giving standard paragraph spacing and handling inline content.
                return (
                    <p key={i} className="mb-2">
                        <InlineParser text={line} />
                    </p>
                );
            })}
        </>
    );
};

// --- Inline Parser (Bold, Italic, Link, Image, Spoiler, Underline, Strikethrough) ---
const InlineParser = ({ text }: { text: string }) => {
    // We will parse recursively or using a tokenizer regex approach.
    // Given the simplicity, we can do splitting.

    // Regex for all tokens
    // 1. Image: ![alt](src)
    // 2. Link: [label](url)
    // 3. Bold: **text**
    // 4. Italic: *text*
    // 5. Underline: __text__
    // 6. Spoiler: ||text||
    // 7. Inline Code: `text` (optional but good to have) - User didn't ask explicitly but implied with code blocks. 
    // 8. Strikethrough: ~text~

    // This regex splits the text and keeps the delimiters/tokens
    const regex = /(!\[.*?\]\(.*?\))|(\[.*?\]\(.*?\))|(\*\*.*?\*\*)|(\*.*?\*)|(__.*?__)|(\|\|.*?\|\|)|(~.*?~)/g;

    const parts = text.split(regex).filter(p => p);

    return (
        <>
            {parts.map((part, index) => {
                if (!part) return null; // Safety check

                // Image
                if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
                    const alt = part.substring(2, part.indexOf(']('));
                    const src = part.substring(part.indexOf('](') + 2, part.length - 1);
                    return <img key={index} src={src} alt={alt} className="rounded-xl my-4 border-2 border-[#2A2A2A] shadow-lg w-full max-w-2xl" />;
                }
                // Link
                if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                    const label = part.substring(1, part.indexOf(']('));
                    const url = part.substring(part.indexOf('](') + 2, part.length - 1);
                    return <a key={index} href={url} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline underline-offset-4">{label}</a>;
                }
                // Bold
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="text-white font-bold">{part.substring(2, part.length - 2)}</strong>;
                }
                // Italic
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={index} className="italic text-white/90">{part.substring(1, part.length - 1)}</em>;
                }
                // Underline
                if (part.startsWith('__') && part.endsWith('__')) {
                    return <u key={index} className="decoration-[var(--accent)] underline-offset-4">{part.substring(2, part.length - 2)}</u>;
                }
                // Strikethrough
                if (part.startsWith('~') && part.endsWith('~')) {
                    return <span key={index} className="line-through opacity-60 decoration-white/50">{part.substring(1, part.length - 1)}</span>;
                }
                // Spoiler
                if (part.startsWith('||') && part.endsWith('||')) {
                    return (
                        <span key={index} className="bg-[#333] text-transparent hover:text-white hover:bg-transparent transition-all duration-300 rounded px-1 cursor-help select-none hover:select-auto">
                            {part.substring(2, part.length - 2)}
                        </span>
                    );
                }

                return <span key={index}>{part}</span>;
            })}
        </>
    );
};
