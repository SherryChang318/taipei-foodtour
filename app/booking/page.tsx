"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ObfuscatedEmail from "../components/ObfuscatedEmail";

/* ------------------------------------------------------------------ */
/*  Content — read VERBATIM from Figma (Hi-fi prototype page)          */
/*  Intro-Dadaocheng (in Booking_calendar), Intro-Ningxia,            */
/*  Intro-Ximen, Important-note frames.                               */
/* ------------------------------------------------------------------ */

const DURATION = "Average 2 to 3 hours, depending on the pace of the group";

type Tour = {
  /** dropdown label (drives selection + Booking Summary) */
  value: string;
  /** tour detail page slug — /hot-tours/<slug> */
  slug: string;
  /** Introduction tab heading */
  heading: string;
  /** Introduction tab paragraphs */
  paragraphs: string[];
};

const TOURS: Tour[] = [
  {
    value: "Flavors of Dadaocheng",
    slug: "dadaocheng",
    heading: "Flavors of Dadaocheng",
    paragraphs: [
      "If Ximen is Taipei’s neon-drenched future, Dadaocheng is its beautifully preserved heart. Nestled along the Tamsui River, this historic merchant district perfectly fuses century-old heritage with a thriving modern creative scene. Walking down Dihua Street, the air is thick with the nostalgic aromas of roasted tea leaves , Chinese medicinal herbs, and dried seafood. For a food tour, Dadaocheng offers a completely unique experience: the chance to taste authentic, slow-cooked Taiwanese comfort food exactly as it tasted generations ago.",
      "While the historic shophouses now host trendy espresso bars, the area’s legendary culinary anchors remain untouched, drawing local foodies every morning and afternoon.",
    ],
  },
  {
    value: "Neon Nights: Ningxia",
    slug: "ningxia",
    heading: "Taipei’s Culinary Heart: Ningxia Night Market",
    paragraphs: [
      "Nicknamed “Taipei’s Stomach,” Ningxia Night Market is a dream come true for first-time travelers seeking an authentic taste of Taiwan. Unlike sprawling, chaotic markets, Ningxia packs over 140 stalls into one straight, easy-to-navigate street. It is highly favored by locals for its historic charm and an impressive density of Michelin Bib Gourmand-recognized street food.",
    ],
  },
  {
    value: "Ximen Urban Indulgence",
    slug: "ximen",
    heading: "Taipei’s Culinary Heart: Ximen Urban Indulgence",
    paragraphs: [
      "Ximending is famously dubbed the “Harajuku of Taipei,” but as the sun sets, this historic, neon-soaked pedestrian district transforms into one of the city’s most electric evening food hubs. Melding a high-energy youth culture with decades-old culinary heritage, Ximen Night Market offers a compact, thrilling street-food safari right outside the MRT station.",
      "Instead of a traditional single-street layout, iconic stalls and mobile carts are woven seamlessly into bustling shopping alleys, making every turn a delicious discovery.",
    ],
  },
];

/* Photo pool for the right-column photo block (all in public/images). */
const PHOTO_POOL = [
  "/images/dadaocheng.png",
  "/images/ice-cream.jpg",
  "/images/street-stall.jpg",
  "/images/pancake.jpg",
  "/images/douhua.png",
  "/images/bun.png",
];

