import { forwardRef } from "react";
import { cn } from "../../lib/utils";

// Animation for tracing the GU paths with absolute geometric precision
const animationKeyframes = `
  @keyframes gu-loader-travel {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: -100; }
  }
`;

const InfinityLoader = forwardRef((props, ref) => {
  const { className, size = 40, ...rest } = props;

  // Mathematically calculated paths for perfect, symmetric, and aligned Capital G and U
  // Both letters share the exact same bounds: Top = 5, Bottom = 35 (Centered at y=20)
  // G: Circular arc centered at (22, 20), radius 15.
  // U: Symmetrical legs and baseline arc.
  const G_PATH = "M34 11 A15 15 0 1 0 34 29 V20 H20";
  const U_PATH = "M46 5 V25 A10 10 0 0 0 66 25 V5";

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn("flex items-center justify-center", className)}
      {...rest}
    >
      <style>{animationKeyframes}</style>

      <svg
        viewBox="0 0 80 40"
        height={size}
        width={size * 2}
        className="drop-shadow-[0_0_12px_rgba(0,0,0,0.1)]"
        aria-hidden="true"
      >
        <g fill="none" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="stroke-slate-200">
          <path pathLength={100} d={G_PATH} />
          <path pathLength={100} d={U_PATH} />
        </g>

        {/* Animated strokes - Tracing simultaneously */}
        <g fill="none" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="stroke-primary">
          <path 
            pathLength={100} 
            strokeDasharray="30 70"
            style={{ animation: "gu-loader-travel 2s cubic-bezier(0.45, 0, 0.55, 1) infinite" }}
            d={G_PATH} 
          />
          <path 
            pathLength={100} 
            strokeDasharray="30 70"
            style={{ animation: "gu-loader-travel 2s cubic-bezier(0.45, 0, 0.55, 1) infinite" }}
            d={U_PATH} 
          />
        </g>
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
});

InfinityLoader.displayName = "InfinityLoader";

export { InfinityLoader };
