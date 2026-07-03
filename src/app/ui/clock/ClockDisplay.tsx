"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ClockDisplay.module.css";

const H = { h: 0, m: 180 };
const V = { h: 270, m: 90 };
const TL = { h: 180, m: 270 };
const TR = { h: 0, m: 270 };
const BL = { h: 180, m: 90 };
const BR = { h: 0, m: 90 };
const E = { h: 135, m: 135 };

const digits = [
  [
    BR, H, H, BL,
    V, BR, BL, V,
    V, V, V, V,
    V, V, V, V,
    V, TR, TL, V,
    TR, H, H, TL,
  ],
  [
    BR, H, BL, E,
    TR, BL, V, E,
    E, V, V, E,
    E, V, V, E,
    BR, TL, TR, BL,
    TR, H, H, TL,
  ],
  [
    BR, H, H, BL,
    TR, H, BL, V,
    BR, H, TL, V,
    V, BR, H, TL,
    V, TR, H, BL,
    TR, H, H, TL,
  ],
  [
    BR, H, H, BL,
    TR, H, BL, V,
    E, BR, TL, V,
    E, TR, BL, V,
    BR, H, TL, V,
    TR, H, H, TL,
  ],
  [
    BR, BL, BR, BL,
    V, V, V, V,
    V, TR, TL, V,
    TR, H, BL, V,
    E, E, V, V,
    E, E, TR, TL,
  ],
  [
    BR, H, H, BL,
    V, BR, H, TL,
    V, TR, H, BL,
    TR, H, BL, V,
    BR, H, TL, V,
    TR, H, H, TL,
  ],
  [
    BR, H, H, BL,
    V, BR, H, TL,
    V, TR, H, BL,
    V, BR, BL, V,
    V, TR, TL, V,
    TR, H, H, TL,
  ],
  [
    BR, H, H, BL,
    TR, H, BL, V,
    E, E, V, V,
    E, E, V, V,
    E, E, V, V,
    E, E, TR, TL,
  ],
  [
    BR, H, H, BL,
    V, BR, BL, V,
    V, TR, TL, V,
    V, BR, BL, V,
    V, TR, TL, V,
    TR, H, H, TL,
  ],
  [
    BR, H, H, BL,
    V, BR, BL, V,
    V, TR, TL, V,
    TR, H, BL, V,
    BR, H, TL, V,
    TR, H, H, TL,
  ],
];

const normalizeAngle = (next: number, prev: number) => {
  const delta = ((next - prev) % 360 + 360) % 360;
  return prev + delta;
};

const randomAngle = () => Math.floor(Math.random() * 360);

function getTimeDigits() {
  const now = new Date();

  return [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ]
    .flatMap((v) =>
      String(v)
        .padStart(2, "0")
        .split("")
        .map(Number)
    );
}

function Clock({
  h,
  m,
  initial,
}: {
  h: number;
  m: number;
  initial: boolean;
}) {
  const prev = useRef({ h: 0, m: 0 });

  const hour = normalizeAngle(h, prev.current.h);
  const minute = normalizeAngle(m, prev.current.m);

  prev.current = {
    h: hour,
    m: minute,
  };

  return (
    <div
      className={styles.clock}
      style={
        {
          "--hour-angle": initial ? randomAngle() : hour,
          "--minute-angle": initial ? randomAngle() : minute,
          "--dur": initial ? 1 : 0.4,
        } as React.CSSProperties
      }
    />
  );
}

export default function ClockDisplay() {
  const [time, setTime] = useState(Array(6).fill(0));
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    function update() {
      setTime(getTimeDigits());

      const delay = 1000 - (Date.now() % 1000);

      timer = setTimeout(update, delay);
    }

    const init = setTimeout(() => {
      setInitial(false);
      update();
    }, 600);

    return () => {
      clearTimeout(init);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen gap-[0.15vw] pl-[3.3vw]"
      style={
        {
          "--clock-size": "3vw",
          "--gap": "calc(var(--clock-size) * .05)",
        } as React.CSSProperties
      }
    >
      {time.map((digit, i) => (
        <div
          key={i}
          className={`grid grid-cols-4 gap-[var(--gap)] ${
            i % 2 === 1 ? "mr-[3vw]" : ""
          }`}
        >
          {digits[digit].map((c, j) => (
            <Clock
              key={j}
              h={c.h}
              m={c.m}
              initial={initial}
            />
          ))}
        </div>
      ))}
    </div>
  );
}