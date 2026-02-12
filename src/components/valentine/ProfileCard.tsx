const ProfileCard = () => {
  const stats = [
    { label: "Class", value: "Media Mage / Art Specialist", icon: "🎨" },
    { label: "Origin", value: "10th of Ramadan", icon: "🏙️" },
    { label: "Power Move", value: "Walking on benches in Physics class", icon: "⚡" },
    { label: "Weakness", value: "Being tickled in wink wink", icon: "😏" },
    { label: "Fuel", value: "Bubble Tea & Sushi", icon: "🧋🍣" },
    { label: "Lucky Stats", value: "1 & 3:14", icon: "🍀" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-2">
          Player 1 Selected
        </h2>
        <p className="text-center text-secondary font-display text-xl md:text-2xl italic mb-10">
          The HoneyBee 🐝
        </p>

        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 shadow-honey">
          {/* Character header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center text-3xl md:text-4xl shadow-purple">
              🐝
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Yasmeen Sherif
              </h3>
              <p className="text-secondary font-body text-sm">
                aka Jessy / BoOoo
              </p>
              <div className="flex gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-primary/30 text-secondary text-xs font-body">
                  LVL 99
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose/20 text-rose-light text-xs font-body">
                  LEGENDARY
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{stat.icon}</span>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-body font-semibold">
                    {stat.label}
                  </span>
                  <p className="text-foreground font-body text-sm md:text-base">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
