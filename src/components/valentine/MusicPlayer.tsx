import { useState } from "react";

const tracks = [
  { name: "Fairytale", emoji: "🧚" },
  { name: "Soul (Disney)", emoji: "✨" },
  { name: "Tamasha", emoji: "🎬" },
  { name: "Beggin'", emoji: "🎸" },
];

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen && (
        <div className="mb-3 bg-card border border-border rounded-xl p-4 shadow-purple w-56 animate-scale-in">
          <p className="text-xs text-muted-foreground font-body mb-3 uppercase tracking-wider">
            Now Playing
          </p>
          <div className="space-y-2">
            {tracks.map((track, i) => (
              <button
                key={track.name}
                onClick={() => setCurrentTrack(i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                  currentTrack === i
                    ? "bg-primary/30 text-secondary"
                    : "hover:bg-muted/50 text-foreground"
                }`}
              >
                {track.emoji} {track.name}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground font-body mt-3 italic">
            🎵 Playing in your heart
          </p>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-primary shadow-purple flex items-center justify-center text-xl hover:scale-110 transition-transform"
      >
        🎵
      </button>
    </div>
  );
};

export default MusicPlayer;
