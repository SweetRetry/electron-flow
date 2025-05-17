import {
  type Edge,
  Node,
  ReactFlow,
  ReactFlowProps,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useMemo } from "react";

import { useTheme } from "@renderer/context/theme-provider";
import "@xyflow/react/dist/style.css";
import { ReadonlyProvider } from "../context/readonly";
import { nodeTypes } from "../nodes";

export function EditModeFlow({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
}) {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const props: ReactFlowProps<Node, Edge> = useMemo(() => {
    return {
      nodeTypes: nodeTypes,
      nodes,
      onNodesChange,
      onEdgesChange,
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
    };
  }, [nodes, edges]);

  const { theme } = useTheme();

  return (
    <ReadonlyProvider isReadonly={true}>
      <ReactFlow
        {...props}
        colorMode={theme === "dark" ? "dark" : "light"}
        className="bg-background text-foreground"
      />
    </ReadonlyProvider>
  );
}
