import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

// 创建alova实例
export const alovaInstance = createAlova({
  baseURL: '', // 使用相对路径，通过vite代理转发到后端
  statesHook: ReactHook,
  requestAdapter: adapterFetch(),
  timeout: 60000, // AI生成通常需要较长时间
  beforeRequest(method) {
    // 设置通用请求头
    method.config.headers = {
      'Content-Type': 'application/json',
      ...method.config.headers,
    };
  },
  responded: {
    async onSuccess(response: Response) {
      // alova默认只认为200-299是成功，但我们的202也是成功状态
      if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        console.log(`API响应 [${response.status}]:`, result);
        
        // 后端使用统一响应格式，需要提取data字段
        if (result.success === false) {
          throw new Error(result.error || result.message || '请求失败');
        }
        
        // 返回data字段，如果没有则返回整个结果
        return result.data || result;
      }
      throw new Error(`HTTP Error: ${response.status}`);
    },
    onError(err) {
      console.error('Request failed:', err);
      throw err;
    }
  }
}); 