import { PromptSelect } from "@renderer/components/prompt-select";
import { Button } from "@renderer/components/ui/button";
import { Textarea } from "@renderer/components/ui/textarea";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { cn } from "@renderer/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { TextSelectIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NodeGeneration from "./node-generation";

interface NodeFooterProps {
  nodeId: string;
  promptValue?: string;
  promptSelectType: "text" | "image" | "video";
  className?: string;
}

const NodeFooter = ({ nodeId, promptValue, promptSelectType, className }: NodeFooterProps) => {
  const { t } = useTranslation();
  const { updateNodeData } = useReactFlow();

  const { internalValue, handleChange } = useNodeDataDebounceUpdate(promptValue || "", (value) => {
    updateNodeData(nodeId, { prompt: value });
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "16px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 48)}px`;
    }
  }, [internalValue]);

  const handlePromptSelect = (prompt: string) => {
    updateNodeData(nodeId, { prompt });
  };

  return (
    <>
      {/* NodePrompt */}
      <div className={cn("absolute bottom-0 left-0 w-full overflow-hidden", className)}>
        <Textarea
          ref={textareaRef}
          value={internalValue}
          placeholder={t("node.promptPlaceholder")}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "hide-scrollbar nodrag z-10 max-h-16 min-h-8 w-[calc(100%-3.5rem)] resize-none overflow-auto rounded-none border-none !bg-transparent p-2 !text-xs !ring-0 will-change-transform outline-none",
            isFocused && "nowheel"
          )}
        />
      </div>

      {/* NodePromptSelect and NodeGeneration */}
      <div className="absolute right-2 bottom-1 z-10 flex w-12 space-x-1">
        <PromptSelect type={promptSelectType} onSelect={handlePromptSelect}>
          <Button className="size-6 cursor-pointer rounded-full" size="icon" variant="secondary">
            <TextSelectIcon />
          </Button>
        </PromptSelect>
        {(promptSelectType === "image" || promptSelectType === "video") && (
          <NodeGeneration nodeId={nodeId} nodeType={promptSelectType} prompt={internalValue} />
        )}
      </div>
    </>
  );
};

export default NodeFooter;
