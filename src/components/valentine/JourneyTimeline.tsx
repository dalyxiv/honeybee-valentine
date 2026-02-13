const milestones = [
  { date: "September 13, 2023", title: "Instagram Connection", desc: "Where it all started for us online.", emoji: "📱" },
  { date: "October 20, 2023", title: "Our First Date", desc: "The beginning of something beautiful.", emoji: "💐" },
  { date: "December 31, 2023", title: "1st Kiss", desc: "A special New Year's Eve moment that moved us closer.", emoji: "💋" },
  { date: "January 1, 2024", title: "Walked into LOVE ♥", desc: "Starting the new year by officially falling for each other.", emoji: "❤️" },
  { date: "January 7, 2024", title: "The Three Words", desc: 'The day I first told you "I love you."', emoji: "💜" },
  { date: "February 14, 2024", title: "Making it Official", desc: "The Valentine's Day I asked you to officially be my girlfriend.", emoji: "💍" },
  { date: "September 30, 2024", title: "Distance Begins", desc: "The start of our long-distance chapter.", emoji: "✈️" },
  { date: "March 14, 2025", title: "The Question", desc: "The day I first asked you to marry me.", emoji: "💎" },
  { date: "December 31, 2025", title: "The Proposal in Morocco", desc: "When I officially proposed with the ring in Casablanca.", emoji: "🇲🇦" },
];

const places = [
  { name: "Cairo", emoji: "🏙️" },
  { name: "Giza", emoji: "🗿" },
  { name: "AlSharqia", emoji: "🌾" },
  { name: "Hurghada", emoji: "🏖️" },
  { name: "Casablanca", emoji: "🕌" },
  { name: "Rabat", emoji: "🇲🇦" },
];

const JourneyTimeline = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-2">
          Our Journey & Milestones 💫
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12">
          Every moment that brought us closer
        </p>

        {/* Timeline */}
        <div className="relative pl-8 border-l-2 border-secondary space-y-8 mb-16">
          {milestones.map((m, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-secondary shadow-honey group-hover:scale-125 transition-transform" />
              <div className="bg-gradient-card rounded-2xl border border-border p-5 hover:border-secondary/40 hover:shadow-honey transition-all duration-300">
                <p className="text-xs uppercase tracking-widest text-secondary font-body font-semibold">
                  {m.date}
                </p>
                <h4 className="font-display text-lg font-semibold text-foreground mt-1">
                  {m.emoji} {m.title}
                </h4>
                <p className="text-sm text-muted-foreground font-body mt-1">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Places */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
          Places We've Explored Together 🌍
        </h3>
        <p className="text-center text-muted-foreground font-body mb-8">
          Our adventures on the map
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {places.map((place) => (
            <div
              key={place.name}
              className="bg-gradient-card rounded-2xl border border-border p-5 text-center hover:border-secondary/40 hover:shadow-honey transition-all duration-300"
            >
              <span className="text-3xl">{place.emoji}</span>
              <p className="font-display text-lg font-semibold text-foreground mt-2">
                {place.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
