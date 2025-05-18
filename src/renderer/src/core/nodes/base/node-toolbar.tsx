import { calcSizeByZoom } from "@renderer/core/lib/size";
import { cn } from "@renderer/lib/utils";
import { useViewport } from "@xyflow/react";
import { ReactNode, useMemo } from "react";

const NodeToolbar = ({ tools, selected }: { tools: ReactNode; selected: boolean }) => {
  const { zoom } = useViewport();
  const offset = useMemo(() => calcSizeByZoom(zoom) + 16, [zoom]);

  return (
    <div
      className={cn(
        "bg-accent text-accent-foreground absolute left-0 rounded p-2",
        "-translate-y-0 opacity-0 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-100",
        selected && "-translate-y-full opacity-100"
      )}
      style={{ top: `-${offset}px` }}
    >
      {tools}
    </div>
  );
};

export default NodeToolbar;
