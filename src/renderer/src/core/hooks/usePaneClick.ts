import { useCallback, useRef } from "react";

import { useReactFlow } from "@xyflow/react";
import type { MouseEvent } from "react";
import { useGlobalState } from "../context/global-state";
import { createCommandNode } from "../lib/factory";
import { NodeType } from "../nodes";

export const usePaneClick = () => {
  const { addNodes, screenToFlowPosition, setNodes } = useReactFlow();
  const { setCommandPosition, setConnectionState } = useGlobalState();
  const clickStart = useRef<number | null>(null);

  const onDoubleClick = useCallback(
    (event: MouseEvent) => {
      if (clickStart.current && +new Date() - clickStart.current < 250) {
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        setCommandPosition(position);

        const commandNode = createCommandNode(position);

        addNodes([commandNode]);

        clickStart.current = null;
      } else {
        clickStart.current = +new Date();
      }
    },
    [screenToFlowPosition, addNodes, setCommandPosition]
  );

  const onPaneClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("react-flow__pane")) {
        setNodes((nds) => nds.filter((node) => node.type !== NodeType.COMMAND));
        setConnectionState(null);
        onDoubleClick(event);
      }
    },
    [onDoubleClick, setConnectionState, setNodes]
  );

  return { onPaneClick };
};
