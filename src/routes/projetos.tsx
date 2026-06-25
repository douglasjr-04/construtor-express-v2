import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type FileType } from "@/data/projects";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — ARQ CLUB" },
      { name: "description", content: "Explore todos os projetos arquitetônicos disponíveis." },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["Todos", "Casas Populares", "Casas Modernas", "Sobrados e Duplex", "Projetos para Terrenos Pequenos", "Comercial"];
const fileFilters: Array<"Todos" | FileType> = ["Todos", "Revit", "DWG", "PDF"];

function parseLandSize(value: string) {
  const [wRaw, dRaw] = value.split("x");
  const w = parseFloat((wRaw ?? "").replace(",", ".").replace(/[^\d.]/g, ""));
  const d = parseFloat((dRaw ?? "").replace(",", ".").replace(/[^\d.]/g, ""));
  return {
    w: Number.isFinite(w) ? w : Number.POSITIVE_INFINITY,
    d: Number.isFinite(d) ? d : Number.POSITIVE_INFINITY,
  };
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\d+[.,]?\d*/g, (match) => String(Number(match.replace(",", "."))))
    .replace(/[.,]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todos");
  const [file, setFile] = useState<(typeof fileFilters)[number]>("Todos");

  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        if (p.isBonus) return false;
        if (cat !== "Todos" && p.category !== cat) return false;
        if (file !== "Todos" && !p.files.includes(file)) return false;
        if (query) {
          const haystack = normalizeSearch(`${p.id} ${p.title} ${p.category} ${p.landSize} ${p.builtArea}`);
          const needle = normalizeSearch(query);
          if (!haystack.includes(needle)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const pa = parseLandSize(a.landSize);
        const pb = parseLandSize(b.landSize);
        if (pa.w !== pb.w) return pa.w - pb.w;
        if (pa.d !== pb.d) return pa.d - pb.d;
        return a.title.localeCompare(b.title, "pt-BR");
      });
  }, [query, cat, file]);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
        <div className="mb-8">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Catálogo</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Todos os projetos</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Explore a biblioteca completa. Filtre por categoria, tipo de arquivo ou busque pelo nome do projeto.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-md lg:flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar projeto..."
              className="w-full rounded-lg border border-border bg-card/60 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur focus:border-[var(--gold)]/60 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Arquivo:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {fileFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFile(f)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    file === f
                      ? "bg-[var(--gold)] text-primary-foreground"
                      : "bg-card/60 text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="scrollbar-hide -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                cat === c
                  ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                  : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/40 p-12 text-center text-muted-foreground">
            Nenhum projeto encontrado com esses filtros.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} fluid />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
