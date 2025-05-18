import { ProjectIpcEvent } from "@helpers/project/constant";
import { ProjectManifest } from "@helpers/project/type";
import { Edge, Node } from "@xyflow/react";
import { ipcMain } from "electron";
import { createProject, getProject, getProjects, saveProject } from ".";

export const registerProjectIpc = () => {
  // IPC handler for saving project data
  ipcMain.handle(
    ProjectIpcEvent.SaveProject,
    (_, projectId: string, nodes: Node[], edges: Edge[]) => {
      return saveProject({
        projectId,
        nodes,
        edges,
      });
    }
  );

  ipcMain.handle(ProjectIpcEvent.GetProjects, () => getProjects());

  ipcMain.handle(ProjectIpcEvent.GetProject, (_, projectId: string) => getProject(projectId));

  ipcMain.handle(ProjectIpcEvent.CreateProject, (_, project: Omit<ProjectManifest, "created_at">) =>
    createProject(project)
  );
};
