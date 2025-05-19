import { BookText, FolderKanban, Moon, Settings, Sun } from "lucide-react";
import { useTranslation } from 'react-i18next';

import { Button } from "@renderer/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@renderer/components/ui/sidebar";
import { useTheme } from "@renderer/context/theme-provider";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Prompts",
    url: "/prompts",
    icon: BookText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const translatedItems = [
    {
      title: t('sidebar.projects'),
      url: "/projects",
      icon: FolderKanban,
    },
    {
      title: t('sidebar.prompts'),
      url: "/prompts",
      icon: BookText,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <h1>Zen</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.application')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {translatedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
