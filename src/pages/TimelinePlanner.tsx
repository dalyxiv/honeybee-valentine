import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, FileText, Trash2, Heart, CalendarHeart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// ── Types ──────────────────────────────────────────────
interface MilestoneTile {
  id: string;
  label: string;
  color: string;
  fixed?: boolean;
}

interface SavedPlan {
  name: string;
  board: Record<string, string[]>; // monthKey → tile ids
  bank: string[];
  customTiles: MilestoneTile[];
}

// ── Helpers ────────────────────────────────────────────
const COLORS = [
  "bg-pink-200 border-pink-400 text-pink-900",
  "bg-purple-200 border-purple-400 text-purple-900",
  "bg-amber-200 border-amber-400 text-amber-900",
  "bg-teal-200 border-teal-400 text-teal-900",
  "bg-rose-200 border-rose-400 text-rose-900",
  "bg-indigo-200 border-indigo-400 text-indigo-900",
];

function generateMonths() {
  const months: { key: string; label: string }[] = [];
  for (let y = 2026; y <= 2028; y++) {
    const startM = y === 2026 ? 3 : 0; // April 2026 = index 3
    for (let m = startM; m < 12; m++) {
      const d = new Date(y, m);
      const key = `${y}-${String(m + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("en-US", { month: "long", year: "numeric" });
      months.push({ key, label });
    }
  }
  return months;
}

const ALL_MONTHS = generateMonths();

const FIXED_EVENTS: Record<string, MilestoneTile> = {
  "2026-08": { id: "fixed-daly-grad", label: "DALY GRADUATION 🎓", color: "bg-yellow-200 border-yellow-500 text-yellow-900", fixed: true },
  "2027-07": { id: "fixed-omar-army", label: "OMAR ARMY END 🎖️", color: "bg-green-200 border-green-500 text-green-900", fixed: true },
};

const DEFAULT_TILES: MilestoneTile[] = [
  { id: "tile-engagement", label: "Engagement 💍", color: COLORS[0] },
  { id: "tile-marriage", label: "Marriage 💒", color: COLORS[1] },
  { id: "tile-living", label: "Living Together 🏡", color: COLORS[2] },
  { id: "tile-abroad", label: "Working Abroad ✈️", color: COLORS[3] },
];

// ── Draggable Tile ─────────────────────────────────────
function DraggableTile({ tile, overlay }: { tile: MilestoneTile; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: tile.id,
    disabled: tile.fixed,
  });

  const style = overlay
    ? {}
    : {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.3 : 1,
      };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      {...(overlay ? {} : { ...listeners, ...attributes })}
      style={style}
      className={`px-3 py-2 rounded-xl border-2 text-sm font-semibold shadow-sm select-none
        ${tile.fixed ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
        ${tile.color} transition-shadow hover:shadow-md whitespace-nowrap`}
    >
      {tile.label}
    </div>
  );
}

// ── Droppable Month ────────────────────────────────────
function DroppableMonth({
  monthKey,
  label,
  tiles,
  onRemove,
}: {
  monthKey: string;
  label: string;
  tiles: MilestoneTile[];
  onRemove: (tileId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: monthKey });
  const fixed = FIXED_EVENTS[monthKey];

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[90px] rounded-2xl border-2 border-dashed p-3 transition-colors
        ${isOver ? "border-primary bg-primary/5" : "border-muted-foreground/20 bg-card/50"}`}
    >
      <p className="text-xs font-bold text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {fixed && <DraggableTile tile={fixed} />}
        {tiles.map((t) => (
          <div key={t.id} className="relative group">
            <DraggableTile tile={t} />
            <button
              onClick={() => onRemove(t.id)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground
                flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
export default function TimelinePlanner() {
  const { toast } = useToast();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // All tiles (default + custom)
  const [allTiles, setAllTiles] = useState<MilestoneTile[]>(DEFAULT_TILES);
  // Which tiles are in the bank (by id)
  const [bankIds, setBankIds] = useState<string[]>(DEFAULT_TILES.map((t) => t.id));
  // Board state: monthKey → tile ids
  const [board, setBoard] = useState<Record<string, string[]>>({});
  // Drag state
  const [activeId, setActiveId] = useState<string | null>(null);
  // Custom input
  const [customText, setCustomText] = useState("");
  // Saved plans
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("timeline-plans") || "[]");
    } catch {
      return [];
    }
  });
  const [planName, setPlanName] = useState("Plan A");

  const tileMap = new Map<string, MilestoneTile>();
  allTiles.forEach((t) => tileMap.set(t.id, t));

  // Find which container a tile is currently in
  const findContainer = useCallback(
    (tileId: string): string | null => {
      if (bankIds.includes(tileId)) return "bank";
      for (const [month, ids] of Object.entries(board)) {
        if (ids.includes(tileId)) return month;
      }
      return null;
    },
    [bankIds, board],
  );

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const tileId = String(active.id);
    const targetId = String(over.id);
    const source = findContainer(tileId);
    if (!source) return;

    // Determine destination
    const isMonth = ALL_MONTHS.some((m) => m.key === targetId);
    const dest = isMonth ? targetId : targetId === "bank" ? "bank" : null;
    if (!dest || dest === source) return;

    // Remove from source
    if (source === "bank") {
      setBankIds((prev) => prev.filter((id) => id !== tileId));
    } else {
      setBoard((prev) => ({
        ...prev,
        [source]: (prev[source] || []).filter((id) => id !== tileId),
      }));
    }

    // Add to destination
    if (dest === "bank") {
      setBankIds((prev) => [...prev, tileId]);
    } else {
      setBoard((prev) => ({
        ...prev,
        [dest]: [...(prev[dest] || []), tileId],
      }));
    }
  };

  const removeTileFromBoard = (tileId: string) => {
    setBoard((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        next[k] = next[k].filter((id) => id !== tileId);
      }
      return next;
    });
    setBankIds((prev) => [...prev, tileId]);
  };

  const addCustomTile = () => {
    const text = customText.trim();
    if (!text) return;
    const id = `custom-${Date.now()}`;
    const color = COLORS[allTiles.length % COLORS.length];
    const tile: MilestoneTile = { id, label: text, color };
    setAllTiles((prev) => [...prev, tile]);
    setBankIds((prev) => [...prev, id]);
    setCustomText("");
  };

  const savePlan = () => {
    const customTiles = allTiles.filter((t) => t.id.startsWith("custom-"));
    const plan: SavedPlan = { name: planName, board: { ...board }, bank: [...bankIds], customTiles };
    const updated = [...savedPlans.filter((p) => p.name !== planName), plan];
    setSavedPlans(updated);
    localStorage.setItem("timeline-plans", JSON.stringify(updated));
    toast({ title: "Saved! 💕", description: `"${planName}" has been saved.` });
  };

  const loadPlan = (name: string) => {
    const plan = savedPlans.find((p) => p.name === name);
    if (!plan) return;
    const tiles = [...DEFAULT_TILES, ...plan.customTiles];
    setAllTiles(tiles);
    setBankIds(plan.bank);
    setBoard(plan.board);
    setPlanName(plan.name);
    toast({ title: "Loaded 📋", description: `"${name}" is now active.` });
  };

  const startNew = () => {
    setAllTiles(DEFAULT_TILES);
    setBankIds(DEFAULT_TILES.map((t) => t.id));
    setBoard({});
    const next = `Plan ${String.fromCharCode(65 + savedPlans.length)}`;
    setPlanName(next);
  };

  const deletePlan = (name: string) => {
    const updated = savedPlans.filter((p) => p.name !== name);
    setSavedPlans(updated);
    localStorage.setItem("timeline-plans", JSON.stringify(updated));
    toast({ title: "Deleted", description: `"${name}" removed.` });
  };

  const activeTile = activeId ? tileMap.get(activeId) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <CalendarHeart className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Our Timeline Planner</h1>
              <p className="text-xs text-muted-foreground">Drag milestones onto any month to build your future together 💛</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-28 h-9 text-sm"
              placeholder="Plan name"
            />
            <Button size="sm" onClick={savePlan} className="gap-1">
              <Save className="w-4 h-4" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={startNew} className="gap-1">
              <FileText className="w-4 h-4" /> New
            </Button>
            {savedPlans.length > 0 && (
              <Select onValueChange={loadPlan}>
                <SelectTrigger className="w-36 h-9 text-sm">
                  <SelectValue placeholder="Load plan…" />
                </SelectTrigger>
                <SelectContent>
                  {savedPlans.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      <span className="flex items-center gap-2">
                        {p.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePlan(p.name);
                          }}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
          {/* ── Timeline Board ─────────────────────────── */}
          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" /> Timeline Board
            </h2>

            {/* Group by year */}
            {[2026, 2027, 2028].map((year) => {
              const yearMonths = ALL_MONTHS.filter((m) => m.key.startsWith(String(year)));
              return (
                <div key={year} className="mb-8">
                  <h3 className="text-sm font-bold text-primary mb-3">{year}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {yearMonths.map((m) => (
                      <DroppableMonth
                        key={m.key}
                        monthKey={m.key}
                        label={m.label}
                        tiles={(board[m.key] || []).map((id) => tileMap.get(id)!).filter(Boolean)}
                        onRemove={removeTileFromBoard}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* ── Milestone Bank ─────────────────────────── */}
          <MilestoneBank
            tiles={bankIds.map((id) => tileMap.get(id)!).filter(Boolean)}
            customText={customText}
            setCustomText={setCustomText}
            onAdd={addCustomTile}
          />
        </main>

        <DragOverlay>{activeTile && <DraggableTile tile={activeTile} overlay />}</DragOverlay>
      </DndContext>
    </div>
  );
}

// ── Milestone Bank ─────────────────────────────────────
function MilestoneBank({
  tiles,
  customText,
  setCustomText,
  onAdd,
}: {
  tiles: MilestoneTile[];
  customText: string;
  setCustomText: (v: string) => void;
  onAdd: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "bank" });

  return (
    <section
      ref={setNodeRef}
      className={`sticky bottom-0 rounded-2xl border-2 border-dashed p-5 transition-colors
        ${isOver ? "border-primary bg-primary/5" : "border-muted-foreground/20 bg-card/60 backdrop-blur"}`}
    >
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        🎯 Milestone Bank
      </h2>
      <div className="flex flex-wrap gap-3 mb-4 min-h-[40px]">
        {tiles.length === 0 && (
          <p className="text-sm text-muted-foreground italic">All milestones placed! Drag them back here to reuse.</p>
        )}
        {tiles.map((t) => (
          <DraggableTile key={t.id} tile={t} />
        ))}
      </div>
      <div className="flex gap-2 max-w-md">
        <Input
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Your custom milestone…"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
        />
        <Button onClick={onAdd} size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> Add
        </Button>
      </div>
    </section>
  );
}
