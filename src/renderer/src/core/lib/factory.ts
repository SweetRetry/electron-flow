import { Node, XYPosition } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { ImageNodeData } from "../nodes/image";
import { TextNodeData } from "../nodes/text";
import { VideoNodeData } from "../nodes/video";

export const createTextNode = (
  data: TextNodeData,
  position: XYPosition = { x: 0, y: 0 }
): Node<TextNodeData, "text"> => {
  return {
    id: uuidv4(),
    type: "text",
    data,
    position,
  };
};

export const createImageNode = (
  data: ImageNodeData,
  position: XYPosition = { x: 0, y: 0 }
): Node => {
  return {
    id: uuidv4(),
    type: "image",
    data,
    position,
  };
};

export const createVideoNode = (
  data: VideoNodeData,
  position: XYPosition = { x: 0, y: 0 }
): Node => {
  return {
    id: uuidv4(),
    type: "video",
    data,
    position,
  };
};

export const createCommandNode = (position: XYPosition = { x: 0, y: 0 }): Node => {
  return {
    id: uuidv4(),
    type: "command",
    data: {},
    position,
  };
};

export const createNodeFactory = (type: string) => {
  switch (type) {
    case "text":
      return createTextNode;
    case "image":
      return createImageNode;
    case "video":
      return createVideoNode;
    case "command":
      return createCommandNode;
    default:
      return null;
  }
};
