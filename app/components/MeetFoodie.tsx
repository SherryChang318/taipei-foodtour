'use client'
import Image from "next/image";
import { FadeIn } from './FadeIn'

export default function MeetFoodie() {
  return (
    <section id="about" className="w-full bg-muted text-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 md:py-16 lg:px-16 lg:py-20">
        {/* Heading */}
        <div className="flex items-center gap-6">
          {/* Dashed divider with left-pointing arrowhead (matches Figma) */}
          <div className="flex flex-1 items-center text-field">
            <svg
              className="shrink-0"
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 1 L2 6 L8 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="ml-1 h-px flex-1"
              width="100%"
              height="1"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="0.5"
                x2="100%"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="8 6"
              />
            </svg>
          </div>
          <h2 className="shrink-0 font-script text-3xl text-sage sm:text-4xl lg:text-[40px]">
            Meet Your Foodie
          </h2>
        </div>

        {/* Body */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:mt-14 lg:grid-cols-[340px_1fr] lg:gap-14">
          {/* Photo with subtle bottom gradient */}
          <div className="relative mx-auto aspect-[497/532] w-full max-w-[340px] overflow-hidden rounded-[10px]">
            <Image
              src="/images/sherry.png"
              alt="Sherry Chang, your Taipei food guide"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-b from-transparent to-black/40" />
          </div>

          {/* Text */}
          <FadeIn direction="right" delay={0.15}>
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-[38px]">Sherry Chang</h3>
            <p className="mt-5 text-base italic leading-snug lg:mt-6 lg:text-[18px] lg:leading-normal">
              “ Seeing the expressions on people when they discover something they
              love for the first time brings me so much joy!”
            </p>
            <p className="mt-5 text-base leading-relaxed lg:mt-6 lg:text-[18px] lg:leading-normal">
              Unlock the authentic flavours of Taipei with Sherry, your ultimate
              food guide. After years spent hunting down the city&apos;s most
              extraordinary hidden gems, Sherry crafts immersive tours that combine
              deep local expertise, captivating personal anecdotes, vibrant cultural
              stories, and a thrilling spirit of adventure, creating truly memorable
              experiences that go far beyond the typical tourist trail.
            </p>
          </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
