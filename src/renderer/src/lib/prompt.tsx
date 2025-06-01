import EN_PROMPTS from "@renderer/assets/prompts/en.json";
import ZH_PROMPTS from "@renderer/assets/prompts/zh.json";

export const getPromptsDataSource = (lang: string) => {
  if (lang === "zh") {
    return ZH_PROMPTS.prompts;
  }
  return EN_PROMPTS.prompts;
};

export const getPrompts = (lang: string, type: "text" | "image" | "video") => {
  const dataSource = getPromptsDataSource(lang);
  return dataSource[type];
};
