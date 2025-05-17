import { Textarea } from "@renderer/components/ui/textarea";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { useEffect, useRef } from "react";

const NodePrompt = ({ onUpdate, value }: { onUpdate: (value: string) => void; value: string }) => {
  const { internalValue, handleChange } = useNodeDataDebounceUpdate(value, onUpdate);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "16px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 48)}px`;
    }
  }, [internalValue]);

  return (
    <div className="nowheel nodrag invisible absolute bottom-0 left-0 z-10 w-full overflow-hidden backdrop-blur-xs group-hover:visible">
      <Textarea
        ref={textareaRef}
        value={internalValue}
        placeholder="Enter your prompt..."
        onChange={(e) => handleChange(e.target.value)}
        className="hide-scrollbar z-10 max-h-16 min-h-6 resize-none overflow-auto rounded-none border-none p-2 !text-xs !ring-0 will-change-transform outline-none"
      />
    </div>
  );
};

export default NodePrompt;
