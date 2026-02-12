import { useState, useRef, useEffect } from "react";
import balconyBg from "@/assets/balcony-bg.jpg";

interface LandingAskProps {
  onYes: () => void;
}

const LandingAsk = ({ onYes }: LandingAskProps) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMessage, setNoMessage] = useState("");
  const [hasMoved, setHasMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const noMessages = [
    "Mr. Physics says you can't click this 🧪",
    "Don't be a 38D drag, click Yes 💜",
    "Nice try, BoOoo 🐝",
    "This button has social anxiety",
    "The bee commands you to click YES 🍯",
  ];

  const moveButton = () => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - 120;
    const maxY = container.height - 50;
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
    setHasMoved(true);
    setNoMessage(noMessages[Math.floor(Math.random() * noMessages.length)]);
  };

  const handleNoClick = () => {
    moveButton();
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={balconyBg}
          alt="Dreamy balcony"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Animated Bee */}
        <div className="animate-float animate-pulse-glow text-7xl md:text-8xl select-none">
          🐝
        </div>

        {/* Heart */}
        <div className="animate-heartbeat text-5xl select-none">💜</div>

        {/* The Question */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          Will you be my{" "}
          <span className="text-gradient-honey">Valentine?</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-md">
          One click away from the sweetest adventure, HoneyBee 🍯
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-4 relative">
          <button
            onClick={onYes}
            className="px-10 py-4 text-xl font-bold font-body rounded-full bg-primary hover:bg-deep-purple-light text-primary-foreground shadow-purple transition-all duration-300 hover:scale-110 active:scale-95"
          >
            YES! 💜🐝
          </button>

          <button
            onClick={handleNoClick}
            onMouseEnter={moveButton}
            className="px-8 py-3 text-lg font-body rounded-full border border-border text-muted-foreground transition-all duration-200 hover:scale-95"
            style={{
              transform: hasMoved
                ? `translate(${noPos.x}px, ${noPos.y}px)`
                : undefined,
              transition: "transform 0.3s ease-out",
              position: hasMoved ? "absolute" : "relative",
            }}
          >
            No...
          </button>
        </div>

        {/* No message */}
        {noMessage && (
          <p className="text-secondary font-body text-sm md:text-base animate-fade-in mt-2">
            {noMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default LandingAsk;
