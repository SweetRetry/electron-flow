import { Textarea } from "@renderer/components/ui/textarea";
import { useNodeDataDebounceUpdate } from "@renderer/core/hooks/useNodeDataDebounceUpdate";
import { cn } from "@renderer/lib/utils";
import { Node, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import BaseNode from "../base";
import { NodeFooter } from "../base/footer";
import MarkdownPreview from "./markdown-preview";

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

  // 检查内容是否包含markdown语法
  const hasMarkdownSyntax = (text: string) => {
    if (!text) return false;
    const markdownPatterns = [
      /^#{1,6}\s/m, // 标题
      /\*\*.*\*\*/, // 粗体
      /\*.*\*/, // 斜体
      /`.*`/, // 行内代码
      /```[\s\S]*```/, // 代码块
      /^\s*[-*+]\s/m, // 列表
      /^\s*\d+\.\s/m, // 有序列表
      /\[.*\]\(.*\)/, // 链接
      /^\s*>/m, // 引用
    ];
    return markdownPatterns.some((pattern) => pattern.test(text));
  };

  const shouldShowMarkdown = hasMarkdownSyntax(internalValue as string);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <BaseNode
      nodeId={node.id}
      title={node.data.title}
      headerExtra={
        <div className="flex items-center gap-2">
          <MarkdownPreview content={internalValue as string} />
          <span className="text-muted-foreground text-xs">
            {shouldShowMarkdown ? "Markdown" : "Text"}
          </span>
        </div>
      }
    >
      <div className="relative h-full overflow-hidden">
        <Textarea
          className={cn(
            "hide-scrollbar h-full w-full resize-none overflow-auto border-none !bg-transparent p-3 pb-24 font-mono !text-xs shadow-none !ring-0 outline-none",
            isFocused && "nowheel nodrag"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="输入文本内容...(支持Markdown语法)"
          value={internalValue as string}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus
        />

        <NodeFooter nodeId={node.id} promptValue={node.data.prompt} promptSelectType="text" />
      </div>
    </BaseNode>
  );
};

export default TextNode;
