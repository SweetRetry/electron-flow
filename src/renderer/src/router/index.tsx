import BaseLayout from "@renderer/layout/base-layout";
import ProjectPage from "@renderer/views/projects/[projectId]/page";
import ProjectsPage from "@renderer/views/projects/page";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectPage />,
      },
    ],
  },
  {
    // 404
    path: "*",
    element: <Navigate to="/projects" />,
  },
]);
