import { useMagicBackground } from "@/context/MagicBackgroundContext";

export const MagicThemeHandler = () => {
    const { isMagicActive } = useMagicBackground();

    if (!isMagicActive) return null;

    return (
        <style dangerouslySetInnerHTML={{
            __html: `
            :root {
                --foreground: 0 0% 100% !important;
                --muted-foreground: 0 0% 80% !important;
                --card: 0 0% 10% !important;
                --card-foreground: 0 0% 100% !important;
                --popover: 0 0% 10% !important;
                --popover-foreground: 0 0% 100% !important;
                --primary: 36 60% 45% !important;
                --muted: 0 0% 20% !important;
                --border: 0 0% 20% !important;
                --input: 0 0% 20% !important;
                --secondary: 0 0% 15% !important;
                --secondary-foreground: 0 0% 100% !important;
            }
            
            /* FORCE TRANSPARENCY ON ROOT LAYERS TO REVEAL SHADER */
            body, html, #root {
                background-color: transparent !important;
                background: transparent !important;
            }

            /* Make ALL background elements transparent to reveal shader */
            .bg-background {
                background-color: transparent !important;
                background: transparent !important;
            }

            /* Ensure the min-h-screen container is transparent */
            .min-h-screen.bg-background,
            div.bg-background {
                background-color: transparent !important;
                background: transparent !important;
            }

            /* Protect ChatBot from transparency - keep its background */
            .fixed.z-\\[60\\],
            .fixed.z-\\[60\\] .bg-background,
            .fixed.z-\\[60\\] * {
                background-color: revert !important;
                background: revert !important;
            }
            
            /* ChatBot specific protection - restore card backgrounds */
            .fixed.bottom-4.right-4 .bg-card,
            .fixed.bottom-4.right-4 .bg-background {
                background-color: hsl(var(--card)) !important;
            }

            /* Headers */
            header {
                background-color: transparent !important;
                border-bottom-color: hsl(var(--border) / 0.5) !important;
            }
            
            /* Glass Cards Global Style - ONLY apply to main content sections, PROTECT CHATBOT */
            main .bg-card:not(.fixed):not(.z-\\[60\\] *),
            section .bg-card:not(.fixed):not(.z-\\[60\\] *),
            .min-h-screen .bg-card:not(.fixed):not(.z-\\[60\\] *) {
                background-color: hsl(0 0% 10% / 0.3) !important;
                backdrop-filter: blur(12px) !important;
                border: 1px solid hsl(var(--primary) / 0.2) !important;
                position: relative;
                overflow: hidden;
            }

            /* Top shine for cards - MATCH ABOVE SELECTORS */
            main .bg-card:not(.fixed):not(.z-\\[60\\] *)::before,
            section .bg-card:not(.fixed):not(.z-\\[60\\] *)::before,
            .min-h-screen .bg-card:not(.fixed):not(.z-\\[60\\] *)::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent);
                z-index: 10;
                pointer-events: none;
            }


            /* Ensure content is above shader, BUT DON'T BREAK FIXED ELEMENTS */
            main, .min-h-screen, #root > div:not(.fixed) {
                position: relative;
                z-index: 10;
            }

            /* Specific fix for transparency on sections if they have bg colors */
            section {
                background-color: transparent !important;
            }
            .bg-secondary\\/30 {
                background-color: hsl(var(--secondary) / 0.3) !important;
            }
        `}} />
    );
};
