import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden sm:inline text-xs text-muted-foreground">
            © {new Date().getFullYear()} ARQ CLUB — Todos os direitos reservados
          </span>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Todos os materiais são digitais e ficam disponíveis para acesso imediato dentro da sua área de membros.
        </p>
      </div>
    </footer>
  );
}
