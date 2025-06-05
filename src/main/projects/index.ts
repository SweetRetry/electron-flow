import { ProjectManifest } from "@helpers/project/type";
import { Edge, Node } from "@xyflow/react";
import { app } from "electron";
import fs from "fs/promises";
import path from "path";

export const createProject = async ({ name } = { name: "Untitled" }) => {
  const userDataPath = app.getPath("userData");
  const projectId = crypto.randomUUID();
  const projectDir = path.join(userDataPath, "projects", projectId);
  await fs.mkdir(projectDir, { recursive: true });
  const created_at = Date.now();
  await fs.writeFile(
    path.join(projectDir, `manifest.json`),
    JSON.stringify({
      name,
      preview_image: "",
      created_at,
      updated_at: created_at,
    })
  );

  return { success: true, projectId };
};

export const getProjects = async () => {
  const userDataPath = app.getPath("userData");

  const projectsDir = path.join(userDataPath, "projects");
  const projectIds = await fs.readdir(projectsDir);

  const projects = await Promise.all(
    projectIds.map(async (projectId) => {
      const manifestPath = path.join(projectsDir, projectId, "manifest.json");

      const manifest = await fs.readFile(manifestPath, "utf-8").then((res) => JSON.parse(res));
      return {
        id: projectId,
        ...manifest,
      } as ProjectManifest;
    })
  );

  return projects;
};

export const getProject = async (projectId: string) => {
  const userDataPath = app.getPath("userData");
  const projectDir = path.join(userDataPath, "projects", projectId);
  const dataJsonPath = path.join(projectDir, "data.json");
  const dataJson = await fs
    .readFile(dataJsonPath, "utf-8")
    .then((res) => JSON.parse(res))
    .catch(() => ({ nodes: [], edges: [] }));
  const { nodes, edges } = dataJson;
  return { nodes, edges };
};

export const saveProject = async ({
  projectId,
  nodes,
  edges,
}: {
  projectId: string;
  nodes: Node[];
  edges: Edge[];
}) => {
  if (!projectId || typeof projectId !== "string") {
    return { success: false, error: "Invalid projectId" };
  }
  try {
    const userDataPath = app.getPath("userData");
    const projectDir = path.join(userDataPath, "projects", projectId);

    const updatedAt = Date.now();

    const dataJson = {
      nodes,
      edges,
      updated_at: updatedAt,
    };

    const savePath = path.join(projectDir, "data.json");

    // TODO: add a backup system for the data.json file
    await fs.writeFile(savePath, JSON.stringify(dataJson, null, 2));

    return { success: true, path: savePath };
  } catch (error) {
    console.error("Failed to save project data:", error);
    return { success: false, error: (error as Error).message };
  }
};
