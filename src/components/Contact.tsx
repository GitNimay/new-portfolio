import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("form-name", "contact");
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("message", data.message);

            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            console.log("Form submitted:", data);
            toast.success("Message sent successfully!", {
                description: "Thanks for reaching out. I'll get back to you soon.",
            });

            form.reset();
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Something went wrong.", {
                description: "Please try again later or email me directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 px-6 relative overflow-hidden" id="contact">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="max-w-4xl mx-auto">
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

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Glass Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                            data-netlify="true"
                            name="contact"
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                                        <User className="w-4 h-4 text-primary" />
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        {...form.register("name")}
                                        className={`bg-black/20 border-white/10 focus:border-primary/50 transition-all duration-300 ${form.formState.errors.name ? "border-destructive" : ""
                                            }`}
                                    />
                                    {form.formState.errors.name && (
                                        <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                                        <Mail className="w-4 h-4 text-primary" />
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        {...form.register("email")}
                                        className={`bg-black/20 border-white/10 focus:border-primary/50 transition-all duration-300 ${form.formState.errors.email ? "border-destructive" : ""
                                            }`}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                                    <MessageSquare className="w-4 h-4 text-primary" />
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell me about your project..."
                                    {...form.register("message")}
                                    className={`min-h-[150px] bg-black/20 border-white/10 focus:border-primary/50 transition-all duration-300 resize-none ${form.formState.errors.message ? "border-destructive" : ""
                                        }`}
                                />
                                {form.formState.errors.message && (
                                    <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
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
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
