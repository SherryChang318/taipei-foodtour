"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Dark-red region icons, used only by the "detail" variant.
const MOON = { src: "/images/icon-moon.svg", alt: "Evening tour", size: 25 };
const SUN = { src: "/images/icon-sun.svg", alt: "Daytime tour", size: 30 };
const GATE = { src: "/images/icon-gate.svg", alt: "Cultural landmarks tour", size: 30 };

const tours = [
  {
    slug: "ningxia",
    image: "/images/ningxia.png",
    title: "Neon Nights: Ningxia",
    body: "Often called the “stomach of Taipei”, Ningxia is a compact, food-focused gem of Taipei’s Datong district.",
    icons: [MOON],
  },
  {
    slug: "ximen",
    image: "/images/ximen.png",
    title: "Ximen Urban Indulgence",
    body: "Also known as the “Harajuku of Taipei”, Ximen offers Taiwanese street food, comfort classics and trendy treats. The area comes alive especially at night so it’s the perfect place for grazing and people watching.",
    icons: [MOON],
  },
  {
    slug: "dadaocheng",
    image: "/images/dadaocheng.png",
    title: "Flavors of Dadaocheng",
    body: "Discover Taipei’s oldest district centered around historic Dihua street as it is the perfect blend of 19th century architecture and a very vibrant food scene.",
    icons: [GATE, SUN, MOON],
  },
];

type Variant = "default" | "detail";

const GAP = 20;
const LEN = tours.length;

