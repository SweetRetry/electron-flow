import { ElectronAPI } from "@electron-toolkit/preload";
import type { Edge, Node } from "@xyflow/react";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      createProject: (project: Omit<ProjectManifest, "created_at">) => Promise<{
        projectId: string;
        success: boolean;
        error?: string;
      }>;
      saveProject: (
        projectId: string,
        nodes: Node[],
        edges: Edge[]
      ) => Promise<{
        success: boolean;
        path?: string;
        error?: string;
      }>;
      getProjects: () => Promise<({ id: string } & ProjectManifest)[]>;
      getProject: (projectId: string) => Promise<{ nodes: Node[]; edges: Edge[] }>;
      sendNotification: (title: string, body: string) => void;
    };
  }
}
