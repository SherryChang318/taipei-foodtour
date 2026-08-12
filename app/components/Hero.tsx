"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const easeOut = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

const useCountUp = (
  target: number,
  duration: number,
  delay: number,
  triggered: boolean
): number => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) {
      setCount(0);
      return;
    }

    const timer = setTimeout(() => {
      startTimeRef.current = null;
      const animate = (currentTime: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOut(progress);
        const currentValue = Math.floor(target * easedProgress);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [triggered, target, duration, delay]);

  return count;
};

const stats = [
  { numeric: 250, suffix: "+", label: "Visitors", delay: 0 },
  { numeric: 100, suffix: "+", label: "Food Vendors", delay: 150 },
  { numeric: 50, suffix: "+", label: "Tours", delay: 300 },
];

export default function Hero() {
  const ulRef = useRef<HTMLUListElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTriggered(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ulRef.current) {
      observer.observe(ulRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden text-white">
      <Image
        src="/images/hero.png"
        alt="Crowded Taipei food market at night"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/30" />

      {/* Go to Day Tour — top-left overlay */}
      <div className="absolute left-6 top-7 z-10 sm:left-10 lg:left-[72px] lg:top-9">
        <Link href="/day-tour" className="flex min-w-0 items-center gap-2 lg:gap-[11px]">
          <Image
            src="/images/icon-menu.svg"
            alt="Menu"
            width={26}
            height={26}
            className="h-[26px] w-[26px] shrink-0"
          />
          <span className="truncate font-quicksand text-[16px] font-bold leading-none text-white md:text-[20px]">
            Go to Day Tour
          </span>
        </Link>
        <Image
          src="/images/hero-squiggle.svg"
          alt=""
          width={157}
          height={14}
          className="mt-1 ml-9 lg:ml-[37px]"
        />
      </div>

      <div
        className="
          mx-auto flex w-full max-w-[1440px] flex-col items-center
          px-6 pb-16 pt-28
          sm:px-10 sm:pt-32
          md:px-16
          lg:min-h-[1030px] lg:px-20 lg:pb-[110px] lg:pt-[188px]
        "
      >
        <h1
          className="
            font-script text-center font-normal leading-tight tracking-tight
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[64px]
          "
        >
          Taste The Heart of Taipei
        </h1>

        <Link
          href="/hot-tours"
          className="
            inline-flex items-center justify-center
            cursor-pointer truncate rounded-[10px] border-[3px] border-[#FFD700] bg-[#FFD700]
            font-quicksand font-semibold text-black transition-colors hover:bg-[#ffcd00]
            mt-24 h-12 w-[180px] text-[14px]
            sm:mt-32
            md:text-[16px]
            lg:mt-[400px] lg:h-[50px] lg:w-[200px]
          "
        >
          My Food Tours
        </Link>

        <ul
          ref={ulRef}
          className="
            mt-16 flex gap-8 text-left
            sm:mt-20 sm:gap-12
            lg:mt-[90px] lg:gap-[120px]
          "
        >
          {stats.map((stat) => {
            const count = useCountUp(stat.numeric, 1800, stat.delay, triggered);
            return (
              <li
                key={stat.label}
                className="flex flex-col items-start border-l border-white/70 pl-4 lg:pl-[18px]"
              >
                <span
                  className="
                    font-bold leading-none
                    text-2xl
                    sm:text-3xl
                    lg:text-[32px]
                  "
                >
                  {count}
                  {stat.suffix}
                </span>
                <span
                  className="
                    mt-2 font-bold
                    text-sm
                    sm:text-lg
                    lg:text-[24px]
                  "
                >
                  {stat.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
