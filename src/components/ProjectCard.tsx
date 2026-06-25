import { Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";

type Props = { project: Project; size?: "default" | "wide"; fluid?: boolean };

export function ProjectCard({ project, size = "default", fluid = false }: Props) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(project.id);

  const widthCls = fluid
    ? "w-full"
    : size === "wide"
      ? "w-[260px] sm:w-[300px] lg:w-[340px]"
      : "w-[190px] sm:w-[230px] lg:w-[260px]";

  return (
    <div className={`group relative ${fluid ? "" : "shrink-0"} ${widthCls}`}>
      <Link
        to="/projeto/$id"
        params={{ id: project.id }}
        className="block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-glow"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {project.files.slice(0, 3).map((f) => (
              <span
                key={f}
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-wider backdrop-blur ${
                  f === "Bônus"
                    ? "bg-[var(--gold)]/90 text-primary-foreground"
                    : "bg-black/60 text-foreground border border-white/10"
                }`}
              >
                {f.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]/90">
              {project.category}
            </p>
            <h3 className="mt-1 line-clamp-1 font-display text-base font-semibold text-foreground">
              {project.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>{project.landSize}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{project.builtArea}</span>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(project.id);
        }}
        className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full backdrop-blur transition ${
          fav
            ? "bg-[var(--gold)] text-primary-foreground"
            : "bg-black/60 text-foreground border border-white/10 hover:bg-black/80"
        }`}
        aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
      </button>

      <Link
        to="/projeto/$id"
        params={{ id: project.id }}
        className="pointer-events-none absolute inset-x-3 bottom-3 inline-flex translate-y-2 items-center justify-center gap-2 rounded-md border border-[var(--gold)]/40 bg-background/70 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] opacity-0 backdrop-blur transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
      >
        Acessar <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
