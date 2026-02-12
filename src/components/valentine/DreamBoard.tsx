const DreamBoard = () => {
  const team = [
    { role: "CEO", name: "Yasmeen", emoji: "👑" },
    { role: "Creative Director", name: "Daly", emoji: "🎨" },
    { role: "Intern", name: "Beelal", emoji: "👶" },
    { role: "Intern", name: "Fareeda", emoji: "👶" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
          The Future 🚀
        </h2>
        <p className="text-muted-foreground font-body mb-12">
          Dream Board: Because you're going to make it all happen
        </p>

        {/* Agency Mock */}
        <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-12 shadow-honey mb-10">
          <div className="mb-6">
            <div className="inline-block px-6 py-3 rounded-xl bg-primary/30 border border-secondary/30 mb-4">
              <span className="font-display text-2xl md:text-3xl font-bold text-gradient-honey">
                Y.S. Agency
              </span>
            </div>
            <p className="text-muted-foreground font-body text-sm italic">
              "Future CEO Office" 🏢
            </p>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mb-6">
            The Dream Team
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-4 rounded-xl bg-muted/30 border border-border hover:border-secondary/30 transition-colors"
              >
                <span className="text-3xl">{member.emoji}</span>
                <p className="font-body font-bold text-foreground text-sm mt-2">
                  {member.name}
                </p>
                <p className="text-xs text-secondary font-body">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-muted/20 border border-border">
            <p className="text-sm font-body text-muted-foreground">
              🎯 <strong className="text-foreground">Company Goal:</strong>{" "}
              Stop being lazy & Make Emy's project stable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamBoard;
