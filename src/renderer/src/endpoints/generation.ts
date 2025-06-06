import { alovaInstance } from '@renderer/lib/alova';

// 生成任务相关的类型定义
export interface GenerationTaskRequest {
  prompt?: string;
  model: string;
  user_id: string;
  provider: string;
  aspect_ratio?: string;
  image_urls?: string[];
  duration?: number;
  seed?: number;
}

export interface GenerationTaskResponse {
  task_id: string;
  status: string;
  provider: string;
  model: string;
}

export interface TaskResultResponse {
  task_id: string;
  status: string;
  result?: {
    image_url?: string;
    video_url?: string;
    message?: string;
  };
  error?: string;
}

// 生成相关API
export class GenerationApis {
  // 创建图片生成任务
  static createImageTask(data: GenerationTaskRequest) {
    return alovaInstance.Post<GenerationTaskResponse>('/api/v1/ai/image/task', data);
  }

  // 创建视频生成任务
  static createVideoTask(data: GenerationTaskRequest) {
    return alovaInstance.Post<GenerationTaskResponse>('/api/v1/ai/video/task', data);
  }

  // 获取任务结果 (轮询时禁用缓存)
  static getTaskResult(taskId: string) {
    return alovaInstance.Get<TaskResultResponse>(`/api/v1/ai/task/result/${taskId}`, {
      cacheFor: 0, // 禁用缓存，每次都发起真实请求
    });
  }

  // 删除任务
  static deleteTask(taskId: string) {
    return alovaInstance.Delete(`/api/v1/ai/task/${taskId}`);
  }
} 