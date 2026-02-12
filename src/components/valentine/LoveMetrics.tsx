import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const brainData = [
  { name: "Designing / Marketing", value: 50, emoji: "🎨" },
  { name: "How to fly & touch clouds", value: 30, emoji: "☁️" },
  { name: "Daly (Me)", value: 10, emoji: "💜" },
  { name: "Secretly wanting Chicken & Shrimp", value: 10, emoji: "🍗🦐" },
];

const COLORS = [
  "hsl(296, 65%, 35%)",
  "hsl(43, 96%, 56%)",
  "hsl(340, 80%, 60%)",
  "hsl(280, 40%, 50%)",
];

const LoveMetrics = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-2">
          Love Metrics 📊
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12">
          Data-driven relationship insights
        </p>

        {/* Pie Chart */}
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 shadow-honey mb-10">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-center mb-6">
            What Occupies Yasmeen's Brain 🧠
          </h3>
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brainData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={50}
                  dataKey="value"
                  stroke="none"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {brainData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(290, 35%, 12%)",
                    border: "1px solid hsl(290, 20%, 25%)",
                    borderRadius: "8px",
                    color: "hsl(40, 20%, 95%)",
                    fontFamily: "Quicksand",
                  }}
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    brainData.find((d) => d.name === name)?.emoji + " " + name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {brainData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[i] }}
                />
                <span className="text-xs md:text-sm text-foreground font-body">
                  {item.emoji} {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 shadow-honey">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-center mb-6">
            The Era of Us 💫
          </h3>
          <div className="relative pl-8 border-l-2 border-secondary space-y-6">
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-secondary shadow-honey" />
              <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">
                The Beginning
              </p>
              <p className="text-foreground font-body font-semibold">
                Two chaotic souls collide 💥
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-rose shadow-honey" />
              <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">
                Current Status
              </p>
              <p className="text-foreground font-body font-semibold">
                Dating ME 💜 (Lucky you)
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary animate-pulse-glow" />
              <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">
                The Future
              </p>
              <p className="text-foreground font-body font-semibold">
                World domination together 🌍👑
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveMetrics;
