import { Button } from "@renderer/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@renderer/components/ui/sidebar";
import { useTheme } from "@renderer/context/theme-provider";
import { AppSidebar } from "@renderer/layout/app-sidebar";
import { sendNotification } from "@renderer/lib/notification";
import { Bell, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function BaseLayout() {
  const [taskCount, setTaskCount] = useState(0);
  const { theme } = useTheme();

  return (
    <SidebarProvider>
      <Toaster theme={theme} />
      <AppSidebar />

      <main className="flex h-screen w-full flex-col">
        <header className="flex h-12 items-center justify-between border-b px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="relative">
              {taskCount > 0 && <LoaderCircle className="absolute h-full w-full animate-spin" />}
              <Button
                size="icon"
                className="relative rounded-full"
                variant="ghost"
                onClick={() => {
                  if (taskCount === 1) {
                    sendNotification("Zen", "You have no tasks");
                    setTaskCount(0);
                  } else {
                    sendNotification("Zen", "You have a new task");
                    setTaskCount(1);
                  }
                }}
              >
                {taskCount > 0 ? taskCount : <Bell size={16} />}
              </Button>
            </div>
          </div>
        </header>
        <section className="h-full w-full flex-1">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
