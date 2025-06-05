import { ProjectManifest } from "@helpers/project/type";
import { Edge, Node } from "@xyflow/react";

export interface Api {
  createProject: (project: { name: string }) => Promise<{
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
  getProjects: () => Promise<Array<ProjectManifest>>;
  getProject: (projectId: string) => Promise<{ nodes: Node[]; edges: Edge[] }>;
  sendNotification: (title: string, body: string) => void;
}
