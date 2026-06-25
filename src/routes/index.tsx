import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HeroBanner } from "@/components/HeroBanner";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { projects, sections } from "@/data/projects";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARQ CLUB" },
      { name: "description", content: "500+ projetos de casas populares e modernas. Acesso vitalício, bônus exclusivos e garantia de 7 dias. Veja por dentro e escolha seu plano." },
    ],
  }),
  component: LandingPage,
});

const whoFor = [
  {
    title: "Você que está saindo do aluguel",
    desc: "Já tem o terreno (ou vai ter) e quer começar certo, com orçamento claro e projeto profissional.",
  },
  {
    title: "Quer economizar sem perder qualidade",
    desc: "Evite retrabalho e gastos desnecessários com projetos técnicos completos e organizados.",
  },
  {
    title: "Investidor para aluguel ou venda",
    desc: "Ganhe velocidade para executar, padronizar e replicar projetos com alto potencial de retorno.",
  },
  {
    title: "Profissional de obra",
    desc: "Base técnica para apoiar orçamentos, planejamento e execução com mais previsibilidade.",
  },
] as const;

const outcomes = [
  {
    title: "Economia real e comprovada",
    desc: "Corte custos com retrabalho e decisões às cegas, seguindo um projeto organizado.",
  },
  {
    title: "Projeto técnico completo",
    desc: "Conteúdo pronto para apoiar orçamento, compatibilização e tomada de decisão.",
  },
  {
    title: "Aprovação mais rápida",
    desc: "Material mais claro e padronizado para facilitar o entendimento e ajustes quando necessário.",
  },
  {
    title: "Controle total do orçamento",
    desc: "Tenha uma base para comparar propostas e negociar com mais segurança.",
  },
  {
    title: "Visualize antes de construir",
    desc: "Reduza erros ao enxergar o todo com antecedência e planejar etapas de obra.",
  },
  {
    title: "PDF para o canteiro",
    desc: "Documentos práticos para imprimir e levar para a obra, facilitando o dia a dia.",
  },
] as const;

const megaCheckoutUrl =
  "https://checkout.projetodescomplicado.com.br/88565122/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
const ultraCheckoutUrl =
  "https://checkout.projetodescomplicado.com.br/16660674/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
const basicCheckoutUrl =
  "https://checkout.projetodescomplicado.com.br/49126785/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
const basicUpgradeUrl =
  "https://checkout.projetodescomplicado.com.br/08104661/?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";

const plans = [
  {
    id: "basic",
    title: "Pack Básico",
    price: "R$ 10,00",
    features: ["10+ Projetos Completos (Editáveis em REVIT e DWG)", "Garantia de 07 dias", "Acesso Vitalício"],
    cta: "Selecionar Básico",
    highlight: false,
    checkoutUrl: basicCheckoutUrl,
  },
  {
    id: "mega",
    title: "Mega Pack",
    price: "R$ 37,90",
    installments: "8x de R$ 5,40",
    features: [
      "100+ Projetos Completos (Editáveis em REVIT e DWG) - R$ 297",
      "Renderizações 3D de Todos os Projetos - R$ 60",
      "Lista Completa de Materiais por Projeto - R$ 28",
      "Planilha PRO de Custos + Cronograma - R$ 97",
      'PDFs Otimizados "Modo Obra" - R$ 20',
      "Guia Prático de Construção - R$ 15",
      "🎁 BÔNUS 1 — Checklist Aprovação Prefeituras - R$ 97",
      "🎁 BÔNUS 2 — Planilha Automática de Orçamento - R$ 67",
      "🎁 BÔNUS 3 — Guia 15 Erros Caros em Obras - R$ 47",
      "🎁 BÔNUS 4 — Cronograma Realista de Obra - R$ 67",
      "🎁 BÔNUS 5 — PDF Modo Obra Simplificado - R$ 28",
    ],
    cta: "Garantir Mega Pack",
    highlight: false,
    checkoutUrl: megaCheckoutUrl,
  },
  {
    id: "ultra",
    title: "Ultra Pack",
    price: "R$ 67,00",
    installments: "12x de R$ 6,73",
    features: [
      "Tudo que contém no Mega Pack, mais:",
      "500 Projetos em PDF/Planta Humanizada para inspiração",
      "35 Projetos de casas de campo (Editáveis em DWG)",
      "100 Projetos de Chalé Alpino (Projetos para lucrar no AirBNB)",
      "30 Projetos de Kitnets",
      "10 Fachadas em SKP",
      "100+ Projetos Completos (Editáveis em REVIT e DWG)",
      "Renderizações 3D de Todos os Projetos",
      "Lista Completa de Materiais por Projeto",
      "Planilha PRO de Custos + Cronograma",
      "Acesso Vitalício + Todos os Bônus VIP",
    ],
    cta: "Garantir Ultra Pack",
    highlight: true,
    checkoutUrl: ultraCheckoutUrl,
  },
] as const;

