import { systemPrompt, portfolioKnowledge } from "./portfolioKnowledge";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

// Delay helper for retry logic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Local fallback response generator when API is unavailable
function generateLocalResponse(message: string): string {
    const lowerMsg = message.toLowerCase();

    // Handle project-related questions
    if (lowerMsg.includes("project") || lowerMsg.includes("work") || lowerMsg.includes("build")) {
        const projectLinks = portfolioKnowledge.projects.map((p: any) =>
            `**${p.title}** - ${p.description}\n🔗 [View Project](${p.link})`
        ).join("\n\n");
        return `Here are Nimesh's projects:\n\n${projectLinks}`;
    }

    // Handle skills questions
    if (lowerMsg.includes("skill") || lowerMsg.includes("tech") || lowerMsg.includes("stack")) {
        const skills = portfolioKnowledge.skills;
        return `**Nimesh's Skills:**\n\n` +
            `**Programming:** ${skills.programming.join(", ")}\n` +
            `**Cloud:** ${skills.cloud.join(", ")}\n` +
            `**Containers:** ${skills.containers.join(", ")}\n` +
            `**CI/CD:** ${skills.cicd.join(", ")}\n` +
            `**Security:** ${skills.security.join(", ")}`;
    }

    // Handle experience questions
    if (lowerMsg.includes("experience") || lowerMsg.includes("work history") || lowerMsg.includes("job")) {
        const exp = portfolioKnowledge.experience[0];
        return `**Experience:**\n\n` +
            `**${exp.title}** at ${exp.company}\n` +
            `${exp.period} | ${exp.location}\n\n` +
            exp.achievements.map((a: string) => `• ${a}`).join("\n");
    }

    // Handle education questions
    if (lowerMsg.includes("education") || lowerMsg.includes("degree") || lowerMsg.includes("college")) {
        const edu = portfolioKnowledge.education[0];
        return `**Education:**\n\n` +
            `**${edu.degree}**\n` +
            `${edu.institution}, ${edu.location}\n` +
            `${edu.year}\n` +
            `${edu.grade}`;
    }

    // Handle certifications
    if (lowerMsg.includes("certification") || lowerMsg.includes("certificate")) {
        const certs = portfolioKnowledge.certifications.map((c: any) =>
            `**${c.title}** - ${c.issuer} (${c.year})`
        ).join("\n\n");
        return `**Certifications:**\n\n${certs}`;
    }

    // Handle contact questions
    if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach")) {
        return `You can contact Nimesh at:\n` +
            `📧 ${portfolioKnowledge.personal.email}\n` +
            `💼 [LinkedIn](${portfolioKnowledge.personal.links.linkedin})\n` +
            `🐙 [GitHub](${portfolioKnowledge.personal.links.github})`;
    }

    // Default response
    return "I can help you learn about Nimesh's **projects**, **skills**, **experience**, **education**, or **certifications**. What would you like to know?";
}

export async function sendChatMessage(
    messages: ChatMessage[],
    userMessage: string,
    retryCount = 0
): Promise<string> {
    const MAX_RETRIES = 3;

    // Check if API key is available
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
        return "To get dynamic AI responses, please configure your Gemini API key in the `.env` file with `VITE_GEMINI_API_KEY=your_key_here`\n\nFor now, I can provide basic information. What would you like to know about Nimesh?";
    }

    try {
        // Build conversation history for Gemini
        const contents = [
            {
                role: "user",
                parts: [{ text: systemPrompt }]
            },
            {
                role: "model",
                parts: [{ text: "Understood! I'm ready to help visitors learn about Nimesh Kulkarni. I'll keep my responses short, precise, and always include relevant links when discussing projects. How can I help you today?" }]
            },
            ...messages.map(msg => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }]
            })),
            {
                role: "user",
                parts: [{ text: userMessage }]
            }
        ];

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8000,
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                ],
            }),
        });

        // Handle rate limiting with retry
        if (response.status === 429) {
            if (retryCount < MAX_RETRIES) {
                const waitTime = Math.pow(2, retryCount) * 1000;
                console.log(`Rate limited, retrying in ${waitTime / 1000}s... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
                await delay(waitTime);
                return sendChatMessage(messages, userMessage, retryCount + 1);
            } else {
                return "I'm currently experiencing high traffic. Please try again in a few moments, or use the contact form to reach Nimesh directly.";
            }
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API error:", response.status, errorText);
            // Only fallback on critical errors
            if (response.status >= 500 || response.status === 403) {
                return generateLocalResponse(userMessage);
            }
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No response generated");
        }

        return text;
    } catch (error) {
        console.error("Chat error:", error);
        // Only fallback on network errors, throw on API errors
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes("fetch") || errorMessage.includes("network") || errorMessage.includes("ECONNREFUSED")) {
            return generateLocalResponse(userMessage);
        }
        throw error;
    }
}

// Check if user wants to contact
export function detectContactIntent(message: string): boolean {
    const contactKeywords = [
        "contact",
        "reach",
        "email",
        "message",
        "get in touch",
        "hire",
        "connect",
        "talk to",
        "speak with",
        "send message"
    ];
    const lowerMessage = message.toLowerCase();
    return contactKeywords.some(keyword => lowerMessage.includes(keyword));
}

