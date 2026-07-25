import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HotTours from "../../components/HotTours";

export const metadata = {
  title: "Ximen Urban Indulgence — Sherry's Food Tour",
  description:
    "Ximen Urban Indulgence: explore the \"Harajuku of Taipei\" after dark — a compact, neon-soaked street-food safari with Sherry's must-eat highlights.",
};

const highlights = [
  `Ay-Chung Flour-Rice Noodles (阿宗麵線): The ultimate rite of passage. Join the energetic crowd standing right on the street to slurp down silky thin noodles swimming in a smoky, bonito-infused gravy topped with chewy, soy-braised pig intestines.`,
  `Tiantian Limei (天天利): A legendary local diner famed for its comforting Lu Rou Fan (braised pork rice). Get it topped with a oozy, fried running egg.`,
  `Crispy Large Fried Chicken (炸雞排): Follow the aroma to massive, golden-fried chicken cutlets that are crispy on the outside and remarkably juicy inside.`,
  `Xing Fu Tang (幸福堂): Wash it all down with their iconic brown sugar boba milk, featuring pearls stir-fried in caramelized brown sugar right before your eyes.`,
];

export default function XimenPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[480px] w-full sm:h-[600px] lg:h-[750px]">
            <Image
              src="/images/ximen.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay (two stacked gradients), exact values from Figma */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(89.5416deg, rgba(0, 0, 0, 0.57) 37.537%, rgba(171, 171, 171, 0.57) 61.956%)",
              }}
            />

            {/* Title block — mirrors Figma's 586×272 block at (116,334) in the
                1440×750 hero. Container queries scale the text (cqw) and the
                arrows (% of block) together, so everything stays proportional. */}
            <div className="@container absolute left-[8%] top-[44.5%] aspect-[586/272] w-[min(586px,80vw)]">
              {/* Top arrow — above/left of the title, pointing down toward it */}
              <Image
                src="/images/arrow-hero-top.svg"
                alt=""
                aria-hidden
                width={212}
                height={67}
                className="pointer-events-none absolute left-[7%] top-[16.3%] h-auto w-[36.2%]"
              />

              <h1 className="absolute left-[7%] top-[44.9%] whitespace-nowrap font-script leading-normal text-white text-[8.19cqw]">
                Ximen Urban Indulgence
              </h1>
              <p className="absolute left-[7%] top-[69.9%] whitespace-nowrap font-script leading-normal text-gold text-[6.83cqw]">
                Hot Tours
              </p>

              {/* Bottom arrow — right of "Hot Tours", pointing left toward it */}
              <Image
                src="/images/arrow-hero-bottom.svg"
                alt=""
                aria-hidden
                width={171}
                height={39}
                className="pointer-events-none absolute left-[64.2%] top-[71.7%] h-auto w-[29.2%]"
              />
            </div>
          </div>
        </section>

        {/* ── Content ────────────────────────────────────────── */}
        <section className="w-full bg-[#f5f5f5] text-black">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 lg:px-[74px] lg:py-[73px]">
            {/* Script heading + dark-red brush stroke */}
            <div className="relative w-fit">
              <h2 className="font-script text-[26px] text-black sm:text-[30px] lg:text-[32px]">
                Taipei&rsquo;s Culinary Heart: Ximen Urban Indulgence
              </h2>
              <Image
                src="/images/ningxia-brushstroke.svg"
                alt=""
                aria-hidden
                width={413}
                height={22}
                className="mt-2 ml-[38%] w-[220px] sm:w-[300px] lg:w-[413px]"
              />
            </div>

            {/* Two-column: text left, food photo right */}
            <div className="mt-9 grid grid-cols-1 gap-10 lg:grid-cols-[850px_418px] lg:gap-9">
              <div className="font-sans text-[18px] leading-[normal] text-black">
                <p>
                  {`Ximending is famously dubbed the "Harajuku of Taipei," but as the sun sets, this historic, neon-soaked pedestrian district transforms into one of the city's most electric evening food hubs. Melding a high-energy youth culture with decades-old culinary heritage, Ximen Night Market offers a compact, thrilling street-food safari right outside the MRT station.`}
                </p>
                <p className="mt-6">
                  {`Instead of a traditional single-street layout, iconic stalls and mobile carts are woven seamlessly into bustling shopping alleys, making every turn a delicious discovery.`}
                </p>
                <p className="mt-6">The Ultimate Ximen Checklist:</p>
                <ul className="mt-6 list-disc space-y-6 pl-6">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-6">
                  {`Ximen is the perfect, vibrant introduction to Taiwan's legendary night market culture.`}
                </p>
              </div>

              {/* Food photo — 418×464, 8px radius per Figma */}
              <div className="relative aspect-[418/464] w-full overflow-hidden rounded-[8px] lg:w-[418px]">
                <Image
                  src="/images/pancake.jpg"
                  alt="Street food at Ximen Night Market"
                  fill
                  sizes="(max-width: 1024px) 100vw, 418px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Action row: back button (left) + centered Book Now */}
            <div className="mt-14 flex items-center">
              <Link
                href="/hot-tours"
                aria-label="Back to Hot Tours"
                className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border border-gold bg-white text-black transition-colors hover:bg-cream"
              >
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden>
                  <path
                    d="M8 1l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <div className="flex flex-1 justify-center">
                <Link
                  href="/booking"
                  className="flex h-[40px] w-[150px] items-center justify-center rounded-[50px] bg-gold font-ui text-[16px] font-semibold text-black transition-colors hover:bg-[#ffcd00]"
                >
                  Book Now
                </Link>
              </div>

              {/* Spacer to keep Book Now optically centered against the back button */}
              <div aria-hidden className="w-[45px] shrink-0" />
            </div>
          </div>
        </section>

        {/* ── Hot Tours carousel (reused, detail variant) ──────── */}
        <HotTours variant="detail" />
      </main>

      <Footer />
    </>
  );
}
