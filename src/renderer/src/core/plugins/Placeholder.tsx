import { Button } from "@renderer/components/ui/button";
import { useNodes, useReactFlow } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

const Placeholder = () => {
  const { addNodes } = useReactFlow();

  const nodes = useNodes();
  if (nodes.length > 0) return null;

  const handleAddNode = (type: string) => {
    const newNode = {
      id: uuidv4(),
      type,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: `${type} Node`,
      },
    };

    addNodes([newNode]);
  };

  return (
    <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 space-y-3 text-center">
      <h1 className="text-2xl font-bold">No nodes</h1>
      <p className="text-muted-foreground text-sm">
        Double click on the canvas to add a node or click the button below.
      </p>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" onClick={() => handleAddNode("text")}>
          Text
        </Button>
        <Button variant="outline" onClick={() => handleAddNode("image")}>
          Image
        </Button>
        <Button variant="outline" onClick={() => handleAddNode("video")}>
          Video
        </Button>
      </div>
    </div>
  );
};

export default Placeholder;
