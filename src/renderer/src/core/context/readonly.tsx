import { createContext, ReactNode, useContext } from "react";

// 创建 Readonly Context
const ReadonlyContext = createContext<boolean>(false);

// 创建自定义 Hook 以便在节点组件中使用
export const useIsReadonly = () => {
  try {
    const isReadonly = useContext(ReadonlyContext);
    return isReadonly;
  } catch {
    return false;
  }
};

export const ReadonlyProvider = ({
  children,
  isReadonly,
}: {
  children: ReactNode;
  isReadonly: boolean;
}) => {
  return <ReadonlyContext.Provider value={isReadonly}>{children}</ReadonlyContext.Provider>;
};
