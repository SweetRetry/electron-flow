import { SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar";
import { AppSidebar } from "@renderer/layout/app-sidebar";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen flex flex-col">
        <header className="flex items-center justify-between">
          <SidebarTrigger />
        </header>
        <section className="flex-1">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
