import { Button } from "@renderer/components/ui/button";
import { ArrowUpFromLine } from "lucide-react";

const NodeGeneration = () => {
  return (
    <Button className="size-6 cursor-pointer rounded-full" size="icon" variant="secondary">
      <ArrowUpFromLine />
    </Button>
  );
};

export default NodeGeneration;
