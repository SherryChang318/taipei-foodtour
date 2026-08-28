import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ObfuscatedEmail from "../../components/ObfuscatedEmail";

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />

      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/Booking_form_page.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay, per Figma */}
        <div aria-hidden className="absolute inset-0 bg-black/75" />

        <div className="relative mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 py-20 text-center text-white sm:px-10">
          {/* Heading */}
          <h1 className="font-script text-3xl leading-tight sm:text-[32px]">
            Thank you!
            <br />
            Your form submission was successful.
          </h1>

          {/* Divider */}
          <span aria-hidden className="mt-6 h-0 w-full max-w-[499px] border-t border-gold" />

          {/* Confirmation message */}
          <div className="mt-8 max-w-[863px] space-y-4 text-lg font-light leading-relaxed">
            <p>
              Our team is currently reviewing the schedule to ensure we can give
              you the best experience possible.
            </p>
            <p>
              Please note: Your booking date and time slot will be further
              confirmed via email. We will reach out to you within 48 hours to
              lock in your spot and share the exact meeting logistics.
            </p>
            <p>Got questions in the meantime? Feel free to contact us at</p>
          </div>

          {/* Contact details */}
          <div className="mt-6 flex flex-col items-center gap-3 text-xl">
            <div className="flex items-center gap-3">
              <Image src="/images/icon-email.svg" alt="" width={28} height={22} className="shrink-0" />
              <ObfuscatedEmail
                reversedLocal="813gnahcyrrehs"
                domain="gmail"
                tld="com"
                className="transition-opacity hover:opacity-80"
              />
            </div>
            <a
              href="https://wa.me/886975724127"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <Image src="/images/icon-whatsapp.svg" alt="" width={28} height={28} className="shrink-0" />
              +886 975 724 127
            </a>
          </div>

          {/* CTA: Back to Home */}
          <Link
            href="/"
            className="mt-12 flex h-[50px] w-[200px] items-center justify-center rounded-[10px] border-[3px] border-gold bg-white font-ui text-base font-semibold text-black transition-colors hover:bg-cream"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
