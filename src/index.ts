import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { loadSiteContext, handleChaRequest } from './server/ai';

// Load Context on Startup
loadSiteContext();

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
