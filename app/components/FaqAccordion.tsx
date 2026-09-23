"use client";

import { useState } from "react";
import ObfuscatedEmail from "./ObfuscatedEmail";

// The email that appears in the Q5 and Q6 answers, assembled client-side only.
const Email = () => (
  <ObfuscatedEmail reversedLocal="813gnahcyrrehs" domain="gmail" tld="com" />
);

// Answers verbatim from Figma. `answer` is a React node so the email items can
// splice the obfuscated address inline.
const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Do I have to pay for the food and drinks?",
    answer:
      "No, all food and drinks are included as part of the tour so you just pay once. Some tours include alcoholic drink and will only be served to those who are over 18.",
  },
  {
    question: "Are all your tours in English?",
    answer:
      "All our tours are currently run in English, although of course our guides speak the local language (and will be happy to teach you a bit of the basics if you wish.)",
  },
  {
    question: "Where does my tour start from?",
    answer:
      "To ensure that guests have the maximum time eating and exploring, we include an easy-to-find meeting point for each tour. The meeting point will be sent to you via email or text message along with the written Chinese to show a taxi driver if you need. If you have any concerns about finding the meeting point, feel free to get in touch. On the day you can also contact your guide via telephone, WhatsApp or email.",
  },
  {
    question: "After sending out the information, do I need to confirm?",
    answer:
      "Your guide’s contact information will be sent to you, but otherwise no re-confirmation is necessary and all you need to do is be at the meeting point at the correct time to begin the tour.",
  },
  {
    question: "Can I change the date of my bookings?",
    answer: (
      <>
        Should you wish to change the date of your tour please email us at{" "}
        <Email /> and we will be happy to help make these changes for you,
        provided that we can fit you in. Date changes must be outside the
        cancellation period for your particular tour.
      </>
    ),
  },
  {
    question: "What happens if it’s raining?",
    answer: (
      <>
        Under most circumstances tours will continue to be run even if the
        weather isn’t quite as perfect as we’d all like it to be on holiday. Most
        tours feature indoor and undercover dining along the way and your guide
        may change the tour’s itinerary slightly to suit such occasions. Please
        bring an umbrella during rainy season. However, if tours are cancelled
        due to unforeseen circumstances, your guide will contact you. If you have
        any concerns about the weather, you can contact us at <Email />.
      </>
    ),
  },
];

/** Yellow Material "baseline" plus / minus icon (50×50), toggled by open state. */
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="#ffd700"
      aria-hidden
      className="shrink-0"
    >
      {open ? (
        <path d="M19 13H5v-2h14v2z" />
      ) : (
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      )}
    </svg>
  );
}

function FaqItem({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="py-2">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3 text-left"
        >
          <PlusMinusIcon open={open} />
          <span className="font-sans text-[20px] text-black">{question}</span>
        </button>
      </h3>

      {/* Smooth expand/collapse via grid-template-rows 0fr → 1fr */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[1254px] pl-[62px] pt-3 font-sans text-[18px] text-black">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => (
        <FaqItem
          key={faq.question}
          index={i}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
}
