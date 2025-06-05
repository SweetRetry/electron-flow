import BaseLayout from "@renderer/layout/base-layout";
import ProjectPage from "@renderer/views/projects/[projectId]/page";
import ProjectsPage from "@renderer/views/projects/page";
import PromptsPage from "@renderer/views/prompts/page";
import GenerationTestPage from "@renderer/views/generation-test/page";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "projects",
        children: [
          {
            path: "",
            element: <ProjectsPage />,
          },
          {
            path: ":projectId",
            element: <ProjectPage />,
          },
        ],
      },
      {
        path: "prompts",
        element: <PromptsPage />,
      },
      {
        path: "generation-test",
        element: <GenerationTestPage />,
      },
    ],
  },
  {
    // 404
    path: "*",
    element: <Navigate to="/projects" />,
  },
]);
