import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@renderer/components/ui/command";
import { Handle, Node, Position, useReactFlow } from "@xyflow/react";

import { ReactNode, useCallback, useMemo } from "react";

import { createImageNode, createTextNode, createVideoNode } from "@renderer/core/lib/factory";
import { ImageIcon, LetterTextIcon, VideoIcon } from "lucide-react";
import { useGlobalState } from "../../context/global-state";

export interface CommandConfig {
  title: string;
  children: {
    label: string;
    icon: ReactNode;
    onClick: (fromNode?: Node) => Node | null | Promise<Node>;
    disabled?: boolean;
  }[];
}

const defaultCommands: CommandConfig[] = [
  {
    title: "创建节点",
    children: [
      {
        label: "文本",
        icon: <LetterTextIcon />,
        onClick: () =>
          createTextNode({
            title: "文本",
          }),
      },
      {
        label: "图片",
        icon: <ImageIcon />,
        onClick: () =>
          createImageNode({
            title: "图片",
          }),
      },
      {
        label: "视频",
        icon: <VideoIcon />,
        onClick: () =>
          createVideoNode({
            title: "视频",
          }),
      },
    ],
  },
];

const CommandNode = (commandNode: Node) => {
  const { connectionState, commandPosition, setConnectionState } = useGlobalState();

  const fromNodeType = useMemo(() => {
    if (!connectionState) return null;
    return connectionState.fromNode?.type;
  }, [connectionState]);

  const fromNodeHandleType = useMemo(() => {
    if (!connectionState) return null;
    return connectionState.fromHandle?.type;
  }, [connectionState]);

  // 通过fromPositon,和当前的node positon 之间的角度计算
  const handlePosition = useMemo(() => {
    if (!connectionState) return Position.Left;
    const fromPosition = connectionState.fromNode?.position;
    if (!fromPosition || !commandPosition) return Position.Left;

    // 以fromPosition为原点，计算commandPostion 的角度
    const angle =
      Math.atan2(fromPosition.y - commandPosition.y, fromPosition.x - commandPosition.x) *
      (180 / Math.PI);

    if (angle > 0 && angle < 90) {
      return Position.Right;
    }
    if (angle > 90 && angle < 180) {
      return Position.Left;
    }

    if (angle > -180 && angle < 0) {
      return Position.Top;
    }

    return Position.Bottom;
  }, [connectionState, commandPosition]);

  const getCommands = useCallback((fromNodeType: string, fromNodeHandleType: string) => {
    console.log(fromNodeType, fromNodeHandleType);
    return [];
  }, []);

  const commands: CommandConfig[] = useMemo(() => {
    if (!fromNodeType || !fromNodeHandleType) return defaultCommands;
    const _commands = getCommands(fromNodeType, fromNodeHandleType);
    return _commands || defaultCommands;
  }, [fromNodeType, fromNodeHandleType, getCommands]);

  const { getNode, setNodes, getEdges, setEdges } = useReactFlow();

  const handleClick = async (onClick: (fromNode?: Node) => Node | null | Promise<Node>) => {
    const fromNodeId = connectionState?.fromNode?.id;

    const fromNode = getNode(fromNodeId || "");
    
    const newNode = await onClick(fromNode);

    const edges = getEdges();

    if (newNode) {
      const fromNodeHandleType = connectionState?.fromHandle?.type;

      newNode.position = commandPosition || { x: 0, y: 0 };

      setNodes((nds) => [...nds.filter((node) => node.type !== "command"), newNode]);
      setConnectionState(null);

      if (fromNode && fromNodeHandleType) {
        if (fromNodeHandleType === "source") {
          const newEdge = {
            id: `${fromNode.id}-${newNode.id}`,
            source: fromNode.id,
            target: newNode.id,
          };

          setEdges(edges.filter((edge) => edge.target !== commandNode.id).concat(newEdge));
        }
        if (fromNodeHandleType === "target") {
          const newEdge = {
            id: `${newNode.id}-${fromNode.id}`,
            source: newNode.id,
            target: fromNode.id,
          };
          setEdges(edges.filter((edge) => edge.source !== commandNode.id).concat(newEdge));
        }
      }

      return;
    }

    setNodes((nds) => nds.filter((node) => node.type !== "command"));

    setEdges(edges.filter((edge) => edge.target !== commandNode.id));

    setConnectionState(null);
  };

  return (
    <Command className="nowheel nodrag nopan animate-in zoom-in w-64 origin-top-left border">
      <Handle type="target" position={handlePosition} className="invisible" />
      <Handle type="source" position={handlePosition} className="invisible" />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        {commands?.map((group) => (
          <CommandGroup
            key={group.title}
            heading={<div className="text-sm">{group.title}</div>}
            className="border-b text-base last:border-b-0"
          >
            {group.children?.map((command) => (
              <CommandItem
                key={command.label}
                onSelect={() => handleClick(command.onClick)}
                disabled={command.disabled}
              >
                <div className="flex cursor-pointer items-center px-3 py-1 text-base">
                  {command.icon} <span className="ml-2">{command.label}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
};

export default CommandNode;
