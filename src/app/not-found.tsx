"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: px, y: py });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  const rotateX = reducedMotion ? 0 : tilt.y * -10;
  const rotateY = reducedMotion ? 0 : tilt.x * 14;

  // Build the extruded "depth" layers for the 404 text once.
  const depthLayers = Array.from({ length: 22 }, (_, i) => i + 1);
  const textShadow = depthLayers
    .map((i) => {
      const t = i / depthLayers.length;
      // interpolate from violet toward deep indigo/black as it goes "back"
      const r = Math.round(129 - t * 100);
      const g = Math.round(90 - t * 70);
      const b = Math.round(240 - t * 120);
      return `${i * 0.9}px ${i * 0.9}px 0 rgba(${r}, ${g}, ${b}, ${1 - t * 0.4})`;
    })
    .join(", ");

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07060c] px-6"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,74,230,0.18)_0%,rgba(7,6,12,0)_65%)]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22100%22%20height=%22100%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Floating 3D orbs */}
      <Orb
        className="left-[8%] top-[18%] h-24 w-24 md:h-32 md:w-32"
        gradient="radial-gradient(circle at 32% 28%, #b9a4ff, #6d4dfa 45%, #2c1c73 100%)"
        duration={9}
        tilt={tilt}
        depth={18}
      />
      <Orb
        className="right-[10%] top-[26%] h-14 w-14 md:h-20 md:w-20"
        gradient="radial-gradient(circle at 32% 28%, #ffd7f0, #f472b6 45%, #7a1f57 100%)"
        duration={7}
        delay={1.2}
        tilt={tilt}
        depth={30}
      />
      <Orb
        className="bottom-[16%] left-[16%] h-16 w-16 md:h-24 md:w-24"
        gradient="radial-gradient(circle at 32% 28%, #b6f4ff, #34d3e8 45%, #0b5d68 100%)"
        duration={10}
        delay={0.5}
        tilt={tilt}
        depth={24}
      />
      <Orb
        className="bottom-[22%] right-[14%] h-10 w-10 md:h-14 md:w-14"
        gradient="radial-gradient(circle at 32% 28%, #fff3c4, #f7c948 45%, #7a5a0b 100%)"
        duration={6}
        delay={2}
        tilt={tilt}
        depth={40}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <h1
          className="select-none text-[6.5rem] font-black leading-none tracking-tight text-[#fdffea] sm:text-[9rem] md:text-[12rem]"
          style={{
            textShadow,
            fontFamily:
              "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
          }}
        >
          404
        </h1>

        <p className="mt-8 text-lg font-medium text-[#c9c3e6] sm:text-xl">
          This page drifted out of orbit.
        </p>
        <p className="mt-2 max-w-md text-sm text-[#8b84ad] sm:text-base">
          The link might be broken, or the page may have moved. Let&apos;s get
          you back on track.
        </p>

        <div className="flex items-center gap-3">

        
        <Link
          href="/"
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[#0b0716] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "linear-gradient(180deg, #0EA5E9 0%, #0EA5E9 100%)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset, 0 -3px 0 rgba(70,45,150,0.55) inset, 0 12px 24px -8px rgba(120,80,240,0.55)",
          }}
        >
          Back to home
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          >
            <ChevronRight className="size-5"/>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="group relative mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[#0b0716] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "linear-gradient(180deg, #0EA5E9 0%, #0EA5E9 100%)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset, 0 -3px 0 rgba(70,45,150,0.55) inset, 0 12px 24px -8px rgba(120,80,240,0.55)",
          }}
        >
          Back to dashboard
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          >
            <ChevronRight className="size-5"/>
          </span>
        </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
        }
      `}</style>
    </div>
  );
}

function Orb({
  className,
  gradient,
  duration,
  delay = 0,
  tilt,
  depth,
}: {
  className: string;
  gradient: string;
  duration: number;
  delay?: number;
  tilt: { x: number; y: number };
  depth: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: gradient,
        boxShadow:
          "inset -6px -8px 16px rgba(0,0,0,0.35), inset 4px 6px 10px rgba(255,255,255,0.25), 0 20px 40px -12px rgba(0,0,0,0.6)",
        animation: `floatY ${duration}s ease-in-out ${delay}s infinite`,
        transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
        transition: "transform 0.2s ease-out",
      }}
    />
  );
}