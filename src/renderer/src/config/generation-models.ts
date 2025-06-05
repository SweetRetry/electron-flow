// 生成模型配置
export interface GenerationModel {
  id: string;
  name: string;
  provider: string;
  type: 'image' | 'video';
  description?: string;
  aspectRatios?: string[];
  defaultAspectRatio?: string;
}

// 图片生成模型配置
export const imageModels: GenerationModel[] = [
  {
    id: 'doubao-seedream-3-0-t2i-250415',
    name: '豆包图像生成',
    provider: 'volcengine',
    type: 'image',
    description: '火山引擎豆包高质量图像生成模型',
    aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3', '21:9', '9:21'],
    defaultAspectRatio: '1:1'
  },
  {
    id: 'jimeng_high_aes_general_v21_L',
    name: '即梦AI图像生成',
    provider: 'volcengine',
    type: 'image',
    description: '即梦AI专业级艺术创作图像生成',
    aspectRatios: ['1:1', '4:3', '3:4', '3:2', '2:3', '16:9', '9:16', '21:9', '9:21'],
    defaultAspectRatio: '1:1'
  }
];

// 视频生成模型配置
export const videoModels: GenerationModel[] = [
  {
    id: 'jimeng_vgfm_t2v_l20',
    name: '即梦文生视频',
    provider: 'volcengine',
    type: 'video',
    description: '即梦AI从文本描述生成视频',
    aspectRatios: ['16:9', '9:16', '1:1', '4:3', '3:4', '3:2', '2:3', '21:9', '9:21'],
    defaultAspectRatio: '16:9'
  },
  {
    id: 'jimeng_vgfm_i2v_l20',
    name: '即梦图生视频',
    provider: 'volcengine',
    type: 'video',
    description: '即梦AI从图片生成视频',
    aspectRatios: ['16:9', '9:16', '1:1', '4:3', '3:4', '3:2', '2:3', '21:9', '9:21'],
    defaultAspectRatio: '16:9'
  }
];

// 获取指定类型的模型
export function getModelsByType(type: 'image' | 'video'): GenerationModel[] {
  return type === 'image' ? imageModels : videoModels;
}

// 获取默认模型
export function getDefaultModel(type: 'image' | 'video'): GenerationModel {
  const models = getModelsByType(type);
  return models[0]; // 返回第一个作为默认模型
}

// 根据ID获取模型
export function getModelById(modelId: string): GenerationModel | undefined {
  return [...imageModels, ...videoModels].find(model => model.id === modelId);
} 