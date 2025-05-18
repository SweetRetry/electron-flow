import { Node } from "@xyflow/react";

export const BaseSize = {
  minWidth: 250,
  minHeight: 250,
};

export const NodeSpace = 100;

export const calcSizeByZoom = (zoom: number, baseSize: number = 16) => {
  //  zoom = 1 时 字体大小为12
  return Math.max(baseSize / zoom, baseSize);
};

export const handleImageSizeByLoadedMetadata = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  onUpdate: (size: { width: number; height: number }) => void
) => {
  const img = e.target as HTMLImageElement;
  let scale = BaseSize.minHeight / img.height;

  const width = img.width * scale;

  if (width < BaseSize.minWidth) {
    scale = BaseSize.minWidth / img.width;
  }

  const size = {
    width: img.width * scale,
    height: img.height * scale,
  };

  onUpdate(size);
};

export const getNodeSize = (node: Node) => {
  const width = node.width || node.measured?.width || BaseSize.minWidth;
  const height = node.height || node.measured?.height || BaseSize.minHeight;

  return { width, height };
};
