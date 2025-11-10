import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a 
      href="#home" 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-12 h-12 group">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-md opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-300"></div>
        
        {/* Main logo container */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
          {/* Rotating gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 ${hovered ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}></div>
          
          {/* Inner circle with letter */}
          <div className="relative z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-primary/20">
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
              NK
            </span>
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full shadow-lg shadow-accent/50"></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default AnimatedLogo;
