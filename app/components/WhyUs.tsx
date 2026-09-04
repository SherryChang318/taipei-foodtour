import Image from "next/image";

// Icon sources are kept as-is; sizes match the Figma heights (71/75/79/84)
// with each asset's own aspect ratio preserved to avoid distortion.
const features = [
  {
    icon: "/images/why-pin.svg",
    iconW: 50,
    iconH: 71,
    title: "Hidden gems the Taxi Drivers Eat At",
    body: "We skip the busy night market main drags and take you to the hole-in-the-wall stalls, family kitchens, and neighbourhood favourites that only the locals know about",
  },
  {
    icon: "/images/why-guide.png",
    iconW: 75,
    iconH: 75,
    title: "Born-and-Raised Taipei Foodies & Experts",
    body: "We know the back stories, the family histories, and the food debates — because this city is our home, not just our job",
  },
  {
    icon: "/images/why-beer.svg",
    iconW: 101,
    iconH: 79,
    title: "More Bites, More Flavors and More Variety",
    body: "Smaller group sizes mean we can squeeze into spots bigger tours can't. You'll sample 7+ dishes across different neighbourhoods — from Hakka comfort food to modern Taiwanese fusion",
  },
  {
    icon: "/images/why-language.png",
    iconW: 84,
    iconH: 84,
    title: "Language is Never a Barrier",
    body: "We order for you, translate the menus, and chat with the vendors so you get the full story behind every dish — not just the food, but the culture on the plate too!",
  },
];

export default function WhyUs() {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-3 py-14 sm:px-10 md:grid-cols-2 md:py-16 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:items-start lg:gap-8 lg:px-[69px] lg:py-20">
        {/* Intro — left-aligned */}
        <div className="text-center md:text-left md:col-span-2 lg:col-span-1">
          <p className="font-sans text-[18px] font-normal text-black md:text-[22px]">
            THE DIFFERENCE
          </p>
          <h2 className="mt-5 font-sans text-[22px] font-bold leading-[26px] text-black md:text-[24px] md:leading-[25px]">
            Eat Like a Local
            <br />
            Not a Tourist
          </h2>
          <p className="text-center md:text-left mx-auto md:mx-0 mt-2 max-w-[270px] font-sans text-[15px] font-semibold leading-[20px] text-black md:text-[16px]">
            The reasons our guests keep coming back, and bring their friends too!
          </p>
        </div>

        {/* Feature columns */}
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center">
            <div className="flex h-[84px] items-end justify-center">
              <Image
                src={f.icon}
                alt=""
                width={f.iconW}
                height={f.iconH}
                style={{ width: f.iconW, height: f.iconH }}
                className="object-contain"
              />
            </div>
            <h3 className="mt-[11px] w-full max-w-[220px] text-center font-sans text-[15px] font-bold leading-[22px] text-black md:text-[16px] md:leading-[25px]">
              {f.title}
            </h3>
            <p className="mt-[18px] w-full max-w-[220px] text-left font-sans text-[15px] font-normal leading-[24px] text-black md:text-[16px] md:leading-[25px]">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
