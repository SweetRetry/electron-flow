import { type Edge, Node, ReactFlow, ReactFlowProps } from "@xyflow/react";
import { useMemo } from "react";

import "@xyflow/react/dist/style.css";
import { ReadonlyProvider } from "../context/readonly";

export function ViewModeFlow({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  const props: ReactFlowProps<Node, Edge> = useMemo(() => {
    return {
      nodes,
      onNodesChange: () => {},
      isValidConnection: () => false,
      edges,
      snapToGrid: true,
      zoomOnPinch: true,
      panOnScroll: true,
      panOnDrag: [0, 1, 2],
      onSelectionChange: () => {},
      zoomOnDoubleClick: false,
      fitView: true,
      nodesDraggable: false,
    };
  }, [nodes, edges]);

  return (
    // 使用 Context Provider 包裹 ReactFlow
    <ReadonlyProvider isReadonly={true}>
      <ReactFlow {...props} className="bg-background text-foreground" />
    </ReadonlyProvider>
  );
}
