import { useEffect, useState } from "react";

export type MousePosition = {
  x: number; // px
  y: number; // px
  nx: number; // normalized -1..1
  ny: number; // normalized -1..1
};

const initial: MousePosition = { x: 0, y: 0, nx: 0, ny: 0 };

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>(initial);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPosition({ x: e.clientX, y: e.clientY, nx, ny });
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
