"use client";

import { useState, useCallback, useRef } from "react";
import { FadeIn } from "./FadeIn";

const testimonials = [
  {
    quote:
      "Sherry's food tours are an absolute blast, and full of surprises. As someone who has lived in Taiwan for over 16 years, I thought I'd seen it all, but Sherry is a pro at uncovering Taipei's hidden gems. Her infectious energy and deep expertise elevate the experience far beyond a typical food tour; it truly feels like a food experience. I loved getting to meet fellow travelers and share in the fun together as a group. Sherry has a real gift for bringing people and flavors together in the best way. If you're visiting Taiwan, her tours are one of Taipei's best-kept secrets and an absolute must.",
    author: "Chris Hubbard, New York, USA",
    image: "", // Add image URL here
  },
  {
    quote:
      "Sherry was incredibly knowledgeable and passionate, leading us to hidden gems with the most delicious local bites! The portions were generous, the history fascinating and the group vibe so fun! Left stuffed and smiling - highly recommend, a perfect highlight of our trip to Taiwan.",
    author: "Kelley Lee, Madrid, Spain",
    image: "", // Add image URL here
  },
  {
    quote:
      "Sherry's tour was a uniquely crafted experience that nails all Taiwanese classic must eats from my childhood, as well as the best kept secrets that even Taipei locals don't know.  Her knowledge of Taipei goes beyond food, and into the history of the city that makes it a delicous and educational experience for all.  If you're thinking about the best food tour in Taipei don't hesitate and come hungry!",
    author: "J.W. Cheng, San Francisco, USA",
    image: "", // Add image URL here
  },
];

export default function Testimonials() {
  const len = testimonials.length;
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => setCurrent(((index % len) + len) % len),
    [len]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);


  // Touch / swipe
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="testimonials" className="w-full bg-muted text-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 md:py-16 lg:px-20 lg:py-20">
        {/* Heading with decorative arrows + dashed lines */}
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-2 text-sage">
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden className="shrink-0">
              <path d="M8 1l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="h-0 flex-1 border-t border-dashed border-current" />
          </div>
          <h2 className="shrink-0 font-script text-3xl sm:text-4xl lg:text-[48px]">
            Testimonials
          </h2>
          <div className="flex flex-1 items-center gap-2 text-sage">
            <span className="h-0 flex-1 border-t border-dashed border-current" />
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden className="shrink-0">
              <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Carousel */}
        <FadeIn direction="up">
          <div className="relative mt-12">
            {/* Viewport */}
            <div
              className="overflow-hidden rounded-[20px]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <figure
                    key={t.author}
                    className="relative w-full shrink-0 px-8 py-10 lg:px-14 lg:py-12"
                    style={{ backgroundColor: "#A52C17" }}
                  >
                    {/* Decorative quote mark — single " */}
                    <span
                      className="pointer-events-none absolute right-6 top-4 select-none font-serif font-bold leading-none lg:right-10 lg:top-6"
                      style={{ fontSize: "clamp(100px, 14vw, 160px)", color: "rgba(255,255,255,0.15)" }}
                      aria-hidden
                    >
                      &rdquo;
                    </span>

                    <blockquote className="relative z-10 text-base leading-relaxed text-white lg:max-w-[80%] lg:text-lg">
                      {t.quote}
                    </blockquote>

                    {/* Author with avatar placeholder */}
                    <div className="relative z-10 mt-8 flex items-center gap-4">
                      {/* Circular avatar — empty placeholder */}
                      <div className="flex size-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/25 bg-white/15">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.author}
                            className="size-full object-cover"
                          />
                        ) : (
                          <svg
                            viewBox="0 0 52 52"
                            className="size-full"
                            aria-hidden
                          >
                            <circle cx="26" cy="20" r="9" fill="rgba(255,255,255,0.4)" />
                            <path d="M8 46c0-10 8-16 18-16s18 6 18 16" fill="rgba(255,255,255,0.4)" />
                          </svg>
                        )}
                      </div>
                      <figcaption className="text-base font-bold text-white">
                        {t.author}
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>

            {/* Desktop: dots inside card, arrows in carved-out white notch */}
            {/* Dots — inside card, bottom-right, offset from the arrow notch */}
            <div className="absolute bottom-8 right-44 z-20 hidden gap-1.5 lg:flex">
              {testimonials.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 36 : 28,
                    backgroundColor: i === current ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>

            {/* Arrows — white carved-out notch at bottom-right corner */}
            <div className="absolute bottom-0 right-0 z-20 hidden lg:block">
              <div className="flex items-end">
                {/* Curved filler to round the inner top-left corner */}
                <div className="relative h-5 w-5 overflow-hidden">
                  <div
                    className="absolute bottom-0 right-0 size-10 rounded-full"
                    style={{ boxShadow: "5px 5px 0 5px var(--color-muted, #f5f0eb)" }}
                  />
                </div>
                <div className="flex gap-2 rounded-tl-2xl bg-[var(--color-muted,#f5f0eb)] pb-0 pl-5 pt-4">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={prev}
                    className="flex size-12 items-center justify-center rounded-xl bg-[#1a1f36] text-white transition-colors hover:bg-[#2d3452]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={next}
                    className="flex size-12 items-center justify-center rounded-xl bg-[#1a1f36] text-white transition-colors hover:bg-[#2d3452]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Bottom strip — same bg color so arrows sit flush with section bg */}
              <div className="flex h-0 justify-end">
                {/* This keeps the bottom-right card radius clean */}
              </div>
            </div>

            {/* Mobile: arrow left — dots center — arrow right, below the card */}
            <div className="mt-5 flex items-center justify-between lg:hidden">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={prev}
                className="flex size-12 items-center justify-center rounded-xl bg-[#1a1f36] text-white transition-colors hover:bg-[#2d3452]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((t, i) => (
                  <button
                    key={t.author}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 36 : 28,
                      backgroundColor: i === current ? "#A52C17" : "rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={next}
                className="flex size-12 items-center justify-center rounded-xl bg-[#1a1f36] text-white transition-colors hover:bg-[#2d3452]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}