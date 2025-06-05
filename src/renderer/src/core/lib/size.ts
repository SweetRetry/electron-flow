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

export const handleImageSize = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  onUpdate: (size: { width: number; height: number }) => void
) => {
  const img = e.target as HTMLImageElement;
  const { naturalWidth, naturalHeight } = img;
  
  // 如果图片尺寸无效，使用默认尺寸
  if (!naturalWidth || !naturalHeight) {
    onUpdate({
      width: BaseSize.minWidth,
      height: BaseSize.minHeight,
    });
    return;
  }

  // 计算长宽比
  const aspectRatio = naturalWidth / naturalHeight;
  
  let width: number;
  let height: number;
  
  // 根据长宽比决定哪个维度设为250
  if (aspectRatio >= 1) {
    // 宽图或正方形：高度设为250，宽度按比例计算
    height = BaseSize.minHeight;
    width = height * aspectRatio;
  } else {
    // 长图：宽度设为250，高度按比例计算
    width = BaseSize.minWidth;
    height = width / aspectRatio;
  }

  const size = {
    width: Math.round(width),
    height: Math.round(height),
  };

  onUpdate(size);
};

export const handleVideoSize = (
  video: HTMLVideoElement,
  onUpdate: (size: { width: number; height: number }) => void
) => {
  const { videoWidth, videoHeight } = video;
  
  // 如果视频尺寸无效，使用默认尺寸
  if (!videoWidth || !videoHeight) {
    onUpdate({
      width: BaseSize.minWidth,
      height: BaseSize.minHeight,
    });
    return;
  }

  // 计算长宽比
  const aspectRatio = videoWidth / videoHeight;
  
  let width: number;
  let height: number;
  
  // 根据长宽比决定哪个维度设为250
  if (aspectRatio >= 1) {
    // 宽视频或正方形：高度设为250，宽度按比例计算
    height = BaseSize.minHeight;
    width = height * aspectRatio;
  } else {
    // 长视频：宽度设为250，高度按比例计算
    width = BaseSize.minWidth;
    height = width / aspectRatio;
  }

  const size = {
    width: Math.round(width),
    height: Math.round(height),
  };

  onUpdate(size);
};

export const getNodeSize = (node: Node) => {
  const width = node.width || node.measured?.width || BaseSize.minWidth;
  const height = node.height || node.measured?.height || BaseSize.minHeight;

  return { width, height };
};
