import { handleImageSize } from "@renderer/core/lib/size";
import { Node, useReactFlow } from "@xyflow/react";
import BaseNode from "../base";
import { NodeFooter } from "../base/footer";

export interface ImageNodeData extends Record<string, unknown> {
  title: string;
  src?: string;
  prompt?: string;
}

const ImageNode = (node: Node<ImageNodeData>) => {
  const { updateNode } = useReactFlow();
  const imageSrc = node.data.src;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageSize(e, (size) => {
      console.log("size", size);
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
            onLoad={handleLoad}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}

        <NodeFooter nodeId={node.id} promptValue={node.data.prompt} promptSelectType="image" />
      </div>
    </BaseNode>
  );
};

export default ImageNode;
