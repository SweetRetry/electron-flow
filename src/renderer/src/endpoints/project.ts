import { ProjectManifest } from "@helper/project/type";
import { Edge, Node } from "@xyflow/react";

export class ProjectApis {
  static async save(projectId: string, nodes: Node[], edges: Edge[]) {
    const { success, error } = await window.api.saveProject(projectId, nodes, edges);
    if (success) {
      return { success: true };
    }
    return { success: false, error };
  }

  static async get(projectId: string) {
    const { nodes, edges } = await window.api.getProject(projectId);
    return { nodes, edges };
  }

  static async getAll() {
    const projects = await window.api.getProjects();

    return projects;
  }

  static async create(project: Omit<ProjectManifest, "created_at">) {
    const { success, error, projectId } = await window.api.createProject(project);
    if (success) {
      return { success: true, projectId };
    }
    return { success: false, error, projectId: null };
  }
}
