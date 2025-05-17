import { type Edge, Node, ReactFlow, ReactFlowProps } from "@xyflow/react";
import { useMemo } from "react";

import "@xyflow/react/dist/style.css";

import { ReadonlyProvider } from "../../context/readonly";
import { nodeTypes } from "@flow/core/nodes";

export function CanvasPage({
    nodes,
    edges,
}: {
    nodes: Node[];
    edges: Edge[];
}) {
    const reactFlowConfigProps: ReactFlowProps<Node, Edge> = useMemo(() => {
        return {
            nodes,
            nodeTypes:nodeTypes,
            edges,
            snapToGrid: true,
            zoomOnPinch: true,
            panOnScroll: true,
            panOnDrag: [ 1, 2],
            zoomOnDoubleClick: false,
            fitView: true,
        };
    }, [nodes, edges]);

    return (
        // 使用 Context Provider 包裹 ReactFlow
        <ReadonlyProvider isReadonly={true}>
            <ReactFlow {...reactFlowConfigProps} className="bg-background" />
        </ReadonlyProvider>
    );
}
