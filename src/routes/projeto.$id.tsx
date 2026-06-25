import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Download, ArrowLeft, FileText, Ruler, Home, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { findProject, projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/projeto/$id")({
  loader: ({ params }) => {
    const project = findProject(params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Projeto"} — ARQ CLUB` },
      { name: "description", content: loaderData?.project.description ?? "Projeto arquitetônico ARQ CLUB." },
      { property: "og:image", content: loaderData?.project.image },
    ],
  }),
  notFoundComponent: () => (
    <AppShell>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Projeto não encontrado</h1>
        <Link to="/projetos" className="mt-6 inline-block text-[var(--gold)] hover:underline">Ver todos os projetos</Link>
      </div>
    </AppShell>
  ),
  component: ProjectDetailsPage,
});

const downloadButtons = [
  { label: "Baixar Revit", req: "Revit" },
  { label: "Baixar AutoCAD DWG", req: "DWG" },
  { label: "Baixar PDF Completo", req: "PDF" },
  { label: "Baixar PDF Modo Obra", req: "PDF" },
  { label: "Baixar Lista de Materiais", req: "PDF" },
] as const;

function ProjectDetailsPage() {
  const { project } = Route.useLoaderData();
  const related = projects.filter((p) => p.id !== project.id && p.category === project.category && !p.isBonus).slice(0, 6);
  const gallery = project.images.length > 0 ? project.images : [project.image];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <AppShell withTopPadding={false}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden pt-16">
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-10 sm:px-8">
          <Link to="/projetos" className="mb-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-[var(--gold)]">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar
          </Link>
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">{project.category}</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{project.description}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_400px]">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold">Galeria do projeto</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card/40 shadow-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={gallery[activeImage] ?? project.image}
                  alt={`${project.title} ${activeImage + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto pb-2">
              {gallery.map((image, index) => (
                <button
                  key={`${project.id}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-xl border transition ${
                    activeImage === index
                      ? "border-[var(--gold)] shadow-glow"
                      : "border-border hover:border-[var(--gold)]/40"
                  }`}
                  aria-label={`Ver imagem ${index + 1} do projeto`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-20 w-28 object-cover sm:h-24 sm:w-36"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat icon={<Home className="h-4 w-4" />} label="Tipo" value={project.type} />
            <Stat icon={<Ruler className="h-4 w-4" />} label="Terreno" value={project.landSize} />
            <Stat icon={<Ruler className="h-4 w-4" />} label="Área construída" value={project.builtArea} />
            <Stat icon={<FileText className="h-4 w-4" />} label="Arquivos" value={project.files.join(" · ")} />
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold">Sobre o projeto</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t: string) => (
                <span key={t} className="rounded-md border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Aviso de segurança:</span> Antes de iniciar sua obra,
                recomendamos validar o projeto com um profissional habilitado da sua região.
              </p>
            </div>
          </div>
        </div>

        {/* Downloads sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur shadow-card">
            <h3 className="font-display text-lg font-semibold">Downloads</h3>
            <p className="mt-1 text-xs text-muted-foreground">Acesse e baixe os arquivos do projeto.</p>

            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gold)] py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:shadow-glow">
              <Download className="h-4 w-4" /> Baixar Arquivos
            </button>

            <div className="mt-5 space-y-2">
              {downloadButtons.map((b) => {
                const available = project.files.includes(b.req as never) || project.files.includes("PDF");
                return (
                  <button
                    key={b.label}
                    disabled={!available}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-background/40 px-4 py-3 text-left text-sm transition hover:border-[var(--gold)]/40 hover:bg-background/60 disabled:opacity-40 disabled:hover:border-border"
                  >
                    <span className="text-foreground">{b.label}</span>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="pb-16">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
            <h2 className="mb-5 font-display text-2xl font-semibold">Projetos relacionados</h2>
            <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-[var(--gold)]">{icon}</span>
        {label}
      </div>
      <div className="mt-2 font-display text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
