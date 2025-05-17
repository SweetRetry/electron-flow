import { NodeTypes } from "@xyflow/react";
import TextNode from "./text";
import ImageNode from "./image";
import VideoNode from "./video";
import PowerPointNode from "./ppt";

export enum NodeType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  PPT = "powerpoint",
}

export const nodeTypes = {
  [NodeType.TEXT]: TextNode,
  [NodeType.IMAGE]: ImageNode,
  [NodeType.VIDEO]: VideoNode,
  [NodeType.PPT]: PowerPointNode,
} as unknown as NodeTypes;
