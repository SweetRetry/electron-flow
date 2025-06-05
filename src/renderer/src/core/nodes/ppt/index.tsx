import { Dialog, DialogContent } from "@renderer/components/ui/dialog";
import { handleImageSize } from "@renderer/core/lib/size";
import { Node, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import BaseNode from "../base";

export interface PowerPointNodeData extends Record<string, unknown> {
  title: string;
  previewImage: string;
  src: string;
}

const concatPptUrl = (src: string) => {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${src}`;
};

const PowerPointNode = (node: Node<PowerPointNodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateNode } = useReactFlow();

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageSize(e, (size) => {
      updateNode(node.id, {
        width: size.width,
        height: size.height,
      });
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <BaseNode
        nodeId={node.id}
        title={node.data.title}
        className="flex items-center justify-center"
        onDoubleClick={() => setIsOpen(true)}
      >
        <img
          src={node.data.previewImage}
          alt={node.data.title}
          className="h-full w-full object-cover"
          onLoadedMetadata={handleLoadedMetadata}
        />
      </BaseNode>
      <DialogContent className="h-4/5 w-4/5 !max-w-none p-0 overflow-hidden">
        <iframe
          src={concatPptUrl(node.data.src)}
          className="h-full w-full"
          onError={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PowerPointNode;
