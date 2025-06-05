import { handleVideoSize } from "@renderer/core/lib/size";
import { Node, useReactFlow } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import BaseNode from "../base";
import { NodeFooter } from "../base/footer";

export interface VideoNodeData extends Record<string, unknown> {
  title: string;
  src?: string;
  prompt?: string;
}

const VideoNode = (node: Node<VideoNodeData>) => {
  const { updateNode } = useReactFlow();

  const videoSrc = node.data.src;

  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, []);

  const onLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      handleVideoSize(videoRef.current, (size) => {
        updateNode(node.id, {
          width: size.width,
          height: size.height,
        });
      });
      setLoading(false);
    }
  }, [node.id, updateNode]);

  const renderVideo = useCallback(() => {
    if (!videoSrc) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-muted-foreground">No Video</p>
        </div>
      );
    }
    return (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}
        <video
          src={videoSrc}
          className="h-full w-full object-cover"
          ref={videoRef}
          onLoadedMetadata={onLoadedMetadata}
        />
      </>
    );
  }, [loading, videoSrc]);

  return (
    <BaseNode
      nodeId={node.id}
      title={node.data.title}
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
    >
      <div className="relative h-full overflow-hidden rounded">
        {renderVideo()}

        <NodeFooter nodeId={node.id} promptValue={node.data.prompt} promptSelectType="video" />
      </div>
    </BaseNode>
  );
};

export default VideoNode;
