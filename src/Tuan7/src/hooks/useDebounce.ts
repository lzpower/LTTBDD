
import { useEffect, useState } from "react";

// BT7.7b: Chỉ cập nhật sau khi ngừng gõ 400ms
export function useDebounce<T>(
  value: T,
  delay = 400
): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}
