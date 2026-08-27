"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ObfuscatedEmail from "./ObfuscatedEmail";

const fieldClass =
  "h-[50px] w-full rounded-[10px] bg-white px-4 text-base text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold";

const labelClass = "text-lg text-white";

export default function BookingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    numberOfPeople: "5",
    dates: "",
    message: "",
  });

  useEffect(() => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const endDate = new Date(tomorrow);
    endDate.setMonth(endDate.getMonth() + 3);

    const dates: string[] = [];
    let currentDate = new Date(tomorrow);

    while (currentDate <= endDate) {
      dates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setAvailableDates(dates);
  }, []);

  return (
    <section id="contact" className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 md:py-16 lg:px-[75px] lg:py-20">
        {/* Heading with decorative arrows + dashed lines */}
        <div className="flex items-center gap-4 text-white">
          <div className="flex flex-1 items-center gap-2">
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden className="shrink-0">
              <path d="M8 1l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="h-0 flex-1 border-t border-dashed border-current" />
          </div>
          <h2 className="shrink-0 font-script text-3xl text-cream sm:text-4xl lg:text-[40px]">
            Book a Tour
          </h2>
          <div className="flex flex-1 items-center gap-2">
            <span className="h-0 flex-1 border-t border-dashed border-current" />
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden className="shrink-0">
              <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          {/* Left: intro + contact */}
          <div className="lg:self-center">
            <h3 className="font-script text-3xl sm:text-4xl lg:text-[38px]">
              Let&rsquo;s Get in Touch
            </h3>
            <p className="mt-6 max-w-[486px] text-base leading-normal text-white">
              Whether you&rsquo;ve got questions about our tours, need to organise
              a private experience or just want to say hello, we&rsquo;d love to
              hear from you.
            </p>

            <div className="mt-8 max-w-[499px] border-t border-gold pt-6">
              <div className="flex items-center gap-4 text-lg">
                <Image src="/images/icon-email.svg" alt="" width={30} height={24} className="shrink-0" />
                <ObfuscatedEmail
                  reversedLocal="813gnahcyrrehs"
                  domain="gmail"
                  tld="com"
                  className="text-white transition-opacity hover:opacity-80"
                />
              </div>
              <a
                href="https://wa.me/886975724127"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-4 text-lg transition-opacity hover:opacity-80"
              >
                <Image src="/images/icon-whatsapp.svg" alt="" width={30} height={30} className="shrink-0" />
                +886 975 724 127
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              setSubmitError(null);

              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });

                if (!response.ok) {
                  const error = await response.json();
                  throw new Error(error.message || "Failed to submit enquiry");
                }

                router.push("/booking/confirmation");
              } catch (error) {
                setSubmitError(
                  error instanceof Error ? error.message : "An error occurred. Please try again."
                );
              } finally {
                setIsLoading(false);
              }
            }}
            className="flex flex-col gap-6"
          >
            {/* Row 1: Name | Phone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[383fr_291fr]">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Name</span>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className={fieldClass}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Phone</span>
                <input
                  type="tel"
                  placeholder="+886 912345678"
                  className={fieldClass}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </label>
            </div>

            {/* Row 2: Email | Number of People */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[492fr_184fr]">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Email</span>
                <input
                  type="email"
                  placeholder="example@company.com"
                  className={fieldClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>No. of People</span>
                <div className="relative">
                  <select
                    aria-label="No. of People"
                    className={`${fieldClass} appearance-none pr-10`}
                    value={formData.numberOfPeople}
                    onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                    required
                  >
                    {Array.from({ length: 19 }, (_, i) => i + 2).map((n) => (
                      <option key={n} value={n} className="text-black">
                        {n}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black"
                    width="18"
                    height="11"
                    viewBox="0 0 18 11"
                    fill="none"
                  >
                    <path d="M1 1l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Dates</span>
              <div className="relative">
                <select
                  aria-label="Dates"
                  className={`${fieldClass} appearance-none pr-10`}
                  value={formData.dates}
                  onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select a date
                  </option>
                  {availableDates.map((date) => (
                    <option key={date} value={date} className="text-black">
                      {date}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black"
                  width="18"
                  height="11"
                  viewBox="0 0 18 11"
                  fill="none"
                >
                  <path d="M1 1l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Message</span>
              <textarea
                rows={5}
                placeholder="*Please include dietary requirements and numbers of children if any"
                className="h-[156px] w-full resize-none rounded-[10px] bg-white px-4 py-3 text-base text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </label>

            {submitError && (
              <p className="text-sm text-red-400 bg-red-950/30 rounded px-3 py-2">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mx-auto mt-2 h-[56px] w-[204px] rounded-[30px] bg-gold font-ui text-base font-semibold text-black transition-colors hover:bg-[#ffcd00] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
