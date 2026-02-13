import { useState } from "react";
import logo1 from "@/assets/Honeybee_1.png";
import logo2 from "@/assets/Honeybee_2.png";
import logo3 from "@/assets/Honeybee_3.png";
import logo4 from "@/assets/Honeybee_4.png";

const logos = [
  { id: 1, src: logo1, label: "Option 1" },
  { id: 2, src: logo2, label: "Option 2" },
  { id: 3, src: logo3, label: "Option 3" },
  { id: 4, src: logo4, label: "Option 4" },
];

const BrandIdentityGift = () => {
  const [favourite, setFavourite] = useState<number | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
          Your Brand Identity Gift 🎨
        </h2>
        <p className="text-muted-foreground font-body mb-4">
          Logo Design — Pick your favourite
        </p>
        <p className="text-xs text-muted-foreground font-body mb-12">
          Tap on a logo to mark it as your favourite
        </p>

        <div className="grid grid-cols-2 gap-6">
          {logos.map((logo) => {
            const isFav = favourite === logo.id;
            return (
              <button
                key={logo.id}
                onClick={() => setFavourite(isFav ? null : logo.id)}
                className={`relative group p-4 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isFav
                    ? "border-secondary bg-secondary/10 shadow-honey"
                    : "border-border bg-gradient-card hover:border-secondary/50 hover:shadow-honey"
                }`}
              >
                <img
                  src={logo.src}
                  alt={`HoneyBee Logo ${logo.label}`}
                  className="w-full aspect-square rounded-xl object-cover"
                />
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm font-body text-foreground font-semibold">
                    {logo.label}
                  </span>
                  {isFav && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-body font-bold">
                      FAVOURITE 💜
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandIdentityGift;
