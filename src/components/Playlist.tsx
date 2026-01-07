import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Play, Pause, ChevronDown } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { cn } from "@/lib/utils";

const Playlist = () => {
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
    const { isPlaying, togglePlay, songs, currentSongIndex, playSong } = useMusic();

    return (
        <div className="relative h-8 md:h-[52px] flex items-center">
            <AnimatePresence>
                {isPlaylistOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full mt-4 right-0 w-72 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-4 overflow-hidden z-50"
                    >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/50">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                                <Music2 className="w-4 h-4 text-primary" />
                                Playlist
                            </h3>
                        </div>

                        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-hide">
                            {songs.map((song, index) => (
                                <button
                                    key={index}
                                    onClick={() => playSong(index)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200",
                                        currentSongIndex === index
                                            ? "bg-primary/20 text-primary shadow-sm"
                                            : "hover:bg-muted/50 text-muted-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden transition-colors",
                                        currentSongIndex === index ? "bg-background/50" : "bg-muted"
                                    )}>
                                        {currentSongIndex === index && isPlaying ? (
                                            <div className="flex items-end gap-0.5 h-4 pb-1">
                                                {[...Array(4)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-1 bg-primary rounded-full"
                                                        animate={{ height: [4, 16, 4] }}
                                                        transition={{
                                                            duration: 0.6,
                                                            repeat: Infinity,
                                                            repeatType: "reverse",
                                                            delay: i * 0.15 + Math.random() * 0.2
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <Music2 className="w-5 h-5 opacity-50" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate text-foreground">{song.title}</p>
                                        <p className="text-xs opacity-70 truncate text-muted-foreground">{song.artist}</p>
                                    </div>
                                    {currentSongIndex === index && (
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
                className={cn(
                    "h-8 md:h-full flex items-center gap-0.5 md:gap-1 pl-1.5 md:pl-2 pr-2 md:pr-4 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-2xl transition-all duration-300 hover:brightness-110",
                    isPlaylistOpen ? "bg-primary text-primary-foreground border-primary" : "hover:bg-background/90"
                )}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                    }}
                    className={cn(
                        "p-1 md:p-2 rounded-full hover:bg-black/10 transition-colors",
                        isPlaylistOpen ? "hover:bg-white/20" : "hover:bg-primary/10"
                    )}
                >
                    {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current text-foreground" /> : <Play className="w-4 h-4 md:w-5 md:h-5 fill-current text-foreground" />}
                </button>

                <button
                    onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                    className="flex items-center gap-1 md:gap-2 h-full pl-0.5 md:pl-1"
                >
                    <div className="flex flex-col items-start leading-none min-w-[60px] max-w-[100px] hidden sm:flex">
                        <span className={cn("text-xs font-bold truncate w-full text-left", isPlaylistOpen ? "text-primary-foreground" : "text-muted-foreground")}>
                            {songs[currentSongIndex]?.title || "Select Song"}
                        </span>
                    </div>
                    <ChevronDown className={cn("w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 opacity-70", isPlaylistOpen && "rotate-180 text-primary-foreground", !isPlaylistOpen && "text-muted-foreground")} />
                </button>
            </motion.div>
        </div>
    );
};

export default Playlist;
