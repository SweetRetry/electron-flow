import {
  addEdge,
  type Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from 'react-i18next';

import { Button } from "@renderer/components/ui/button";
import { useTheme } from "@renderer/context/theme-provider";
import "@xyflow/react/dist/style.css";
import { GlobalStateProvider } from "../context/global-state";
import { ReadonlyProvider } from "../context/readonly";
import { usePaneClick } from "../hooks/usePaneClick";
import { nodeTypes } from "../nodes";
import RegisterPlugins from "../plugins";

function Flow({
  initialNodes,
  initialEdges,
  projectId,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
  projectId: string;
}) {
  const { t } = useTranslation();
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { onPaneClick } = usePaneClick();

  const props: ReactFlowProps<Node, Edge> = useMemo(() => {
    return {
      nodeTypes: nodeTypes,
      nodes,
      onNodesChange,
      onEdgesChange,
      onConnect: (connection) => {
        setEdges((prev) => addEdge(connection, prev));
      },
      edges,
      zoomOnPinch: true,
      panOnScroll: true,
      panOnDrag: [1, 2],
      zoomOnDoubleClick: false,
      selectionMode: SelectionMode.Full,
      selectionOnDrag: true,
      deleteKeyCode: ["Backspace", "Delete"],
      fitView: true,
      maxZoom: 1.5,
      minZoom: 0.5,
      connectionRadius: 30,
      onClick: onPaneClick,
    };
  }, [nodes, edges, onNodesChange, onEdgesChange]);

  const { theme } = useTheme();

  const handleSaveProject = useCallback(
    async (projectId: string) => {
      if (!projectId) {
        console.error(t('project.idRequiredToSave'));
        alert(t('project.idRequired'));
        return;
      }
      try {
        const result = await window.api.saveProject(projectId, nodes, edges);
        if (result.success) {
          console.log(t('project.savedTo', { path: result.path }));
          alert(t('project.saveSuccess', { path: result.path }));
        } else {
          console.error(t('project.saveFailed', { error: result.error }));
          alert(t('project.saveFailed', { error: result.error }));
        }
      } catch (error) {
        console.error("Error calling saveProjectData:", error);
        alert(t('common.errorOccurred', 'An error occurred: {{message}}', { message: (error as Error).message }));
      }
    },
    [nodes, edges, t]
  );

  return (
    <ReactFlow
      {...props}
      colorMode={theme === "dark" ? "dark" : "light"}
      className="bg-background text-foreground relative"
    >
      <Panel position="top-right">
        <Button onClick={() => handleSaveProject(projectId)}>{t('common.save')}</Button>
      </Panel>
      <RegisterPlugins plugins={["placeholder"]} />

      <MiniMap position="bottom-right" nodeStrokeWidth={1} pannable />
    </ReactFlow>
  );
}

export function EditModeFlow({
  initialNodes,
  initialEdges,
  projectId,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
  projectId: string;
}) {
  return (
    <ReactFlowProvider>
      <ReadonlyProvider isReadonly={false}>
        <GlobalStateProvider>
          <Flow initialNodes={initialNodes} initialEdges={initialEdges} projectId={projectId} />
        </GlobalStateProvider>
      </ReadonlyProvider>
    </ReactFlowProvider>
  );
}
