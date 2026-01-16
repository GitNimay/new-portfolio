/**
 * Gemini Chat Service
 * Real-time AI chatbot powered by Gemini 2.5 Flash
 * API Key is loaded from environment variable: VITE_GEMINI_API_KEY
 */

import { systemPrompt } from "./portfolioKnowledge";

// ============================================================
// Configuration - Loaded from .env file
// ============================================================
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// ============================================================
// Types
// ============================================================
export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface GeminiPart {
    text: string;
}

interface GeminiContent {
    role: "user" | "model";
    parts: GeminiPart[];
}

interface GeminiResponse {
    candidates?: Array<{
        content?: {
            parts?: GeminiPart[];
        };
    }>;
    error?: {
        message: string;
        code: number;
    };
}

// ============================================================
// Utility Functions
// ============================================================
const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

const isApiKeyValid = (): boolean => Boolean(API_KEY);

const buildApiUrl = (): string =>
    `${API_BASE}/${MODEL}:generateContent?key=${API_KEY}`;

// ============================================================
// Message Conversion
// ============================================================
const convertToGeminiFormat = (messages: ChatMessage[]): GeminiContent[] =>
    messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
    }));

// ============================================================
// Request Configuration
// ============================================================
const createRequestBody = (messages: ChatMessage[], userMessage: string) => ({
    system_instruction: {
        parts: [{ text: systemPrompt }]
    },
    contents: [
        ...convertToGeminiFormat(messages),
        { role: "user", parts: [{ text: userMessage }] }
    ],
    tools: [{
        google_search: {}
    }],
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500
    },
    safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
    ]
});

// ============================================================
// API Call with Retry Logic
// ============================================================
const MAX_RETRIES = 3;

async function callGeminiApi(
    messages: ChatMessage[],
    userMessage: string,
    attempt: number = 0
): Promise<string> {
    const response = await fetch(buildApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createRequestBody(messages, userMessage))
    });

    // Handle rate limiting with exponential backoff
    if (response.status === 429 && attempt < MAX_RETRIES) {
        const backoffTime = Math.pow(2, attempt) * 1000;
        console.warn(`[Gemini] Rate limited. Retrying in ${backoffTime}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
        await delay(backoffTime);
        return callGeminiApi(messages, userMessage, attempt + 1);
    }

    if (!response.ok) {
        const errorData = await response.text();
        console.error(`[Gemini] API Error ${response.status}:`, errorData);
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    // Check for API-level errors
    if (data.error) {
        throw new Error(data.error.message);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        throw new Error("Empty response from Gemini");
    }

    return text;
}

// ============================================================
// Main Export: Send Chat Message
// ============================================================
export async function sendChatMessage(
    messages: ChatMessage[],
    userMessage: string
): Promise<string> {
    // Validate API key
    if (!isApiKeyValid()) {
        console.error("[Gemini] Invalid or missing API key");
        return "⚠️ AI service is not configured. Please set `VITE_GEMINI_API_KEY` in your `.env` file.";
    }

    try {
        return await callGeminiApi(messages, userMessage);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[Gemini] Chat error:", errorMessage);

        // Return user-friendly error
        if (errorMessage.includes("429") || errorMessage.includes("quota")) {
            return "🚫 I'm experiencing high demand. Please try again in a moment.";
        }
        if (errorMessage.includes("403") || errorMessage.includes("API key")) {
            return "🔑 API key issue. Please check your Gemini API key configuration.";
        }
        if (errorMessage.includes("fetch") || errorMessage.includes("network")) {
            return "🌐 Network error. Please check your internet connection.";
        }

        return "❌ Something went wrong. Please try again.";
    }
}

// ============================================================
// Contact Intent Detection
// ============================================================
const CONTACT_KEYWORDS = [
    "contact", "reach", "email", "message", "get in touch",
    "hire", "connect", "talk to", "speak with", "send message"
] as const;

export function detectContactIntent(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return CONTACT_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}
