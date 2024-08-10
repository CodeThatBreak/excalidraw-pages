import { useEffect, useRef, useCallback } from "react";

const useDebounceCallback = (fn: (...args: any[]) => void, delay: number) => {
  const timerRef = useRef<number | undefined>(undefined);

  const debouncedFn = useCallback(
    (...args: any[]) => {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFn;
};

export { useDebounceCallback };
