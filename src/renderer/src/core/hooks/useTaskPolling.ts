import { useReactFlow } from "@xyflow/react";
import { useCallback, useRef } from "react";
import { NodeType } from "../nodes";

const generationApis = {
  taskStatus: async (params: { ids: string[]; _t: number }) => {
    const response = await fetch(`/generation/task/status`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    return response.json();
  },
};
/**
 * 初始化 react flow
 * @param nodes 节点列表
 * 由于生成任务是异步的，所以将taskInfo存入到了节点的data，
 * 在reactflow初始化的时候需要收集所有未完成的task来进行轮询并当完成时将结果注入到对应节点上，
 */
export const useTaskPolling = () => {
  const { getNodes, updateNodeData } = useReactFlow();
  const taskSet = useRef<Set<string>>(new Set());
  const taskMap = useRef<Map<string, { fromNodes: { nodeId: string; nodeType: NodeType }[] }>>(
    new Map()
  );
  const isPolling = useRef(false);

  const pollTasks = useCallback(async () => {
    if (isPolling.current) return;
    isPolling.current = true;

    try {
      const nodes = getNodes();
      const taskNodes = nodes.filter((node) => (node.data as any)?.taskInfo?.status === "pending");
      if (taskNodes.length === 0) {
        setTimeout(() => {
          pollTasks();
        }, 2000);
        return;
      }
      const mediaNodes = taskNodes.filter((node) => node.type === "video" || node.type === "image");
      if (mediaNodes.length === 0) {
        setTimeout(() => {
          pollTasks();
        }, 2000);
        return;
      }
      // 收集需要轮询的任务

      mediaNodes.forEach((node) => {
        const taskInfo = (node.data as any)?.taskInfo;
        if (taskInfo?.taskId) {
          taskSet.current.add(taskInfo.taskId);
          taskMap.current.set(taskInfo.taskId, {
            fromNodes: [{ nodeId: node.id, nodeType: node.type as NodeType }],
          });
        }
      });

      // 如果还有未完成的任务，继续轮询
      if (taskSet.current.size > 0) {
        const requestIds = Array.from(taskSet.current);
        // 并发请求
        const results = (await generationApis.taskStatus({
          ids: requestIds,
          _t: Date.now(),
        })) as {
          data: Array<{
            id: string; //taskId
            status: string;
            type: string;
            generated_images?: { image_url: string }[];
            generated_videos?: { video_url: string }[];
          }>;
        };

        const successResults = results.data.filter((item) => item.status === "completed");

        successResults.forEach((item) => {
          const taskId = item.id;
          const taskInfo = taskMap.current.get(taskId);
          if (taskInfo) {
            const resultType = item.type;
            let resultData: string[];
            if (resultType === "image") {
              resultData = item.generated_images?.map((item) => item.image_url) || [];
            } else if (resultType === "video") {
              resultData = item.generated_videos?.map((item) => item.video_url) || [];
            }
            taskInfo.fromNodes.forEach((node, index) => {
              updateNodeData(node.nodeId, {
                loading: false,
                taskInfo: {
                  status: "completed",
                },
                src: resultData[index],
              });
            });
          }

          taskSet.current.delete(taskId);
          taskMap.current.delete(taskId);
        });

        const errorResults = results.data.filter((item) => item.status === "failed");
        errorResults.forEach((item) => {
          const taskId = item.id;
          const taskInfo = taskMap.current.get(taskId);
          if (taskInfo) {
            taskInfo.fromNodes.forEach((node) =>
              updateNodeData(node.nodeId, { taskInfo: { status: "failed" }, loading: false })
            );
          }
          taskSet.current.delete(taskId);
          taskMap.current.delete(taskId);
        });
      }
    } catch (error) {
      console.error("Poll task error:", error);
    } finally {
      setTimeout(() => {
        isPolling.current = false;
        pollTasks();
      }, 5000); // 每5秒轮询一次
    }
  }, [getNodes, updateNodeData]);

  return {
    run: pollTasks,
  };
};
