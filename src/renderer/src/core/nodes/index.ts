import { NodeTypes } from "@xyflow/react";
import CommandNode from "./command";
import ImageNode from "./image";
import PowerPointNode from "./ppt";
import TextNode from "./text";
import VideoNode from "./video";

export enum NodeType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  PPT = "powerpoint",
  COMMAND = "command",
}

export const nodeTypes = {
  [NodeType.TEXT]: TextNode,
  [NodeType.IMAGE]: ImageNode,
  [NodeType.VIDEO]: VideoNode,
  [NodeType.PPT]: PowerPointNode,
  [NodeType.COMMAND]: CommandNode,
} as unknown as NodeTypes;
