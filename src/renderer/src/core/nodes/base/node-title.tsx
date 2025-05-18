import { Input } from "@renderer/components/ui/input";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { calcSizeByZoom } from "@renderer/core/lib/size";
import { cn } from "@renderer/lib/utils";

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

  return (
    <h3 className={cn("nodrag font-medium", className)}>
      <Input
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
        className="border-none !bg-transparent p-0 capitalize shadow-none !ring-0 outline-none"
        style={{
          fontSize: `${calcSizeByZoom(zoom)}px`,
        }}
      />
    </h3>
  );
};

export default NodeTitle;
