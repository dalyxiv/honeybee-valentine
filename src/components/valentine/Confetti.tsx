import { useState, useCallback, useEffect } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  type: "bunny" | "whale" | "heart";
  size: number;
}

const shapes = {
  bunny: "🐰",
  whale: "🐋",
  heart: "💜",
};

const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const generatePieces = useCallback(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 60; i++) {
      const types: ("bunny" | "whale" | "heart")[] = ["bunny", "whale", "heart"];
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        type: types[Math.floor(Math.random() * types.length)],
        size: 16 + Math.random() * 24,
      });
    }
    setPieces(newPieces);
  }, []);

  useEffect(() => {
    if (active) generatePieces();
  }, [active, generatePieces]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: "-5%",
            fontSize: `${piece.size}px`,
            animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        >
          {shapes[piece.type]}
        </span>
      ))}
    </div>
  );
};

export default Confetti;
