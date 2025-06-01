import { Input } from "@renderer/components/ui/input";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { calcSizeByZoom } from "@renderer/core/lib/size";
import { cn } from "@renderer/lib/utils";
import { useState } from "react";

export interface NodeTitleProps {
  title: string;
  onUpdate: (value: string) => void;
  className?: string;
  zoom: number;
}

const NodeTitle = ({ title, onUpdate, className, zoom }: NodeTitleProps) => {
  const { internalValue, handleChange } = useNodeDataDebounceUpdate(title, (value) => {
    onUpdate(value);
  });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <h3 className={cn("font-medium", className)}>
      <Input
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "nodrag border-none !bg-transparent p-0 capitalize shadow-none !ring-0 outline-none",
          isFocused && "nowheel"
        )}
        style={{
          fontSize: `${calcSizeByZoom(zoom)}px`,
        }}
      />
    </h3>
  );
};

export default NodeTitle;
