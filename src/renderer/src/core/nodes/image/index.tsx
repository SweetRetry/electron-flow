import { Node, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import BaseNode, { BaseSize } from "../base";
import NodePrompt from "../base/node-prompt";

export interface ImageNodeData extends Record<string, unknown> {
  title: string;
  src: string;
  prompt: string;
}

const ImageNode = (node: Node<ImageNodeData>) => {
  const { updateNode, updateNodeData } = useReactFlow();
  const imageSrc = node.data.src;

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        let scale = BaseSize.minHeight / img.height;

        const width = img.width * scale;

        if (width < BaseSize.minWidth) {
          scale = BaseSize.minWidth / img.width;
        }

        updateNode(node.id, {
          width: img.width * scale,
          height: img.height * scale,
        });
      };
    }
  }, [imageSrc]);

  return (
    <BaseNode nodeId={node.id} title={node.data.title}>
      <div className="relative h-full overflow-hidden rounded">
        {imageSrc ? (
          <img src={imageSrc} alt={node.data.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}

        <NodePrompt
          value={node.data.prompt}
          onUpdate={(value) => updateNodeData(node.id, { prompt: value })}
        />
      </div>
    </BaseNode>
  );
};

export default ImageNode;
