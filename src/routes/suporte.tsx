import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Mail, ChevronDown, LifeBuoy } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/suporte")({
  head: () => ({
    meta: [
      { title: "Suporte — ARQ CLUB" },
      { name: "description", content: "Precisa de ajuda? Nossa equipe está pronta para te ajudar." },
    ],
  }),
  component: SupportPage,
});

const faqs = [
  { q: "Como baixo meus projetos?", a: "Acesse a página do projeto desejado e clique em 'Baixar Arquivos'. Você terá acesso a todos os formatos disponíveis (Revit, DWG e PDF)." },
  { q: "Os arquivos são editáveis?", a: "Sim. Os arquivos em Revit e AutoCAD DWG são totalmente editáveis. O PDF é apenas para visualização e impressão." },
  { q: "Posso abrir no Revit?", a: "Sim, todos os projetos que possuem o selo 'Revit' incluem o arquivo .rvt original, editável no Autodesk Revit." },
  { q: "Posso usar os projetos na minha obra?", a: "Sim. Recomendamos sempre validar o projeto com um profissional habilitado da sua região antes de iniciar a obra." },
  { q: "O acesso é vitalício?", a: "Sim. Após a compra, seu acesso à área de membros é vitalício, com todas as atualizações futuras incluídas." },
];

function SupportPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">Precisa de ajuda?</h1>
          <p className="mt-3 text-muted-foreground">
            Nossa equipe está pronta para te ajudar com o acesso aos seus projetos.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="https://api.whatsapp.com/send/?phone=5511978693918&text=O%E2%81%AC%E2%81%AD%E2%81%AC%E2%81%AD%E2%81%AC%E2%81%AD%E2%81%AC%E2%81%ADl%C3%A1&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 hover:shadow-glow"
            >
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
            <a
              href="mailto:suporte@arqclub.com"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-foreground transition hover:border-[var(--gold)]/40 hover:bg-card"
            >
              <Mail className="h-4 w-4" /> Enviar E-mail
            </a>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-5 space-y-2">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-display text-sm font-semibold text-foreground sm:text-base">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180 text-[var(--gold)]" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</div>}
    </div>
  );
}
