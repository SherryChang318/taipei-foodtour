"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "Sherry's food tours are an absolute blast, and full of surprises. As someone who has lived in Taiwan for over 16 years, I thought I'd seen it all, but Sherry is a pro at uncovering Taipei's hidden gems. Her infectious energy and deep expertise elevate the experience far beyond a typical food tour; it truly feels like a food experience. I loved getting to meet fellow travelers and share in the fun together as a group. Sherry has a real gift for bringing people and flavors together in the best way. If you're visiting Taiwan, her tours are one of Taipei's best-kept secrets and an absolute must.",
    author: "Chris Hubbard, New York, USA",
  },
  {
    quote:
      "Sherry was incredibly knowledgeable and passionate, leading us to hidden gems with the most delicious local bites! The portions were generous, the history fascinating and the group vibe so fun! Left stuffed and smiling - highly recommend, a perfect highlight of our trip to Taiwan.",
    author: "Kelley Lee, Madrid, Spain",
  },
  {
    quote:
      "Sherry's tour was a uniquely crafted experience that nails all Taiwanese classic must eats from my childhood, as well as the best kept secrets that even Taipei locals don't know.  Her knowledge of Taipei goes beyond food, and into the history of the city that makes it a delicous and educational experience for all.  If you're thinking about the best food tour in Taipei don't hesitate and come hungry!",
    author: "J.W. Cheng, San Francisco, USA",
  },
];

function Stars() {
  return (
    <div className="mt-3 flex gap-1" aria-label="5 out of 5 stars" style={{ color: "#A52C17" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Card({
  t,
  variant,
}: {
  t: (typeof testimonials)[number];
  variant: "center" | "side";
}) {
  const isCenter = variant === "center";
  return (
    <figure
      className={`flex flex-col overflow-hidden rounded-[10px] bg-[#d9d9d9] p-7 lg:p-8 ${
        isCenter ? "lg:h-[500px]" : "lg:h-[380px] lg:opacity-70"
      }`}
    >
      <blockquote className="flex-1 overflow-hidden text-base leading-relaxed lg:text-[16px] lg:leading-[24px]">
        {t.quote}
      </blockquote>
      <div className="mt-4 shrink-0">
        <figcaption className="text-base font-bold lg:text-[16px]">
          {t.author}
        </figcaption>
        <Stars />
      </div>
    </figure>
  );
}

export default function Testimonials() {
  const len = testimonials.length;
  const [center, setCenter] = useState(1);

  const leftIdx = (center - 1 + len) % len;
  const rightIdx = (center + 1) % len;
  const prev = () => setCenter((c) => (c - 1 + len) % len);
  const next = () => setCenter((c) => (c + 1) % len);

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

        {/* Desktop: three cards always visible, middle larger */}
        <div className="relative">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="hidden lg:flex absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 size-[60px] items-center justify-center rounded-full bg-white/70 text-3xl leading-none text-sage shadow-md ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            &#8249;
          </button>

          <div className="mt-12 hidden items-center gap-6 lg:grid lg:grid-cols-3">
            <Card t={testimonials[leftIdx]} variant="side" />
            <Card t={testimonials[center]} variant="center" />
            <Card t={testimonials[rightIdx]} variant="side" />
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="hidden lg:flex absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 size-[60px] items-center justify-center rounded-full bg-white/70 text-3xl leading-none text-sage shadow-md ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            &#8250;
          </button>

          {/* Mobile / tablet: single centered card with dots and arrows */}
          <div className="mt-10 lg:hidden">
          <Card t={testimonials[center]} variant="center" />
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className="flex size-[60px] items-center justify-center rounded-full bg-white/70 text-3xl leading-none text-sage shadow-md ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              &#8249;
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setCenter(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === center ? "bg-sage" : "bg-black/25"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className="flex size-[60px] items-center justify-center rounded-full bg-white/70 text-3xl leading-none text-sage shadow-md ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              &#8250;
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
