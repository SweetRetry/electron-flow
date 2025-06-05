import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { useGeneration } from "@renderer/hooks/useGeneration";
import { getModelsByType, GenerationModel } from "@renderer/config/generation-models";
import { useState } from "react";
import { toast } from "sonner";

export function TestGeneration() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<GenerationModel | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const { generateImage, generateVideo, loading } = useGeneration({
    onSuccess: (result) => {
      console.log("生成成功:", result);
      if (result.result?.image_url) {
        setGeneratedContent(result.result.image_url);
      } else if (result.result?.video_url) {
        setGeneratedContent(result.result.video_url);
      }
      toast.success("内容生成成功！");
    },
    onError: (error) => {
      console.error("生成失败:", error);
      toast.error("内容生成失败");
    }
  });

  const imageModels = getModelsByType('image');
  const videoModels = getModelsByType('video');

  const handleGenerate = async () => {
    if (!selectedModel || !prompt.trim()) {
      toast.error("请选择模型并输入提示词");
      return;
    }

    const request = {
      prompt: prompt.trim(),
      user_id: "demo-user",
      provider: selectedModel.provider,
      model: selectedModel.id,
      aspect_ratio: selectedModel.defaultAspectRatio || "16:9",
    };

    try {
      if (selectedModel.type === 'image') {
        await generateImage(request);
      } else {
        await generateVideo(request);
      }
    } catch (error) {
      console.error("生成请求失败:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">内容生成测试</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">选择模型类型:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">图片模型</h3>
              {imageModels.map((model) => (
                <div key={model.id} className="mb-2">
                  <Button
                    variant={selectedModel?.id === model.id ? "default" : "outline"}
                    onClick={() => setSelectedModel(model)}
                    className="w-full justify-start"
                  >
                    {model.name}
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">视频模型</h3>
              {videoModels.map((model) => (
                <div key={model.id} className="mb-2">
                  <Button
                    variant={selectedModel?.id === model.id ? "default" : "outline"}
                    onClick={() => setSelectedModel(model)}
                    className="w-full justify-start"
                  >
                    {model.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedModel && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">已选择: {selectedModel.name}</h4>
            <p className="text-sm text-gray-600">{selectedModel.description}</p>
            <p className="text-sm">提供商: {selectedModel.provider}</p>
            <p className="text-sm">默认宽高比: {selectedModel.defaultAspectRatio}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">提示词:</label>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="输入你想要生成的内容描述..."
            className="w-full"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !selectedModel || !prompt.trim()}
          className="w-full"
        >
          {loading ? "生成中..." : `生成${selectedModel?.type === 'image' ? '图片' : '视频'}`}
        </Button>

        {generatedContent && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">生成结果:</h3>
            {selectedModel?.type === 'image' ? (
              <img src={generatedContent} alt="Generated" className="max-w-full rounded-lg" />
            ) : (
              <video src={generatedContent} controls className="max-w-full rounded-lg" />
            )}
          </div>
        )}
      </div>
    </div>
  );
} 