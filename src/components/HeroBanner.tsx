import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import hero from "@/assets/hero-architecture.jpg";

export function HeroBanner({ compact = false, primaryTo = "/projetos" }: { compact?: boolean; primaryTo?: string }) {
  const isHash = primaryTo.startsWith("#");
  const targetId = isHash ? primaryTo.slice(1) : "";

  return (
    <section
      className={
        compact
          ? "relative h-[76vh] min-h-[520px] w-full overflow-hidden sm:h-[72vh] sm:min-h-[500px]"
          : "relative h-[78vh] min-h-[520px] w-full overflow-hidden sm:h-[88vh] sm:min-h-[560px]"
      }
    >
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1024} />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      {/* Architectural grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--gold)_1px,transparent_1px),linear-gradient(90deg,var(--gold)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div
        className={`relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 ${
          compact ? "pb-10 sm:px-8 sm:pb-14" : "pb-16 sm:px-8 sm:pb-24"
        }`}
      >
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">
              Coleção principal
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            500 Projetos de Casas <span className="text-[var(--gold)]">Populares</span> e Modernas
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Escolha um projeto, baixe os arquivos e comece sua obra com mais segurança.
            Arquivos completos em Revit, AutoCAD e PDF.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {primaryTo.startsWith("#") ? (
              <a
                href={primaryTo}
                onClick={(e) => {
                  const el = document.getElementById(targetId);
                  if (!el) return;
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", primaryTo);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:shadow-glow"
              >
                <Play className="h-4 w-4 fill-current" /> Ver Projetos
              </a>
            ) : (
              <Link
                to={primaryTo}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:shadow-glow"
              >
                <Play className="h-4 w-4 fill-current" /> Ver Projetos
              </Link>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <div><span className="font-display text-xl font-bold text-foreground">500+</span> Projetos</div>
            <div><span className="font-display text-xl font-bold text-foreground">3</span> Formatos</div>
            <div><span className="font-display text-xl font-bold text-foreground">∞</span> Acesso vitalício</div>
          </div>
        </div>
      </div>
    </section>
  );
}
