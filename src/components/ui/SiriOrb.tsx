"use client";

import { cn } from "@/lib/utils";

interface SiriOrbProps {
  size?: number;
  className?: string;
  isActive?: boolean;
}

const SiriOrb: React.FC<SiriOrbProps> = ({
  size = 56,
  className,
  isActive = false,
}) => {
  const blurAmount = Math.max(size * 0.15, 8);
  const animationDuration = isActive ? 8 : 20;

  return (
    <div
      className={cn(
        "relative rounded-full cursor-pointer transition-transform duration-300 hover:scale-110",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full opacity-50 blur-xl transition-opacity duration-300"
        style={{
          background: `conic-gradient(
            from 0deg,
            hsl(var(--primary)),
            hsl(340, 80%, 60%),
            hsl(280, 70%, 55%),
            hsl(200, 75%, 55%),
            hsl(var(--primary))
          )`,
          animation: `siriOrbSpin ${animationDuration}s linear infinite`,
        }}
      />

      {/* Main orb container */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: "hsl(var(--background))",
        }}
      >
        {/* Spinning gradient layers */}
        <div
          className="absolute inset-0"
          style={{
            filter: `blur(${blurAmount}px)`,
          }}
        >
          {/* Layer 1 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "60%",
              height: "60%",
              top: "10%",
              left: "10%",
              background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
              animation: `siriOrbSpin ${animationDuration}s linear infinite`,
            }}
          />
          
          {/* Layer 2 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "50%",
              height: "50%",
              top: "30%",
              right: "10%",
              background: `radial-gradient(circle, hsl(340, 80%, 60%) 0%, transparent 70%)`,
              animation: `siriOrbSpin ${animationDuration}s linear infinite reverse`,
            }}
          />
          
          {/* Layer 3 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "55%",
              height: "55%",
              bottom: "10%",
              left: "20%",
              background: `radial-gradient(circle, hsl(280, 70%, 55%) 0%, transparent 70%)`,
              animation: `siriOrbSpin ${animationDuration * 1.5}s linear infinite`,
            }}
          />
          
          {/* Layer 4 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "45%",
              height: "45%",
              top: "20%",
              right: "25%",
              background: `radial-gradient(circle, hsl(200, 75%, 55%) 0%, transparent 70%)`,
              animation: `siriOrbSpin ${animationDuration * 0.8}s linear infinite reverse`,
            }}
          />
        </div>

        {/* Center highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: "30%",
            height: "30%",
            top: "35%",
            left: "35%",
            background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Pulse ring when active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid hsl(var(--primary))",
            animation: "siriOrbPulse 2s ease-out infinite",
          }}
        />
      )}
    </div>
  );
};

export default SiriOrb;