function LandingPage() {
  const [basicUpgradeOpen, setBasicUpgradeOpen] = useState(false);
  const bonuses = projects.filter((project) => project.isBonus);

  const track = (event: string, params?: Record<string, unknown>) => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return;
    fbq("track", event, params ?? {});
  };

  return (
    <AppShell>
      <HeroBanner compact primaryTo="#previa-area-membros" />

      <section id="apresentacao" className="mx-auto max-w-[1600px] px-4 pb-14 sm:px-8 sm:pb-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Para quem é esta coleção?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whoFor.map((i) => (
            <div
              key={i.title}
              className="rounded-2xl border border-border bg-card/40 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:bg-card/60 hover:shadow-glow active:scale-[0.99] active:border-[var(--gold)]/40 active:bg-card/60 active:shadow-glow focus-within:-translate-y-1 focus-within:border-[var(--gold)]/40 focus-within:bg-card/60 focus-within:shadow-glow"
            >
              <h3 className="font-display text-sm font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-semibold sm:text-3xl">
          O que você vai <span className="text-[var(--gold)]">conquistar</span>
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((i) => (
            <div
              key={i.title}
              className="rounded-2xl border border-border bg-card/40 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:bg-card/60 hover:shadow-glow active:scale-[0.99] active:border-[var(--gold)]/40 active:bg-card/60 active:shadow-glow focus-within:-translate-y-1 focus-within:border-[var(--gold)]/40 focus-within:bg-card/60 focus-within:shadow-glow"
            >
              <h3 className="font-display text-sm font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-6">
          <h3 className="font-display text-lg font-semibold">Risco zero. Garantia de 7 dias.</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Se você não gostar, você pode solicitar reembolso dentro do prazo de garantia. Você compra com tranquilidade
            e testa por conta própria.
          </p>
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-8 sm:pb-20">
        <h2 className="text-center font-display text-2xl font-semibold tracking-wider sm:text-3xl">
          Selecione <span className="text-muted-foreground">seu plano</span>
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Escolha o pacote ideal para seu objetivo e garanta acesso vitalício.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.title}
              className={`flex flex-col rounded-2xl border bg-card/40 p-6 ${
                p.highlight ? "border-[var(--gold)]/60 shadow-glow" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 font-display text-3xl font-bold">{p.price}</p>
                  {"installments" in p && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                      {p.installments}
                    </p>
                  )}
                </div>
                {p.highlight && (
                  <span className="rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                    Mais vendido
                  </span>
                )}
              </div>

              <div className="scrollbar-hide mt-6 flex-1 space-y-2 overflow-y-auto pr-2 text-xs text-muted-foreground sm:overflow-visible sm:pr-0 sm:text-sm md:max-h-[320px] xl:max-h-none">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]/70" />
                    <span className="leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              {p.id === "basic" ? (
                <button
                  type="button"
                  onClick={() => setBasicUpgradeOpen(true)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-border bg-background/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground transition hover:border-[var(--gold)]/40 hover:bg-background/60"
                >
                  {p.cta}
                </button>
              ) : (
                <a
                  href={p.checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    track("InitiateCheckout", {
                      currency: "BRL",
                      content_category: "plan",
                      content_name: p.title,
                      content_ids: [p.id],
                      value: p.id === "mega" ? 37.9 : 67,
                    })
                  }
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                    p.highlight
                      ? "bg-[var(--gold)] text-primary-foreground hover:brightness-110 hover:shadow-glow"
                      : "border border-border bg-background/40 text-foreground hover:border-[var(--gold)]/40 hover:bg-background/60"
                  }`}
                >
                  {p.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <p
            id="previa-area-membros"
            className="scroll-mt-24 font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]"
          >
            Prévia da área de membros
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Veja por dentro como você vai acessar</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            Navegue pela experiência real: seções, carrosséis, projetos e filtros. Essa é a estrutura que você recebe após a compra.
          </p>
        </div>

        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-14">
          {sections.map((s) => (
            <ProjectCarousel
              key={s.title}
              title={s.title}
              projects={projects.filter((project) => project.hasMappedCover && s.filter(project)).slice(0, 14)}
            />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[1600px] px-4 sm:px-8">
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:shadow-glow"
            >
              Ver catálogo
            </Link>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-foreground backdrop-blur transition hover:bg-white/10 hover:border-[var(--gold)]/40"
            >
              Garantir meu acesso
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-8 sm:pb-24">
        <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Materiais complementares</p>
        <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Bônus Exclusivos</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Planilhas, checklists, guias práticos e materiais extras para acelerar sua obra com mais segurança.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bonuses.map((b) => (
            <Link
              key={b.id}
              to="/projeto/$id"
              params={{ id: b.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card/60 transition hover:border-[var(--gold)]/40 hover:shadow-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
                  Acessar Bônus
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Dialog open={basicUpgradeOpen} onOpenChange={setBasicUpgradeOpen}>
        <DialogContent className="max-w-xl overflow-hidden rounded-3xl border border-border bg-card/60 p-0 backdrop-blur-xl shadow-card">
          <div className="p-6 sm:p-8">
            <div className="mx-auto w-fit rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-red-200">
              Espere! Pense bem antes de trocar
            </div>

            <h2 className="mt-6 text-center font-display text-2xl font-bold leading-tight sm:text-3xl">
              Você vai mesmo abrir mão do{" "}
              <span className="text-[var(--gold)]">Plano Completo</span>?
            </h2>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Ao escolher o Plano Básico, você deixa de ter acesso imediato a recursos que evitam erros e aceleram sua
              construção.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-background/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
                  Oferta única desta página
                </p>
                <span className="rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                  Mega Pack com desconto
                </span>
              </div>

              <div className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                {[
                  "100+ projetos completos e editáveis em Revit + DWG",
                  "Planilha/Simulador de custos + cronograma para planejar com clareza",
                  "Checklist técnico para canteiro de obras",
                  "Acesso vitalício + bônus VIP",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]/80" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    <span className="line-through">R$ 37,90</span> <span className="mx-2">→</span>{" "}
                    <span className="font-semibold text-foreground">por apenas R$ 19,90</span>
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold leading-none text-foreground">Leve tudo por R$ 19,90</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={basicUpgradeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("InitiateCheckout", {
                    currency: "BRL",
                    content_category: "plan",
                    content_name: "Upgrade Mega Pack",
                    content_ids: ["mega-upgrade"],
                    value: 19.9,
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--gold)] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:shadow-glow"
              >
                Sim! Quero o upgrade por R$ 19,90
              </a>
              <a
                href={basicCheckoutUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("InitiateCheckout", {
                    currency: "BRL",
                    content_category: "plan",
                    content_name: "Pack Básico",
                    content_ids: ["basic"],
                    value: 10,
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background/40 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:border-[var(--gold)]/30 hover:bg-background/60 hover:text-foreground"
              >
                Não, quero seguir com o plano básico
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
