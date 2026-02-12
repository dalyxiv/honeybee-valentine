import { useState } from "react";

interface Ticket {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

const tickets: Ticket[] = [
  {
    id: 1,
    title: "Walk in Maadi with no purpose",
    description: "Just vibes. No destination. Pure chaos.",
    emoji: "🚶‍♀️",
  },
  {
    id: 2,
    title: "Bowling 1v1",
    description: "Prepare to lose. (I'm being generous with the warning.)",
    emoji: "🎳",
  },
  {
    id: 3,
    title: "Fake Names Dinner",
    description:
      "We go to a far restaurant. I am Giovanni and you are Anastasia. No breaking character.",
    emoji: "🎭",
  },
  {
    id: 4,
    title: "The Lame Tourist Day",
    description:
      "Pyramids & Khan el-Khalili acting like confused foreigners. 'Wow, what is this ancient building?!'",
    emoji: "🗿",
  },
];

const BucketListTickets = () => {
  const [redeemed, setRedeemed] = useState<Set<number>>(new Set());

  const toggleRedeem = (id: number) => {
    setRedeemed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-2">
          Bucket List Ticket Booth 🎟️
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12">
          Click to redeem your adventure tickets
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {tickets.map((ticket) => {
            const isRedeemed = redeemed.has(ticket.id);
            return (
              <button
                key={ticket.id}
                onClick={() => toggleRedeem(ticket.id)}
                className={`relative group text-left p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isRedeemed
                    ? "border-secondary bg-secondary/10 shadow-honey"
                    : "border-border bg-gradient-card hover:border-secondary/50 hover:shadow-honey"
                }`}
              >
                {/* Ticket punch holes */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-background" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-background" />

                <div className="flex items-start gap-3">
                  <span className="text-3xl">{ticket.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                        Admit One
                      </span>
                      {isRedeemed && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-body font-bold">
                          REDEEMED ✓
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg font-semibold text-foreground mt-1">
                      {ticket.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-body mt-2">
                      {ticket.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BucketListTickets;
