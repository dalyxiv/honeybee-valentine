import { useState } from "react";

const GiftReveal = () => {
  const [unwrapped, setUnwrapped] = useState(false);

  return (
    <section className="py-20 px-4">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
          A Little Something 🎁
        </h2>
        <p className="text-muted-foreground font-body mb-10">
          Click to unwrap your surprise
        </p>

        <button
          onClick={() => setUnwrapped(!unwrapped)}
          className="relative mx-auto block transition-all duration-500"
        >
          {!unwrapped ? (
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-card border-2 border-dashed border-secondary shadow-honey flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-center">
                <span className="text-6xl animate-heartbeat block">🎁</span>
                <p className="text-xs text-muted-foreground font-body mt-3">
                  Tap to unwrap
                </p>
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-card border border-secondary shadow-honey flex items-center justify-center animate-scale-in">
              <div className="text-center p-4">
                <span className="text-5xl block mb-3">💜</span>
                <p className="font-display text-lg font-semibold text-foreground">
                  For my BoOoo
                </p>
                <p className="text-xs text-muted-foreground font-body mt-2">
                  The real gift is in person 🐝
                </p>
              </div>
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default GiftReveal;
