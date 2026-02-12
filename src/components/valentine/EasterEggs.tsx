import { useEffect, useState } from "react";

const EasterEggs = () => {
  const [showWhale, setShowWhale] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newBuffer = (buffer + e.key).slice(-3);
      setBuffer(newBuffer);
      if (newBuffer === "314") {
        setShowWhale(true);
        setBuffer("");
        setTimeout(() => setShowWhale(false), 9000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buffer]);

  if (!showWhale) return null;

  return (
    <div className="fixed top-1/2 left-0 z-50 pointer-events-none -translate-y-1/2">
      <div className="animate-swim text-6xl md:text-8xl">
        🐋
      </div>
    </div>
  );
};

export default EasterEggs;
