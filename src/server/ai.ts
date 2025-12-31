import { GoogleGenerativeAI } from "@google/generative-ai";
import { type Elysia } from "elysia";

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-pro" }) : null;

// Context Cache
let siteContext: string = "";

// Function to load and format context from JSON files
export async function loadSiteContext() {
    try {
        const about = await Bun.file("public/data/about.json").text();
        const home = await Bun.file("public/data/home.json").text();

        // We can also load project/blog indices if needed, 
        // but let's start with core Identity (About) and Landing (Home) info.

        siteContext = `
        You are an AI assistant for Hamza's Portfolio Website.
        Your goal is to answer visitor questions based ONLY on the provided context.
        Be helpful, professional, and concise. Adopt a tone that matches the site's "Perfect Gray" and "Minimalist" aesthetic.

        Here is the data about Hamza and the site:
        
        --- ABOUT HAMZA ---
        ${about}
        
        --- HOME PAGE INFO ---
        ${home}
        
        If the user asks something not in the context, politely say you only know about Hamza's professional portfolio.
        `;
        console.log("✅ AI Context Loaded");
    } catch (error) {
        console.error("❌ Failed to load AI Context:", error);
    }
}

// Chat Handler
export async function handleChaRequest(body: { message: string }) {
    if (!model) {
        return {
            role: "model",
            text: "AI System is currently offline (Missing API Key). Please configure the backend."
        };
    }

    try {
        // Create a chat session (stateless for now, or pass history from frontend)
        // For simplicity, we'll just generate content with the system instruction prefixed.
        // Google GenAI supports "systemInstruction" in newer models, 
        // but prepending context to the prompt is a robust fallback.

        const prompt = `${siteContext}\n\nUser: ${body.message}\nAssistant:`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return { role: "model", text };
    } catch (error) {
        console.error("AI Error:", error);
        return { role: "model", text: "I encountered an error processing your request." };
    }
}
