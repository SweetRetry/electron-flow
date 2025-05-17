import {  NodeTypes } from "@xyflow/react";
import TextNode from "./text";

export enum NodeType {
    TEXT = "text"
}

export const nodeTypes = {
    [NodeType.TEXT]: TextNode
} as unknown as NodeTypes
