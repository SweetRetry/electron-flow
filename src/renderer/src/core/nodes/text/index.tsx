import { Textarea } from "@renderer/components/ui/textarea";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { Node, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import BaseNode from "../base";
import NodePrompt from "../base/node-prompt";

export interface TextNodeData extends Record<string, unknown> {
  title: string;
  text?: string;
  prompt?: string;
}

const TextNode = (node: Node<TextNodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateNodeData } = useReactFlow();

  const { internalValue, handleChange } = useNodeDataDebounceUpdate(node.data.text, (value) => {
    updateNodeData(node.id, { text: value });
  });

  return (
    <BaseNode
      nodeId={node.id}
      title={node.data.title}
      onDoubleClick={() => setIsEditing(true)}
      headerExtra={<span className="text-muted-foreground text-xs">Gemini</span>}
    >
      <div className="relative h-full overflow-hidden">
        {isEditing ? (
          <Textarea
            className="hide-scrollbar nowheel nodrag h-full w-full resize-none overflow-auto border-none !bg-transparent p-2 pb-24 !text-xs shadow-none !ring-0 outline-none"
            placeholder="Enter your text here..."
            value={internalValue as string}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <div className="hide-scrollbar text-muted-foreground h-full w-full overflow-auto p-2 text-xs">
            {internalValue || "Enter your text here..."}
          </div>
        )}

        <NodePrompt
          className="visible"
          value={node.data.prompt}
          onUpdate={(value) => updateNodeData(node.id, { prompt: value })}
        />
      </div>
    </BaseNode>
  );
};

export default TextNode;
