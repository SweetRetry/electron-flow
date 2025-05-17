import { debounce } from "lodash-es";
import { useCallback, useEffect, useRef, useState } from "react";

export const useNodeDataDebounceUpdate = <T>(value: T, callback: (value: T) => void) => {
  const [internalValue, setInternalValue] = useState<T>(value);
  const isInternalUpdate = useRef(false);

  const debounceUpdate = useCallback(
    debounce((value) => {
      callback(value);
    }, 1000),
    []
  );

  const handleChange = useCallback(
    (value: T) => {
      isInternalUpdate.current = true;
      setInternalValue(value);
      debounceUpdate(value);
    },
    [debounceUpdate]
  );

  useEffect(() => {
    if (!isInternalUpdate.current && internalValue !== value) {
      setInternalValue(value);
    }
    isInternalUpdate.current = false;
  }, [value, internalValue]);

  return {
    internalValue,
    setInternalValue,
    handleChange,
  };
};
