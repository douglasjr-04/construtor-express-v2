import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — ARQ CLUB" },
      { name: "description", content: "Seus projetos salvos." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids } = useFavorites();
  const favs = projects.filter((p) => ids.includes(p.id));

  return (
    <AppShell>
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
        <div className="mb-10">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Seus salvos</p>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Favoritos</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acesse rapidamente os projetos que você marcou.</p>
        </div>

        {favs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/30 p-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">Você ainda não tem favoritos</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Toque no coração de qualquer projeto para salvá-lo aqui.
            </p>
            <Link
              to="/projetos"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110"
            >
              Explorar projetos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {favs.map((p) => (
              <ProjectCard key={p.id} project={p} fluid />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