const TIMES = ["11:00", "19:00"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ------------------------------------------------------------------ */
/*  Small icons                                                        */
/* ------------------------------------------------------------------ */

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden className={className}>
      <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Yellow squiggle-style underline under a section label (Figma: gold #FFD700). */
function LabelUnderline() {
  return <span aria-hidden className="mt-2 block h-[3px] w-[50px] rounded-full bg-gold" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="font-work text-[18px] font-bold leading-none text-black">{children}</p>
      <LabelUnderline />
    </div>
  );
}

/* Red circular −/+ counter control. */
function Stepper({
  count,
  onDec,
  onInc,
  label,
}: {
  count: number;
  onDec: () => void;
  onInc: () => void;
  label: string;
}) {
  const btn =
    "flex h-[25px] w-[25px] items-center justify-center rounded-full border border-[#a52c17] text-[#a52c17] transition-colors hover:bg-[#a52c17]/10 disabled:opacity-40";
  return (
    <div className="flex items-center gap-4">
      <button type="button" aria-label={`Remove ${label}`} onClick={onDec} disabled={count <= 0} className={btn}>
        <svg width="11" height="2" viewBox="0 0 11 2" aria-hidden><path d="M0 1h11" stroke="currentColor" strokeWidth="2" /></svg>
      </button>
      <span className="w-4 text-center text-[18px] text-black">{count}</span>
      <button type="button" aria-label={`Add ${label}`} onClick={onInc} className={btn}>
        <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
          <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function BookingPage() {
  const router = useRouter();

  const [tourValue, setTourValue] = useState(TOURS[0].value);
  const [adults, setAdults] = useState(1); // Adult/Child, age 5+ ($80 each)
  const [childrenFree, setChildrenFree] = useState(0); // Child (free), under 5
  const [time, setTime] = useState<string | null>(null);
  const [tab, setTab] = useState<"intro" | "note">("intro");
  const [attempted, setAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [message, setMessage] = useState("");

  const selectedTour = TOURS.find((t) => t.value === tourValue)!;

  /* ---- Calendar state ---- */
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const atCurrentMonth = view.y === today.getFullYear() && view.m === today.getMonth();

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const startWeekday = (first.getDay() + 6) % 7; // Mon-first index
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const prevMonthDays = new Date(view.y, view.m, 0).getDate();
    const total = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

    return Array.from({ length: total }, (_, i) => {
      const dayNum = i - startWeekday + 1;
      if (dayNum < 1) return { key: `p${i}`, label: prevMonthDays + dayNum, date: null as Date | null, selectable: false };
      if (dayNum > daysInMonth) return { key: `n${i}`, label: dayNum - daysInMonth, date: null as Date | null, selectable: false };
      const date = new Date(view.y, view.m, dayNum);
      return { key: `d${dayNum}`, label: dayNum, date, selectable: date >= today };
    });
  }, [view, today]);

  // Month dropdown: current month + next 11 months.
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
        return { y: d.getFullYear(), m: d.getMonth(), label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` };
      }),
    [today],
  );

  /* ---- Photo block: randomize client-side after mount (avoid SSR mismatch) ---- */
  const [photos, setPhotos] = useState<string[] | null>(null);
  useEffect(() => {
    const shuffled = [...PHOTO_POOL].sort(() => Math.random() - 0.5);
    setPhotos(shuffled.slice(0, 3));
  }, []);

  /* ---- Derived summary ---- */
  const total = adults * 2500;
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : null;
  const canSubmit = Boolean(selectedDate) && Boolean(time) && Boolean(guestName.trim()) && Boolean(guestEmail.trim());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) {
      setAttempted(true);
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tour: tourValue,
          adults,
          childrenFree,
          date: formattedDate ?? "",
          time: time ?? "",
          total,
          guestName,
          guestEmail,
          guestPhone,
          message,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to process booking");
      }

      window.dataLayer?.push({
        event: "booking_form_submit",
        tour_name: tourValue,
        adults: adults,
        children_free: childrenFree,
        selected_date: formattedDate ?? "",
        selected_time: time ?? "",
        total_value: total,
      });
      const params = new URLSearchParams({
        tour: tourValue,
        date: formattedDate ?? "",
        time: time ?? "",
        adults: String(adults),
        children: String(childrenFree),
        total: String(total),
      });
      router.push(`/booking/confirmation?${params.toString()}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative h-[220px] w-full overflow-hidden md:h-[262px]">
        <Image src="/images/Booking_form_page.jpg" alt="" fill priority className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full items-center justify-center px-4">
          <h1 className="font-script text-[40px] text-cream md:text-[52px]">Book a Tour</h1>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto w-full max-w-[1320px] px-6 py-12 sm:px-10 lg:px-[70px] lg:py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- LEFT: booking form ---------------- */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {/* Choose Hot Tour */}
            <div>
              <SectionLabel>Choose Hot Tour</SectionLabel>
              <div className="relative mt-6 max-w-[530px]">
                <select
                  aria-label="Choose Hot Tour"
                  value={tourValue}
                  onChange={(e) => setTourValue(e.target.value)}
                  className="h-[49px] w-full appearance-none rounded-[10px] border border-black bg-white pl-[17px] pr-10 text-[16px] text-black outline-none focus:ring-2 focus:ring-gold"
                >
                  {TOURS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.value}
                    </option>
                  ))}
                </select>
                <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black" />
              </div>
            </div>

            {/* Participants */}
            <div>
              <SectionLabel>Participants</SectionLabel>
              <div className="mt-6 flex max-w-[400px] flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-work text-[18px] font-medium text-black">Adult/Child</p>
                    <p className="text-[10px] text-black">Age 5+ yrs</p>
                  </div>
                  <Stepper
                    label="adult"
                    count={adults}
                    onDec={() => setAdults((n) => Math.max(0, n - 1))}
                    onInc={() => setAdults((n) => n + 1)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-work text-[18px] font-medium text-black">Child (free)</p>
                    <p className="text-[10px] text-black">Age under 5 yrs</p>
                  </div>
                  <Stepper
                    label="child"
                    count={childrenFree}
                    onDec={() => setChildrenFree((n) => Math.max(0, n - 1))}
                    onInc={() => setChildrenFree((n) => n + 1)}
                  />
                </div>
              </div>
            </div>

            {/* Choose a date */}
            <div>
              <SectionLabel>Choose a date</SectionLabel>

              <div className="mt-6 max-w-[552px]">
                {/* Month header */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Previous month"
                    disabled={atCurrentMonth}
                    onClick={() => setView((v) => ({ ...(v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }) }))}
                    className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-gold text-black transition-colors enabled:hover:bg-gold disabled:opacity-30"
                  >
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden><path d="M7 1L2 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>

                  <div className="relative flex items-center gap-1">
                    <span className="font-sans text-[16px] font-bold text-black">
                      {MONTH_NAMES[view.m]} {view.y}
                    </span>
                    <Chevron className="text-black" />
                    <select
                      aria-label="Jump to month"
                      value={`${view.y}-${view.m}`}
                      onChange={(e) => {
                        const [y, m] = e.target.value.split("-").map(Number);
                        setView({ y, m });
                      }}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    >
                      {monthOptions.map((o) => (
                        <option key={`${o.y}-${o.m}`} value={`${o.y}-${o.m}`}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }))}
                    className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-gold text-black transition-colors hover:bg-gold"
                  >
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>

                {/* Weekday row */}
                <div className="mt-6 grid grid-cols-7 place-items-center">
                  {WEEKDAYS.map((d) => (
                    <span key={d} className="text-[13px] text-[#888780]">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Dates */}
                <div className="mt-2 grid grid-cols-7 place-items-center gap-y-2">
                  {cells.map((cell) => {
                    const isSelected = cell.date && selectedDate && sameDay(cell.date, selectedDate);
                    return (
                      <button
                        key={cell.key}
                        type="button"
                        disabled={!cell.selectable}
                        onClick={() => cell.date && setSelectedDate(cell.date)}
                        className="flex h-[44px] w-full items-center justify-center"
                      >
                        <span
                          className={[
                            "flex h-[38px] w-[38px] items-center justify-center rounded-full text-[15px] transition-colors",
                            isSelected
                              ? "bg-gold text-black"
                              : cell.selectable
                                ? "text-black hover:bg-gold/25 cursor-pointer"
                                : "text-[#949494] cursor-default",
                          ].join(" ")}
                        >
                          {cell.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Choose a time */}
            <div>
              <div className="flex items-center gap-2 text-black">
                <ClockIcon />
                <span className="font-sans text-[16px] font-semibold">Choose a time</span>
              </div>
              <div className="mt-4 flex gap-6">
                {TIMES.map((t) => {
                  const active = time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={[
                        "flex h-[39px] w-[136px] items-center justify-center gap-2 rounded-[10px] border border-gold text-[18px] text-black transition-colors",
                        active ? "bg-gold" : "bg-white",
                      ].join(" ")}
                    >
                      <ClockIcon />
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Booking Summary */}
            <div>
              <SectionLabel>Booking Summary</SectionLabel>
              <div className="mt-6 flex min-h-[222px] max-w-[552px] flex-col justify-between rounded-[20px] border border-[#ababab] px-[30px] py-[27px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="flex justify-between gap-4">
                  <p className="font-sans text-[20px] font-bold text-[#a52c17]">{tourValue}</p>
                  <div className="text-right">
                    <p className="font-work text-[20px] font-semibold text-[#a52c17]">{formattedDate ?? "—"}</p>
                    <p className="mt-1 font-work text-[18px] font-semibold text-[#a52c17]">{time ?? "—"}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-work text-[18px] text-black">Child: {childrenFree}</p>
                    <p className="font-work text-[18px] text-black">Adult: {adults} x $2,500</p>
                  </div>
                  <p className="font-work text-[18px] font-bold text-black">Total: NTD${total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div>
              <SectionLabel>Guest Information</SectionLabel>
              <div className="mt-6 flex max-w-[552px] flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="font-work text-[16px] font-medium text-black">Full Name</span>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="h-[49px] w-full rounded-[10px] border border-black bg-white px-4 text-[16px] text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-work text-[16px] font-medium text-black">Email Address</span>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="h-[49px] w-full rounded-[10px] border border-black bg-white px-4 text-[16px] text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-work text-[16px] font-medium text-black">Phone Number (Optional)</span>
                  <input
                    type="tel"
                    placeholder="+886 912345678"
                    className="h-[49px] w-full rounded-[10px] border border-black bg-white px-4 text-[16px] text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-work text-[16px] font-medium text-black">
                    Message <span className="font-normal text-[#ababab]">(Optional)</span>
                  </span>
                  <textarea
                    rows={4}
                    placeholder="*Please include dietary requirements and numbers of children if any"
                    className="w-full resize-none rounded-[10px] border border-black bg-white px-4 py-3 text-[16px] text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="h-[56px] w-full max-w-[551px] rounded-[20px] bg-gold font-ui text-[16px] font-semibold text-black transition-colors hover:bg-[#ffcd00] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canSubmit || isLoading}
              >
                {isLoading ? "Processing..." : "Submit"}
              </button>
              {submitError && (
                <p className="mt-3 text-[14px] text-red-400 bg-red-950/30 rounded px-3 py-2">{submitError}</p>
              )}
              {attempted && !canSubmit && !submitError && (
                <p className="mt-3 text-[14px] text-[#a52c17]">Please fill in all required fields to continue.</p>
              )}
            </div>
          </form>

          {/* ---------------- RIGHT: tour info ---------------- */}
          <div>
            {/* Tabs */}
            <div className="relative flex items-center gap-16 border-b border-[#e6e6e6] pl-6 sm:pl-16">
              {([
                ["intro", "Introduction"],
                ["note", "Important Note"],
              ] as const).map(([key, label]) => {
                const active = tab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={[
                      "relative pb-3 text-[18px] font-semibold transition-colors",
                      active ? "text-black" : "text-[#ababab]",
                    ].join(" ")}
                  >
                    {label}
                    {active && <span aria-hidden className="absolute -bottom-px left-0 h-[2px] w-full bg-gold" />}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="mt-8 px-1 sm:px-2">
              {tab === "intro" ? (
                <div>
                  <h2 className="font-sans text-[18px] font-semibold text-black">
                    <Link
                      href={`/hot-tours/${selectedTour.slug}`}
                      className="hover:underline underline-offset-2"
                    >
                      {selectedTour.heading}
                    </Link>
                  </h2>
                  <div className="mt-5 space-y-4 text-[16px] leading-normal text-black">
                    {selectedTour.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className="mt-6 text-[16px] text-black">
                    <span className="font-sans font-extrabold text-gold">Duration:</span> {DURATION}
                  </p>
                </div>
              ) : (
                <div className="text-[16px] leading-normal text-black">
                  <p>
                    You&rsquo;re almost set! Your official confirmation will arrive via email straight from your guide. We&rsquo;ll
                    also send over their contact info so you have it handy. Other than that, there&rsquo;s nothing else you need to
                    do except show up at the meeting point on time, ready to explore.
                  </p>
                  <p className="mt-4">Got questions? Don&rsquo;t hesitate to give me a shout at:</p>
                  <div className="mt-5 space-y-6">
                    <div className="flex items-center gap-1.5">
                      <Image src="/images/icon-email-dark.svg" alt="" width={21} height={17} className="shrink-0" />
                      <ObfuscatedEmail
                        reversedLocal="813gnahcyrrehs"
                        domain="gmail"
                        tld="com"
                        className="text-black transition-opacity hover:opacity-70"
                      />
                    </div>
                    <a
                      href="https://wa.me/886975724127"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-black transition-opacity hover:opacity-70"
                    >
                      <Image src="/images/icon-whatsapp-dark.svg" alt="" width={21} height={21} className="shrink-0" />
                      +886 975 724 127
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Photo block — randomized client-side after mount */}
            <div className="mt-10 space-y-4">
              {photos ? (
                <>
                  <div className="relative aspect-[636/400] w-full overflow-hidden rounded-[12px]">
                    <Image src={photos[0]} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {photos.slice(1).map((src) => (
                      <div key={src} className="relative aspect-[308/236] w-full overflow-hidden rounded-[12px]">
                        <Image src={src} alt="" fill sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="aspect-[636/400] w-full rounded-[12px] bg-muted" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[308/236] w-full rounded-[12px] bg-muted" />
                    <div className="aspect-[308/236] w-full rounded-[12px] bg-muted" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