function TourCard({
  tour,
  variant = "default",
}: {
  tour: (typeof tours)[number];
  variant?: Variant;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <Link href={`/hot-tours/${tour.slug}`}>
        <div className="relative aspect-[421/382] w-full overflow-hidden rounded-[12px] cursor-pointer">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>
      <Link href={`/hot-tours/${tour.slug}`}>
        <h3 className="mt-[27px] line-clamp-2 text-center font-sans text-[18px] font-semibold md:text-[20px] cursor-pointer">
          {tour.title}
        </h3>
      </Link>
      <p className="mt-[14px] line-clamp-3 flex-1 font-sans text-[14px] leading-[22px] md:text-[16px] md:leading-[24px]">
        {tour.body}
      </p>

      {variant === "detail" ? (
        // Detail pages: "Read More" link + per-card dark-red region icons
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/hot-tours/${tour.slug}`}
            className="group flex items-center gap-2 font-quicksand text-[14px] font-semibold text-black transition-opacity hover:opacity-70 md:text-[16px]"
          >
            Read More
            <svg
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              aria-hidden
              className="shrink-0 transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M1 7h18M14 1.5 20 7l-6 5.5"
                stroke="#ffd700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            {tour.icons.map((icon) => (
              <Image
                key={icon.src}
                src={icon.src}
                alt={icon.alt}
                width={icon.size}
                height={icon.size}
                style={{ width: icon.size, height: icon.size }}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      ) : (
        <Link
          href="/booking"
          className="mx-auto mt-6 flex h-[40px] w-[150px] items-center justify-center rounded-[50px] bg-gold font-quicksand text-[14px] font-semibold text-black transition-colors hover:bg-[#ffcd00] md:text-[16px]"
        >
          Book Now
        </Link>
      )}
    </div>
  );
}

/** Faint round nav arrow used by both carousels. */
function NavArrow({
  dir,
  onClick,
  style,
  className = "",
}: {
  dir: "prev" | "next";
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous tours" : "Next tours"}
      onClick={onClick}
      style={style}
      className={`flex size-[60px] items-center justify-center rounded-full bg-white/70 text-3xl leading-none text-sage shadow-md ring-1 ring-black/5 transition-colors hover:bg-white ${className}`}
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

export default function HotTours({ variant = "default" }: { variant?: Variant } = {}) {
  // Desktop: rotating 3-up carousel built on a 3x-duplicated track.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [index, setIndex] = useState(LEN); // start in the middle copy
  const [animate, setAnimate] = useState(true);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.offsetWidth ?? 0;
      if (w) setCardW((w - GAP * 2) / 3);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const slides = [...tours, ...tours, ...tours];
  const step = cardW + GAP;
  const imgCenter = cardW ? (cardW * 382) / 421 / 2 : 190;

  const go = (dir: number) => {
    if (sliding) return;
    setSliding(true);
    setAnimate(true);
    setIndex((i) => i + dir);
  };

  const handleRest = () => {
    setSliding(false);
    if (index >= 2 * LEN || index < LEN) {
      setAnimate(false);
      setIndex(LEN + (((index - LEN) % LEN) + LEN) % LEN);
    }
  };

  // Mobile: simple one-card carousel.
  const [mIndex, setMIndex] = useState(0);
  const mPrev = () => setMIndex((i) => (i === 0 ? LEN - 1 : i - 1));
  const mNext = () => setMIndex((i) => (i === LEN - 1 ? 0 : i + 1));

  return (
    <section id="tours" className="w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 md:py-16 lg:px-[71px] lg:py-20">
        {/* Heading + dashed arrow line */}
        <div className="flex items-center gap-6">
          <h2 className="shrink-0 font-script text-[32px] text-sage md:text-[40px]">
            Hot Tours
          </h2>
          <div className="flex flex-1 items-center gap-2 text-sage">
            <span className="h-0 flex-1 border-t border-dashed border-current" />
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              aria-hidden
              className="shrink-0"
            >
              <path
                d="M1 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Desktop rotating carousel */}
        <div className="relative mt-8 hidden md:block">
          <div ref={wrapRef} className="overflow-hidden">
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${index * step}px)`,
                transition: animate ? "transform 0.45s ease" : "none",
              }}
              onTransitionEnd={handleRest}
            >
              {slides.map((t, i) => (
                <div key={i} style={{ width: cardW || undefined }} className="shrink-0">
                  <TourCard tour={t} variant={variant} />
                </div>
              ))}
            </div>
          </div>

          <NavArrow
            dir="prev"
            onClick={() => go(-1)}
            style={{ top: imgCenter }}
            className="absolute left-0 -translate-x-1/2 -translate-y-1/2"
          />
          <NavArrow
            dir="next"
            onClick={() => go(1)}
            style={{ top: imgCenter }}
            className="absolute right-0 translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Mobile carousel (single column, < 768px) */}
        <div className="mt-8 md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${mIndex * 100}%)` }}
            >
              {tours.map((t) => (
                <div key={t.title} className="w-full shrink-0 px-0.5">
                  <TourCard tour={t} variant={variant} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={mPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/30 text-2xl leading-none transition-colors hover:bg-black/5"
            >
              &#8249;
            </button>
            <div className="flex gap-2">
              {tours.map((t, i) => (
                <button
                  key={t.title}
                  type="button"
                  aria-label={`Go to tour ${i + 1}`}
                  onClick={() => setMIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === mIndex ? "bg-gold" : "bg-black/25"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next tour"
              onClick={mNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/30 text-2xl leading-none transition-colors hover:bg-black/5"
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-6">
          {/* More Food Tour */}
          <Link href="/hot-tours" className="shrink-0">
            <span className="flex items-center gap-2 font-script text-[18px] text-sage md:text-[20px]">
              More Food Tours
              <span aria-hidden className="text-[18px] md:text-[20px]">
                &#8250;
              </span>
            </span>
            <Image
              src="/images/foodtour-squiggle.svg"
              alt=""
              width={189}
              height={16}
              className="mt-1 w-[189px]"
            />
          </Link>

          {/* Day tour note + link */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <span className="font-sans text-[16px] font-semibold leading-tight md:leading-[40px] md:text-[20px]">
              We also offer Day Tours and Customized Tours
            </span>
            <a href={variant === "detail" ? "/" : "#"} className="flex items-center gap-2">
              <Image
                src="/images/icon-menu-red.svg"
                alt="Menu"
                width={25}
                height={25}
                className="h-[25px] w-[25px]"
              />
              <span className="font-quicksand text-[18px] font-semibold text-[#a52c17] md:text-[20px]">
                Go to Day Tour
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
