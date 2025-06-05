import { Textarea } from "@renderer/components/ui/textarea";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { cn } from "@renderer/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const NodePrompt = ({
  onUpdate,
  value,
  className,
}: {
  onUpdate: (value: string) => void;
  value?: string;
  className?: string;
}) => {
  const { t } = useTranslation();
  const { internalValue, handleChange } = useNodeDataDebounceUpdate(value || "", onUpdate);

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

  return (
    <div className={cn("absolute bottom-0 left-0 w-full overflow-hidden backdrop-blur", className)}>
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
  );
};

export default NodePrompt;
