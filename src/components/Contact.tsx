import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMagicBackground } from "@/context/MagicBackgroundContext";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { sendAutoReplyEmail } from "@/services/brevo";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;



const Contact = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isMagicActive } = useMagicBackground();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxRKgEGacAykPQt81OLsi1GBZLosroAXk1F_U2jTZgYp78vu9lbGbG46BebBLGNLSVl5A/exec";



    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            // Prepare all submissions
            const formspreeRequest = fetch("https://formspree.io/f/xqarljdd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });

            const googleSheetsRequest = fetch(GOOGLE_SHEETS_WEB_APP_URL, {
                method: "POST",
                mode: "no-cors", // Important for Google Apps Script Web App
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Send auto-reply email via Brevo
            const emailRequest = sendAutoReplyEmail(data.email, data.name);

            // Execute all requests without one blocking the others
            const [formspreeResponse] = await Promise.all([
                formspreeRequest,
                googleSheetsRequest,
                emailRequest
            ]);

            if (!formspreeResponse.ok) {
                throw new Error("Network response was not ok");
            }

            toast.success("Message sent successfully!", {
                description: "Thanks for reaching out. I'll get back to you soon.",
            });

            form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Something went wrong.", {
                description: "Please try again later or email me directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden" id="contact">

            <div className={`max-w-4xl mx-auto transition-all duration-500 ${isMagicActive ? "bg-card/30 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl" : ""}`}>
                <div
                    ref={ref}
                    className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Have a project in mind or just want to say hi? I'd love to hear from you.
                        </p>
                    </div>

                    <div className={`rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 ${isMagicActive ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-card/30 backdrop-blur-lg border border-border"}`}>
                        {/* Glass Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                                                    <User className="w-4 h-4 text-primary" />
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="bg-secondary/50 border-input focus:border-primary/50 transition-all duration-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="john@example.com"
                                                        {...field}
                                                        className="bg-secondary/50 border-input focus:border-primary/50 transition-all duration-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                                                <MessageSquare className="w-4 h-4 text-primary" />
                                                Message
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell me about your project..."
                                                    {...field}
                                                    className="min-h-[150px] bg-secondary/50 border-input focus:border-primary/50 transition-all duration-300 resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <RainbowButton
                                    type="submit"
                                    className="w-full md:w-auto min-w-[200px] transition-all duration-300 hover:scale-105"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </RainbowButton>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
