import { Button } from "@renderer/components/ui/button";
import { Dialog, DialogContent } from "@renderer/components/ui/dialog";
import { Node } from "@xyflow/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import BaseNode from "../base";

export interface PowerPointNodeData extends Record<string, unknown> {
  title: string;
  src: string;
}

const concatPptUrl = (src: string) => {
  return `https://view.officeapps.live.com/op/view.aspx?src=${src}`;
};

const PowerPointNode = (node: Node<PowerPointNodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <BaseNode
        nodeId={node.id}
        title={node.data.title}
        className="flex items-center justify-center"
      >
        <Button variant="outline" className="gap-2" onClick={() => setIsOpen(true)}>
          <Eye />
          点击查看
        </Button>
      </BaseNode>
      <DialogContent className="h-4/5 w-4/5 !max-w-none p-0">
        <iframe src={concatPptUrl(node.data.src)} className="h-full w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default PowerPointNode;
