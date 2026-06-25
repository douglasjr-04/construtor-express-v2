import { createFileRoute } from "@tanstack/react-router";
import { Gift, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { projects } from "@/data/projects";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/bonus")({
  head: () => ({
    meta: [
      { title: "Bônus Exclusivos — ARQ CLUB" },
      { name: "description", content: "Acesse planilhas, checklists e guias exclusivos para sua obra." },
    ],
  }),
  component: BonusPage,
});

function BonusPage() {
  const bonuses = projects.filter((p) => p.isBonus);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
        <div className="mb-10 flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--gold)]/10 text-[var(--gold)]">
            <Gift className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Materiais complementares</p>
            <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Bônus Exclusivos</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Planilhas, checklists, guias práticos e materiais extras para acelerar sua obra com mais segurança.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bonuses.map((b) => (
            <Link
              key={b.id}
              to="/projeto/$id"
              params={{ id: b.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card/60 transition hover:border-[var(--gold)]/40 hover:shadow-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-[var(--gold)]/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Bônus
                </span>
              </div>
              <div className="p-5">
                <h3 className="min-h-[3.5rem] text-balance break-words font-display text-lg font-semibold leading-tight sm:min-h-[4rem]">
                  {b.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{b.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                  Acessar Bônus <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
