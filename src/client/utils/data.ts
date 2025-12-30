
// Simple Frontmatter Parser to avoid heavy node-polyfills in browser if possible, 
// or we can use regex since we control the format.
// Format is consistently:
// ---
// key: "value"
// key: ["val1", "val2"]
// ---
// Body...

export interface Frontmatter {
    [key: string]: any;
}

export interface MarkdownPost {
    slug: string;
    frontmatter: Frontmatter;
    content: string;
}

function parseFrontmatter(text: string): { frontmatter: Frontmatter; content: string } {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
    const match = text.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: text };
    }

    const yamlBlock = match[1];
    const content = match[2].trim();

    const frontmatter: Frontmatter = {};
    const lines = yamlBlock.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Clean quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }

            // Simple array parsing (e.g., ["a", "b"])
            if (value.startsWith('[') && value.endsWith(']')) {
                const arrayContent = value.slice(1, -1);
                frontmatter[key] = arrayContent.split(',').map(s => {
                    s = s.trim();
                    if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
                    return s;
                });
            } else {
                frontmatter[key] = value;
            }
        }
    }

    return { frontmatter, content };
}

export async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(`${url}?t=${Date.now()}`);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
}

export async function fetchMarkdown(url: string, slug: string): Promise<MarkdownPost> {
    const res = await fetch(`${url}?t=${Date.now()}`);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const text = await res.text();
    const { frontmatter, content } = parseFrontmatter(text);
    return { slug, frontmatter, content };
}

// Helpers for specific content types
export async function getProjectList() {
    const slugs = await fetchJson<string[]>('/data/projects/index.json');
    const promises = slugs.map(slug => fetchMarkdown(`/data/projects/${slug}.md`, slug));
    return Promise.all(promises);
}

export async function getBlogList() {
    const slugs = await fetchJson<string[]>('/data/blog/index.json');
    const promises = slugs.map(slug => fetchMarkdown(`/data/blog/${slug}.md`, slug));
    return Promise.all(promises);
}
