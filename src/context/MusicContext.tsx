import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface Song {
    title: string;
    artist: string;
    src: string;
}

interface MusicContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    songs: Song[];
    currentSongIndex: number;
    playSong: (index: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const songs = [
        {
            title: "Timeless",
            artist: "The Weeknd",
            src: "/audio/timeless.flac",
        },
        {
            title: "Friday",
            artist: "Mufasa & Hypeman",
            src: "/audio/mufasa-friday.mp3",
        },
        {
            title: "Blue",
            artist: "Yung Kai",
            src: "/audio/Blue (Yung Kai)-(SambalpuriStar.In).mp3",
        }
    ];

    useEffect(() => {
        audioRef.current = new Audio(songs[currentSongIndex].src);

        const handleEnded = () => {
            setCurrentSongIndex((prev) => (prev + 1) % songs.length);
        };

        audioRef.current.addEventListener('ended', handleEnded);

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []); // Only run once on mount

    // Handle song changes
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.pause();
            audioRef.current.src = songs[currentSongIndex].src;
            if (wasPlaying) {
                audioRef.current.play().catch(() => { });
            }
        }
    }, [currentSongIndex]);


    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => {
                    // Silent fail
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const playSong = (index: number) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
    };

    return (
        <MusicContext.Provider value={{ isPlaying, togglePlay, songs, currentSongIndex, playSong }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error("useMusic must be used within a MusicProvider");
    }
    return context;
};
