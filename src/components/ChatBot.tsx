import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { X, Send, Loader2, MessageSquare, User, Mail } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendChatMessage, detectContactIntent, ChatMessage } from "@/lib/geminiChat";

const presetQuestions = [
    { label: "Projects", query: "Tell me about your projects with links" },
    { label: "Skills", query: "What are your technical skills?" },
    { label: "Experience", query: "Tell me about your work experience" },
    { label: "Contact", query: "I want to contact you" },
];

// Welcome messages that rotate for first-time visitors
const welcomeMessages = [
    "Need help exploring?",
    "Ask me anything!",
    "Let's chat!",
    "Discover my work",
    "Questions? I'm here!",
    "Curious about me?",
];

const ChatBot = () => {
    const { theme } = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const [isSubmittingContact, setIsSubmittingContact] = useState(false);

    // Welcome bubble state
    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [welcomeDismissed, setWelcomeDismissed] = useState(false);


    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && !showContactForm) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, showContactForm]);

    // Add initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                role: "assistant",
                content: "Hi! 👋 I'm Nimesh's AI assistant powered by **Gemini 2.5 Flash**. I can answer questions about his **projects**, **skills**, and **experience**, or help you with **real-time general queries**. What would you like to know?"
            }]);
        }
    }, [isOpen, messages.length]);

    // Welcome bubble - show after delay and rotate messages
    useEffect(() => {
        if (isOpen || welcomeDismissed) {
            setShowWelcome(false);
            return;
        }

        // Show welcome bubble after 2 seconds
        const showTimer = setTimeout(() => {
            setWelcomeMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);
            setShowWelcome(true);
        }, 2000);

        return () => clearTimeout(showTimer);
    }, [isOpen, welcomeDismissed]);

    // Rotate welcome messages every 4 seconds
    useEffect(() => {
        if (!showWelcome || isOpen) return;

        const rotateTimer = setInterval(() => {
            setWelcomeMessage(prev => {
                const currentIndex = welcomeMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % welcomeMessages.length;
                return welcomeMessages[nextIndex];
            });
        }, 4000);

        return () => clearInterval(rotateTimer);
    }, [showWelcome, isOpen]);

    const handleSendMessage = async (messageText?: string) => {
        const text = messageText || inputValue.trim();
        if (!text || isLoading) return;

        // Check for contact intent
        if (detectContactIntent(text)) {
            setMessages(prev => [
                ...prev,
                { role: "user", content: text },
                { role: "assistant", content: "I'd be happy to help you reach Nimesh! Please fill out the form below with your details, and he'll get back to you soon. 📬" }
            ]);
            setInputValue("");
            setShowContactForm(true);
            return;
        }

        setInputValue("");
        setMessages(prev => [...prev, { role: "user", content: text }]);
        setIsLoading(true);

        try {
            const response = await sendChatMessage(messages, text);
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `Sorry, I encountered an error: ${errorMessage}. Please try again!`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!contactForm.name || !contactForm.email || !contactForm.message) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmittingContact(true);

        try {
            const response = await fetch("https://formspree.io/f/xqarljdd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: contactForm.name,
                    email: contactForm.email,
                    message: `[Via Chatbot] ${contactForm.message}`,
                }),
            });

            if (!response.ok) throw new Error("Failed to send");

            toast.success("Message sent! Nimesh will get back to you soon.");
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `Thanks ${contactForm.name}! Your message has been sent. Nimesh will reach out to you at ${contactForm.email} soon. Is there anything else I can help you with?`
            }]);
            setContactForm({ name: "", email: "", message: "" });
            setShowContactForm(false);
        } catch {
            toast.error("Failed to send message. Please try the contact form on the website.");
        } finally {
            setIsSubmittingContact(false);
        }
    };

    // Simple markdown-like rendering for links
    const renderMessage = (content: string) => {
        // Convert markdown links [text](url) to clickable links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = content.split(linkRegex);

        const elements: React.ReactNode[] = [];
        for (let i = 0; i < parts.length; i += 3) {
            if (parts[i]) {
                // Replace **text** with bold
                const boldParts = parts[i].split(/\*\*([^*]+)\*\*/g);
                boldParts.forEach((part, j) => {
                    if (j % 2 === 1) {
                        elements.push(<strong key={`bold-${i}-${j}`}>{part}</strong>);
                    } else {
                        elements.push(part);
                    }
                });
            }
            if (parts[i + 1] && parts[i + 2]) {
                elements.push(
                    <a
                        key={`link-${i}`}
                        href={parts[i + 2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                    >
                        {parts[i + 1]}
                    </a>
                );
            }
        }
        return elements.length > 0 ? elements : content;
    };

    return (
        <>
            {/* Welcome Message Bubble */}
            {showWelcome && !isOpen && (
                <div
                    className={`fixed bottom-20 right-4 md:bottom-20 md:right-6 z-50 transition-all duration-300 ${showWelcome ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                >
                    <div
                        onClick={() => {
                            setWelcomeDismissed(true);
                            setIsOpen(true);
                        }}
                        className="relative px-4 py-2.5 rounded-2xl cursor-pointer backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] bg-card/95 dark:bg-card/95 border-primary/20 dark:border-primary/20 text-foreground shadow-lg shadow-black/10 dark:shadow-black/30"
                    >
                        <div className="text-sm font-medium whitespace-nowrap min-w-[120px] text-center">
                            <AnimatePresence mode="wait">
                                <TextEffect
                                    key={welcomeMessage}
                                    per="char"
                                    preset="blur"
                                >
                                    {welcomeMessage}
                                </TextEffect>
                            </AnimatePresence>
                        </div>

                        {/* Speech bubble tail pointing to button */}
                        <div
                            className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-card/95 dark:border-t-card/95"
                        />
                        {/* Tail border overlay */}
                        <div
                            className="absolute -bottom-[9px] right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary/20 dark:border-t-primary/20"
                            style={{ zIndex: -1 }}
                        />

                        {/* Dismiss button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setWelcomeDismissed(true);
                            }}
                            className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                            aria-label="Dismiss"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Chat Button - Elegant & Theme-matched */}
            <button
                onClick={() => {
                    setIsOpen(true);
                    setWelcomeDismissed(true);
                }}
                className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group transition-all duration-300 ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                    }`}
                aria-label="Open chat assistant"
            >
                <div
                    className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-105 bg-card border border-primary/30 shadow-lg shadow-primary/10 group-hover:border-primary/50 group-hover:shadow-primary/20"
                >
                    {/* Chat Icon */}
                    <MessageSquare
                        className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                    />

                    {/* Subtle online indicator */}
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 bg-primary/80 border-card" />
                </div>
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-4 right-4 md:bottom-24 md:right-6 z-50 w-[90vw] md:w-[380px] max-w-[450px] transition-all duration-300 ${isOpen
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 translate-y-4 pointer-events-none"
                    }`}
            >
                <div
                    className="rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-2xl bg-background/60 dark:bg-background/60 border-primary/10 shadow-black/10 dark:shadow-black/20"
                    style={{ maxHeight: "calc(100vh - 100px)" }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 border-b backdrop-blur-sm border-border bg-muted/30 dark:bg-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-card border-primary/30">
                                <MessageSquare className="w-4 h-4 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">
                                    AI Assistant
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Ask me about Nimesh
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-full transition-colors hover:bg-muted/50"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 px-4 py-3 border-b overflow-x-auto border-border">
                        {presetQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSendMessage(q.query)}
                                disabled={isLoading}
                                className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border border-primary/20 dark:border-primary/20 text-foreground/80 hover:bg-primary/10 hover:border-primary/40"
                            >
                                {q.label}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div
                        className="overflow-y-auto px-4 py-4 space-y-4"
                        style={{ height: "300px" }}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${msg.role === "user"
                                        ? "bg-primary/90 text-primary-foreground"
                                        : "bg-muted/50 text-foreground font-medium dark:bg-white/10"
                                        }`}
                                >
                                    {renderMessage(msg.content)}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className={`px-4 py-3 rounded-2xl backdrop-blur-sm bg-muted/50 dark:bg-white/10`}>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Contact Form */}
                    {showContactForm && (
                        <div className="px-4 py-4 border-t border-border">
                            <form onSubmit={handleContactSubmit} className="space-y-3">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Your name"
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type="email"
                                                placeholder="Your email"
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Textarea
                                        placeholder="Your message"
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))}
                                        className="pl-9 min-h-[60px] resize-none"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowContactForm(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        disabled={isSubmittingContact}
                                        className="flex-1"
                                    >
                                        {isSubmittingContact ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>Send <Send className="w-3 h-3 ml-1" /></>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Input */}
                    {!showContactForm && (
                        <div className="px-4 py-3 border-t backdrop-blur-md border-border bg-muted/30 dark:bg-white/5">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className="flex-1"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatBot;
