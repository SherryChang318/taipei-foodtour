import Image from "next/image";
import Link from "next/link";

export type TourIcon = {
  src: string;
  alt: string;
  /** Rendered size in px (square), matching the Figma icon dimensions. */
  size: number;
};

export type Tour = {
  slug: string;
  image: string;
  title: string;
  description: string;
  icons: TourIcon[];
};

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="flex h-full flex-col transition-transform duration-300 hover:-translate-y-1.5">
      {/* Image — 415×420, 12px radius per Figma */}
      <div className="group relative aspect-[415/420] w-full overflow-hidden rounded-[12px]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title — Open Sans SemiBold 20px */}
      <h3 className="mt-[41px] font-sans text-[20px] font-semibold text-black">
        {tour.title}
      </h3>

      {/* Body — Open Sans Regular 16px / 26px */}
      <p className="mt-[22px] font-sans text-[16px] leading-[26px] text-black">
        {tour.description}
      </p>

      {/* Bottom row: Read More (+ yellow arrow) | region icons */}
      <div className="mt-auto flex items-center justify-between pt-8">
        <Link
          href={`/hot-tours/${tour.slug}`}
          className="group flex items-center gap-2 font-quicksand text-[16px] font-semibold text-black transition-opacity hover:opacity-70"
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
    </article>
  );
}
