import { BaseSize } from "@renderer/core/lib/size";
import { cn } from "@renderer/lib/utils";
import { Handle, Position, useReactFlow, useViewport } from "@xyflow/react";
import { Plus } from "lucide-react";
import React, { memo } from "react";
import NodeTitle from "./node-title";

export interface BaseNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  nodeId: string;
  title: string;
  children: React.ReactNode;
  headerExtra?: React.ReactNode;
}

const BaseNode = ({ children, nodeId, title, className, headerExtra, ...props }: BaseNodeProps) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId);
  const seleted = !!node?.selected;
  const { zoom } = useViewport();

  return (
    <div
      className={cn(
        "border-border hover:border-primary group bg-background text-foreground relative flex h-full w-full flex-col rounded border transition-all duration-300",
        seleted && "border-primary",
        className
      )}
      style={{
        ...BaseSize,
        width: node?.width || BaseSize.minWidth,
        height: node?.height || BaseSize.minHeight,
      }}
      {...props}
    >
      <header className="absolute top-0 left-0 z-10 flex w-full -translate-y-full items-center justify-between gap-2">
        <NodeTitle
          zoom={zoom}
          title={title || "Title"}
          onUpdate={(value) => updateNodeData(nodeId, { title: value })}
          className="flex-1"
        />
        {headerExtra}
      </header>
      {children}

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-accent relative z-10 flex !h-4 !w-4 items-center justify-center"
      >
        <Plus size={10} className="pointer-events-none" />
      </Handle>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-accent relative z-10 flex !h-4 !w-4 items-center justify-center"
      >
        <Plus size={10} className="pointer-events-none" />
      </Handle>
    </div>
  );
};

export default memo(BaseNode);
