import { handleImageSizeByLoadedMetadata } from "@renderer/core/lib/size";
import { cn } from "@renderer/lib/utils";
import { Node, useReactFlow } from "@xyflow/react";
import BaseNode from "../base";
import NodePrompt from "../base/node-prompt";

export interface ImageNodeData extends Record<string, unknown> {
  title: string;
  src?: string;
  prompt?: string;
}

const ImageNode = (node: Node<ImageNodeData>) => {
  const { updateNode, updateNodeData } = useReactFlow();
  const imageSrc = node.data.src;

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageSizeByLoadedMetadata(e, (size) => {
      updateNode(node.id, {
        width: size.width,
        height: size.height,
      });
    });
  };

  return (
    <BaseNode nodeId={node.id} title={node.data.title}>
      <div className="relative h-full overflow-hidden rounded">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={node.data.title}
            className="h-full w-full object-cover"
            onLoadedMetadata={handleLoadedMetadata}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}

        <NodePrompt
          className={cn(imageSrc ? "invisible group-hover:visible" : "visible")}
          value={node.data.prompt}
          onUpdate={(value) => updateNodeData(node.id, { prompt: value })}
        />
      </div>
    </BaseNode>
  );
};

export default ImageNode;
