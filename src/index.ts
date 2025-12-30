import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';

// Pre-load index.html to ensure it's available and valid
let indexHtml = "";
try {
    indexHtml = await Bun.file('dist/index.html').text();
} catch (e) {
    console.error("CRITICAL: Could not read dist/index.html. Run 'bun run build' first.");
}

const app = new Elysia()
    .use(staticPlugin({
        assets: 'public/data',
        prefix: '/data'
    }))
    .use(staticPlugin({
        assets: 'dist',
        prefix: ''
    }))
    // Explicit root handler
    .get('/', () => new Response(indexHtml, { headers: { 'Content-Type': 'text/html' } }))
    // Explicit wildcard handler for SPA
    .get('*', () => new Response(indexHtml, { headers: { 'Content-Type': 'text/html' } }))
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
