import { useEffect, useRef, useState } from "react";

export default function SmoothCursor() {
  const cursorRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const touch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

      setIsTouchDevice(touch);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const pos = {
      x: mouse.x,
      y: mouse.y,
    };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const hide = () => setHidden(true);
    const show = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("cursor-hide", hide);
    window.addEventListener("cursor-show", show);

    let raf;

    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.12;
      pos.y += (mouse.y - pos.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${pos.x}px, ${pos.y}px, 0)
          translate(-50%, -50%)
        `;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("cursor-hide", hide);
      window.removeEventListener("cursor-show", show);
      cancelAnimationFrame(raf);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] h-14 w-14 rounded-full"
      style={{
        backgroundColor: "#fff",
        mixBlendMode: "difference",
        willChange: "transform",
        opacity: hidden ? 0 : 1,
      }}
    />
  );
}