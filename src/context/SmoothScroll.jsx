// src/context/SmoothScroll.jsx
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import Lenis from "lenis";

const SmoothScrollContext = createContext();

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return context;
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      autoRaf: true,
      syncTouch: true,
      prevent: (node) => {
        // Prevent Lenis from scrolling modals, dialogs, and scrollable containers
        return (
          node.classList.contains("modal-scrollable") ||
          node.classList.contains("dialog") ||
          node.getAttribute("data-lenis-prevent") === "true"
        );
      },
    });

    setLenis(lenisInstance);

    function raf(time) {
      if (!isDisabled) {
        lenisInstance.raf(time);
      }
    }

    const rafId = requestAnimationFrame(function loop(time) {
      raf(time);
      requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, [isDisabled]);

  const disableLenis = useCallback(() => setIsDisabled(true), []);
  const enableLenis = useCallback(() => setIsDisabled(false), []);

  return (
    <SmoothScrollContext.Provider value={{ lenis, disableLenis, enableLenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
