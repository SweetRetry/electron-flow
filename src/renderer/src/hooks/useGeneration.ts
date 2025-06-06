import {
  GenerationApis,
  GenerationTaskRequest,
  TaskResultResponse,
} from "@renderer/endpoints/generation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface UseGenerationOptions {
  onSuccess?: (result: TaskResultResponse) => void;
  onError?: (error: any) => void;
  pollInterval?: number; // 轮询间隔，默认3秒
}

export function useGeneration(options: UseGenerationOptions = {}) {
  const { onSuccess, onError, pollInterval = 3000 } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const currentTaskIdRef = useRef<string>(undefined);

  // 开始轮询任务结果
  const startPolling = useCallback(
    (taskId: string) => {
      currentTaskIdRef.current = taskId;

      const poll = async () => {
        try {
          console.log(`轮询任务结果: ${taskId}`);
          const result = await GenerationApis.getTaskResult(taskId);

          console.log(`轮询响应:`, result);

          if (result.status === "completed") {
            // 任务完成
            console.log("任务完成，停止轮询");
            setLoading(false);
            onSuccess?.(result);
            toast.success("生成完成！");
          } else if (result.status === "failed") {
            // 任务失败
            console.log("任务失败，停止轮询");
            setLoading(false);
            onError?.(result.error || "生成失败");
            toast.error(result.error || "生成失败");
          } else if (result.status === "pending" || result.status === "processing") {
            // 任务进行中，继续轮询
            console.log(`任务状态: ${result.status}，等待${pollInterval}ms后继续轮询`);
            toast.loading("正在生成中...", { id: taskId });
            // 等待指定时间后继续轮询
            pollTimerRef.current = setTimeout(poll, pollInterval);
          } else {
            console.log(`未知任务状态: ${result.status}，等待${pollInterval}ms后继续轮询`);
            toast.loading("正在生成中...", { id: taskId });
            // 等待指定时间后继续轮询
            pollTimerRef.current = setTimeout(poll, pollInterval);
          }
        } catch (error) {
          console.error("轮询任务结果失败:", error);
          toast.dismiss(taskId);
          setLoading(false);
          setError(error);
          onError?.(error);
          toast.error("获取生成结果失败");
        }
      };

      // 立即执行一次
      poll();
    },
    [onSuccess, onError, pollInterval]
  );

  // 停止轮询
  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = undefined;
    }
    if (currentTaskIdRef.current) {
      toast.dismiss(currentTaskIdRef.current);
    }
    setLoading(false);
  }, []);

  // 生成图片
  const generateImage = useCallback(
    async (request: GenerationTaskRequest) => {
      try {
        setLoading(true);
        setError(null);
        toast.loading("创建图片生成任务...", { id: "create-task" });

        const response = await GenerationApis.createImageTask(request);
        toast.dismiss("create-task");

        console.log("创建任务响应:", response);

        if (response.task_id) {
          toast.success(`任务创建成功，ID: ${response.task_id}`);
          startPolling(response.task_id);
          return response.task_id;
        } else {
          console.error("响应中缺少task_id:", response);
          throw new Error("创建任务成功但未返回task_id");
        }
      } catch (error) {
        toast.dismiss("create-task");
        console.error("创建图片生成任务失败:", error);
        setLoading(false);
        setError(error);
        onError?.(error);
        toast.error("创建任务失败");
        throw error;
      }
    },
    [startPolling, onError]
  );

  // 生成视频
  const generateVideo = useCallback(
    async (request: GenerationTaskRequest) => {
      try {
        setLoading(true);
        setError(null);
        toast.loading("创建视频生成任务...", { id: "create-task" });

        const response = await GenerationApis.createVideoTask(request);
        toast.dismiss("create-task");

        console.log("创建任务响应:", response);

        if (response.task_id) {
          toast.success(`任务创建成功，ID: ${response.task_id}`);
          startPolling(response.task_id);
          return response.task_id;
        } else {
          console.error("响应中缺少task_id:", response);
          throw new Error("创建任务成功但未返回task_id");
        }
      } catch (error) {
        toast.dismiss("create-task");
        console.error("创建视频生成任务失败:", error);
        setLoading(false);
        setError(error);
        onError?.(error);
        toast.error("创建任务失败");
        throw error;
      }
    },
    [startPolling, onError]
  );

  // 清理定时器
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    generateImage,
    generateVideo,
    stopPolling,
    loading,
    error,
  };
}
