const FooterLetter = () => {
  return (
    <footer className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-12 shadow-purple">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-8 text-gradient-honey">
            A Letter For You 💌
          </h2>

          <div className="space-y-4 font-body text-foreground/90 leading-relaxed text-sm md:text-base">
            <p>Dear HoneyBee,</p>
            <p>
              To the girl who wants to fly, touch the clouds, and owns the best
              balcony vibes. The one who walks on physics benches like they're
              runways and turns every room into her own little universe.
            </p>
            <p>
              I promise to always listen — even when you hate celebrating your
              birthday. I promise to be Giovanni at that far restaurant, to lose
              at bowling (gracefully), and to be the most confused tourist at the
              Pyramids with you.
            </p>
            <p>
              You're going to build that agency. You're going to be that CEO.
              And I'll be right there, your Creative Director, your biggest fan,
              your person.
            </p>
            <p>Happy Valentine's Day, HoneyBee. 🐝💜</p>
          </div>

          <div className="mt-8 text-right">
            <p className="font-display text-xl md:text-2xl italic text-secondary">
              Love, Daly 💛
            </p>
          </div>
        </div>

        {/* Kiwi Warning */}
        <p className="text-center text-xs text-muted-foreground font-body mt-8 opacity-60">
          ⚠️ Warning: This site contains 0% Kiwi, Mushrooms and Strawberries. Certified safe for
          consumption. 🥝🍄🍓🚫
        </p>
      </div>
    </footer>
  );
};

export default FooterLetter;
