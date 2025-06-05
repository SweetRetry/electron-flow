import { PromptSelect } from "@renderer/components/prompt-select";
import { Button } from "@renderer/components/ui/button";
import { TextSelectIcon } from "lucide-react";

const NodePromptSelect = ({
  type,
  onSelect,
}: {
  type: "text" | "image" | "video";
  onSelect: (prompt: string) => void;
}) => {
  return (
    <PromptSelect type={type} onSelect={onSelect}>
      <Button className="size-6 cursor-pointer rounded-full" size="icon" variant="secondary">
        <TextSelectIcon />
      </Button>
    </PromptSelect>
  );
};

export default NodePromptSelect;
