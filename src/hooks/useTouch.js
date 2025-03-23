import { useState, useCallback } from "react";

export function useTouch({ onTap, threshold = 10 }) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - touchStart.x);
      const deltaY = Math.abs(touch.clientY - touchStart.y);
      console.log("touch cordinate", deltaX, deltaY);

      // Only trigger if the finger hasn't moved too much (threshold)
      if (deltaX <= threshold && deltaY <= threshold) {
        onTap?.(e);
      }
    },
    [touchStart, threshold, onTap]
  );

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}
