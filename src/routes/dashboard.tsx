import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HeroBanner } from "@/components/HeroBanner";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { projects, sections } from "@/data/projects";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Início — ARQ CLUB" },
      { name: "description", content: "Bem-vindo à sua biblioteca de projetos arquitetônicos." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell withTopPadding={false}>
      <HeroBanner />

      <div className="mx-auto max-w-[1600px] px-4 pt-10 sm:px-8">
        <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">
          Bem-vindo à sua biblioteca
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
          Acesse seus projetos, bônus e materiais complementares sempre que precisar.
        </h2>
      </div>

      <div className="mt-10 space-y-14 pb-20">
        {sections.map((s) => (
          <ProjectCarousel
            key={s.title}
            title={s.title}
            projects={projects.filter(s.filter).slice(0, 14)}
          />
        ))}
      </div>
    </AppShell>
  );
}
