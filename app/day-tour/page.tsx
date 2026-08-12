import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Day Tours Coming Soon — Sherry's Food Tour",
  description:
    "Discover Taiwan by daylight with Sherry's upcoming day tours. Explore culture, nature, and authentic experiences.",
};

export default function DayTourPage() {
  return (
    <main className="flex-1">
        {/* ── Hero Section ────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-[#e8e8e8]">
          <div className="relative h-[500px] w-full sm:h-[650px] lg:h-[1082px]">
            <Image
              src="/images/day-tour-hero.png"
              alt="Taiwan day tour scenic landscape"
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)",
              }}
            />

            {/* Hamburger Menu - Top Left */}
            <button className="absolute left-[43px] top-[42px] z-10 w-20 h-14 hover:opacity-70 transition-opacity">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full stroke-white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Main Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10">
              <h1 className="font-script text-center text-white text-3xl sm:text-4xl lg:text-6xl leading-tight lg:text-[48px]">
                Day Tour Page is coming soon!
              </h1>
              <p className="mt-4 text-center text-[#dec9ad] text-xl sm:text-2xl lg:text-[32px] font-script">
                Explore the best of Taiwan
              </p>
            </div>

            {/* Affiliated Logo - Bottom Right */}
            <Link href="/" className="absolute bottom-6 right-6 w-28 h-28 sm:w-32 sm:h-32 lg:bottom-16 lg:right-20 lg:w-44 lg:h-44 hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="Affiliated brand"
                fill
                className="object-contain"
              />
            </Link>

            {/* Affiliated Text */}
            <p className="absolute bottom-32 right-6 sm:bottom-36 sm:right-10 lg:bottom-64 lg:right-56 text-white text-sm sm:text-base lg:text-xl italic font-sans">
              Affiliated with
            </p>
          </div>
        </section>

        {/* ── What's Coming Section ────────────────────────────── */}
        <section className="w-full bg-[#f3ece3] text-black">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 lg:px-20 lg:py-24">
            <h2 className="text-center text-[#1b1b1b] text-lg sm:text-xl lg:text-2xl font-bold font-sans mb-8 sm:mb-10 lg:mb-16 uppercase tracking-wide">
              What's Coming
            </h2>

            {/* Card 1: Culture */}
            <div className="mb-8 rounded-3xl overflow-hidden bg-[#c0c3bf] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              <div className="w-full lg:w-[440px] h-64 sm:h-72 lg:h-[340px] rounded-2xl lg:rounded-3xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/culture.png"
                  alt="Uncover Taiwan's Soul"
                  width={440}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl lg:text-2xl font-semibold font-sans text-black mb-3">
                  Uncover Taiwan's Soul
                </h3>
                <p className="text-lg sm:text-xl lg:text-xl italic font-sans text-black mb-4">
                  Timeless Heritage & Traditions
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-sans text-black leading-relaxed">
                  Immerse yourself in centuries of history, vibrant night markets, and sacred temple traditions. From historic old streets to local artisan craft workshops, experience the rich heritage and warm hospitality that make Taiwan's cultural tapestry truly unforgettable.
                </p>
              </div>
            </div>

            {/* Card 2: Nature */}
            <div className="mb-8 rounded-3xl overflow-hidden bg-[#a4a8a2] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              <div className="w-full lg:w-[440px] h-64 sm:h-72 lg:h-[340px] rounded-2xl lg:rounded-3xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/nature.png"
                  alt="Explore Raw Natural Beauty"
                  width={440}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl lg:text-2xl font-semibold font-sans text-black mb-3">
                  Explore Raw Natural Beauty
                </h3>
                <p className="text-lg sm:text-xl lg:text-xl italic font-sans text-black mb-4">
                  Breathtaking Wild Taiwan
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-sans text-black leading-relaxed">
                  Escape into breathtaking landscapes, from dramatic coastal cliffs and serene alpine tea plantations to lush subtropical forests. Discover hidden waterfalls, relaxing hot springs, and iconic mountain trails guided by local experts who know the island's wilderness best.
                </p>
              </div>
            </div>

            {/* Card 3: Private */}
            <div className="rounded-3xl overflow-hidden bg-[#6c7269] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              <div className="w-full lg:w-[440px] h-64 sm:h-72 lg:h-[340px] rounded-2xl lg:rounded-3xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/private.png"
                  alt="Tailor Your Ultimate Journey"
                  width={440}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl lg:text-2xl font-semibold font-sans text-white mb-3">
                  Tailor Your Ultimate Journey
                </h3>
                <p className="text-lg sm:text-xl lg:text-xl italic font-sans text-white mb-4">
                  Your trip, your pace, your unforgettable Taiwan experience
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-sans text-white leading-relaxed">
                  Your trip, your pace. Craft a completely personalized itinerary designed around your unique interests, schedule, and travel style. Enjoy dedicated private transportation, handpicked experiences, and seamless luxury from the moment you arrive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Discover Section ────────────────────────────────── */}
        <section className="w-full bg-[#50574c] text-white">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
            <h2 className="font-script text-[#dec9ad] text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8 sm:mb-12 lg:mb-16">
              Discover Taiwan by daylight
            </h2>

            <p className="text-lg sm:text-xl lg:text-xl font-sans leading-relaxed mb-12 lg:mb-16">
              Our food and culture day tours are built around one idea: the best experiences happen when a local takes you somewhere they actually love. We're finalising the routes now — sign up to be the first to book.
            </p>

            {/* Early Access Section */}
            <div className="mb-16">
              <h3 className="text-2xl sm:text-3xl lg:text-3xl font-sans font-normal mb-8 uppercase tracking-wide">
                Get Early Access
              </h3>

              {/* Email Input */}
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Your@email.com"
                  className="w-full px-6 sm:px-8 py-4 sm:py-6 text-xl sm:text-2xl lg:text-xl font-sans text-black bg-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                  required
                />
              </div>

              {/* Notify Button */}
              <button className="w-full px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl lg:text-xl font-sans text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                Notify me when Day Tours launch
              </button>
            </div>

            {/* Please Reach Out Section */}
            <div className="pt-12 lg:pt-16 flex justify-end">
              <div className="flex flex-col items-start">

                {/* 上方 squiggle：對齊 "Please" 文字左側 */}
                <div className="relative h-6 w-56 mb-1">
                  <Image
                    src="/images/ningxia-brushstroke.svg"
                    alt=""
                    fill
                    className="object-contain object-left"
                  />
                </div>

                {/* 文字 + Button 同一行 */}
                <div className="flex items-center gap-6 lg:gap-8">
                  <p className="text-lg sm:text-xl lg:text-2xl text-white"
                     style={{ fontFamily: "var(--font-gveret-levin)", fontStyle: "italic" }}>
                    Please reach out for detailed pricing and itinerary
                  </p>
                  <div
                    className="px-8 sm:px-10 py-2 sm:py-3 text-black font-semibold text-lg sm:text-xl rounded-full hover:opacity-90 whitespace-nowrap cursor-pointer transition-colors duration-300"
                    style={{ backgroundColor: "#ffd700" }}
                  >
                    Book Now
                  </div>
                </div>

                {/* 下方 squiggle：距文字下方 mt-4，靠右對齊 */}
                <div className="relative h-6 w-56 mt-4 self-end">
                  <Image
                    src="/images/ningxia-brushstroke.svg"
                    alt=""
                    fill
                    className="object-contain object-right"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Footer Section ────────────────────────────────────── */}
        <footer className="w-full bg-[#50574c]">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 lg:px-20">
            {/* Divider Line */}
            <div className="mb-12 h-px bg-white/50" />

            {/* Footer Content */}
            <div className="grid grid-cols-3 gap-12 items-center">
              {/* Left: Food Tour & About Sherry */}
              <div className="text-white flex flex-row gap-x-6 items-center">
                <Link href="/#tours" className="text-xl font-sans font-normal hover:opacity-70 transition-opacity">
                  Food Tour
                </Link>
                <Link href="/#about" className="text-xl font-sans font-normal hover:opacity-70 transition-opacity">
                  About Sherry
                </Link>
              </div>

              {/* Center: Logo & Affiliated */}
              <div className="text-center flex flex-col items-center gap-0">
                <Link href="/">
                  <div className="w-32 h-32">
                    <Image
                      src="/images/logo.png"
                      alt="Sherry's Food Tour"
                      width={132}
                      height={132}
                      className="object-contain"
                    />
                  </div>
                </Link>
                <p className="text-white text-sm italic font-sans">Affiliated with</p>
              </div>

              {/* Right: Social Icons */}
              <div className="flex justify-end gap-6 items-center">
                <a href="https://www.instagram.com/sherrychang318/" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
                  <Image src="/images/icon-instagram.svg" alt="Instagram" width={24} height={24} />
                </a>
                <a href="mailto:sherrychang318@gmail.com" className="text-white hover:opacity-70 transition-opacity">
                  <Image src="/images/icon-email.svg" alt="Email" width={28} height={22} />
                </a>
                <a href="https://wa.me/886975724127" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
                  <Image src="/images/icon-whatsapp.svg" alt="WhatsApp" width={28} height={28} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    );
  }
