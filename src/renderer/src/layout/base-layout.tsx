import { SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar";
import { AppSidebar } from "@renderer/layout/app-sidebar";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
        <section className="h-full w-full flex-1">{children}</section>
      </main>
    </SidebarProvider>
  );
}
