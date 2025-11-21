import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/audio/timeless.flac");
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((error) => {
                    console.error("Audio playback failed:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-background/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg">
            <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                onClick={togglePlay}
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>

            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground/90 whitespace-nowrap">
                        Timeless
                    </span>
                    <span className="text-[10px] text-muted-foreground">The Weeknd</span>
                </div>

                {/* Visualizer */}
                <div className="flex items-end gap-0.5 h-3 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-primary rounded-full"
                            animate={{
                                height: isPlaying ? [4, 12, 4] : 4,
                                opacity: isPlaying ? 1 : 0.5,
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.1,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
