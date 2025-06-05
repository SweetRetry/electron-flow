import { Button } from "@renderer/components/ui/button";
import { useGeneration } from "@renderer/hooks/useGeneration";
import { GenerationTaskRequest } from "@renderer/endpoints/generation";
import { getDefaultModel } from "@renderer/config/generation-models";
import { useReactFlow } from "@xyflow/react";
import { ArrowUpFromLine, Loader2 } from "lucide-react";
import { useCallback } from "react";

interface NodeGenerationProps {
  nodeId: string;
  nodeType: "image" | "video";
  prompt?: string;
}

const NodeGeneration = ({ nodeId, nodeType, prompt }: NodeGenerationProps) => {
  const { updateNodeData } = useReactFlow();

  const { generateImage, generateVideo, loading } = useGeneration({
    onSuccess: (result) => {
      // 生成成功，更新节点数据
      if (nodeType === "image" && result.result?.image_url) {
        updateNodeData(nodeId, {
          src: result.result.image_url,
          taskId: result.task_id,
        });
      } else if (nodeType === "video" && result.result?.video_url) {
        updateNodeData(nodeId, {
          src: result.result.video_url,
          taskId: result.task_id,
        });
      }
    },
    onError: (error) => {
      console.error("生成失败:", error);
    },
  });

  const handleGenerate = useCallback(async () => {
    if (!prompt?.trim()) {
      alert("请输入生成描述");
      return;
    }

    // 获取默认模型配置
    const defaultModel = getDefaultModel(nodeType);
    
    // 构建请求参数
    const request: GenerationTaskRequest = {
      prompt: prompt.trim(),
      user_id: "demo-user", // 暂时使用固定用户ID
      provider: defaultModel.provider,
      model: defaultModel.id,
      aspect_ratio: defaultModel.defaultAspectRatio || "16:9",
    };

    try {
      if (nodeType === "image") {
        await generateImage(request);
      } else if (nodeType === "video") {
        await generateVideo(request);
      }
    } catch (error) {
      console.error("生成请求失败:", error);
    }
  }, [prompt, nodeType, generateImage, generateVideo]);

  return (
    <Button
      className="size-6 cursor-pointer rounded-full"
      size="icon"
      variant="secondary"
      onClick={handleGenerate}
      disabled={loading || !prompt?.trim()}
    >
      {loading ? <Loader2 className="animate-spin" size={12} /> : <ArrowUpFromLine size={12} />}
    </Button>
  );
};

export default NodeGeneration;
