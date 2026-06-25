import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppShell({ children, withTopPadding = true }: { children: ReactNode; withTopPadding?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className={withTopPadding ? "pt-16" : ""}>{children}</main>
      <Footer />
    </div>
  );
}
