import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

type Props = { title: string; projects: Project[]; eyebrow?: string };

export function ProjectCarousel({ title, projects, eyebrow }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  if (!projects.length) return null;

  return (
    <section className="group/section relative">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:px-8">
        <div className="min-w-0">
          {eyebrow && (
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">{eyebrow}</p>
          )}
          <h2 className="mt-1 truncate font-display text-xl font-semibold text-foreground sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="hidden shrink-0 gap-1 sm:flex">
          <button
            onClick={() => scroll(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:border-[var(--gold)]/40 transition"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:border-[var(--gold)]/40 transition"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={ref}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-8"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
          <div className="shrink-0 w-2" />
        </div>
      </div>
    </section>
  );
}
