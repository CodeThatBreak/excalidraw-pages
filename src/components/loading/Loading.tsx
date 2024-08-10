import { useRef, useCallback, memo, useEffect } from "react";

import rough from "roughjs";

const Loading = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stopAnimationRef = useRef<boolean>(false);
  const widthRef = useRef<number>(0);
  const seedRef = useRef<number>(1);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const increment = 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rc.rectangle(0, 0, widthRef.current, 32, {
      roughness: 0.5,
      fill: "red",
      seed: seedRef.current,

      preserveVertices: true,
      fillWeight: 0.625,
      hachureGap: 5,
      fillStyle: "hachure",
    });

    widthRef.current = Math.min(canvas.width, increment + widthRef.current);

    if (widthRef.current === canvas.width) {
      stopAnimationRef.current = true;
    }

    if (stopAnimationRef.current) {
      return;
    }

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestAnimationFrame(animate);
    setTimeout(() => {
      stopAnimationRef.current = true;
    }, 1000);
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <canvas ref={canvasRef} width={600} height={32} />
    </div>
  );
};

const MemoizedLoading = memo(Loading);

export { MemoizedLoading as Loading };
