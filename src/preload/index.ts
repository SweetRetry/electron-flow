import { electronAPI } from "@electron-toolkit/preload";
import { ProjectIpcEvent } from "@helpers/project/constant";
import type { Edge, Node } from "@xyflow/react";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
  saveProject: (projectId: string, nodes: Node[], edges: Edge[]) =>
    ipcRenderer.invoke(ProjectIpcEvent.SaveProject, projectId, nodes, edges),
  getProjects: () => ipcRenderer.invoke(ProjectIpcEvent.GetProjects),
  getProject: (projectId: string) => ipcRenderer.invoke(ProjectIpcEvent.GetProject, projectId),
  createProject: (project: { name: string; description: string; preview_image: string }) =>
    ipcRenderer.invoke(ProjectIpcEvent.CreateProject, project),

  sendNotification: (title: string, body: string) =>
    ipcRenderer.invoke("send-notification", title, body),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
