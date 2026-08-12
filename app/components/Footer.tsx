import Image from "next/image";
import Link from "next/link";
import ObfuscatedMailLink from "./ObfuscatedMailLink";

const sitemap = [
  [
    { label: "About Me", href: "/#about" },
    { label: "Food Tour", href: "/#tours" },
    { label: "Day Tour", href: "/day-tour" },
  ],
  [
    { label: "FAQs", href: "/faqs" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact Me", href: "/#contact" },
  ],
];

type Social = {
  icon: string;
  label: string;
  w: number;
  h: number;
  href?: string;
  mail?: boolean;
};

const socials: Social[] = [
  { icon: "/images/icon-instagram.svg", label: "Instagram", href: "https://www.instagram.com/sherrychang318/", w: 31, h: 29 },
  { icon: "/images/icon-email.svg", label: "Email", mail: true, w: 28, h: 22 },
  { icon: "/images/icon-whatsapp.svg", label: "WhatsApp", href: "https://wa.me/886975724127", w: 28, h: 28 },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[70px]">
        <hr className="border-white/30" />

        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-16 lg:py-16">
          {/* Logo */}
          <div className="flex items-start">
            <Image
              src="/images/logo.png"
              alt="Sherry's Food Tour"
              width={182}
              height={182}
              className="h-28 w-28 object-contain lg:h-[182px] lg:w-[182px]"
            />
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="md:justify-self-center">
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-lg">
              {sitemap.map((col, i) => (
                <ul key={i} className="space-y-3">
                  {col.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link href={link.href} className="transition-opacity hover:opacity-70">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="transition-opacity hover:opacity-70">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          {/* Socials */}
          <ul className="flex items-start gap-5 md:justify-self-end">
            {socials.map((s) => (
              <li key={s.label}>
                {s.mail ? (
                  <ObfuscatedMailLink
                    reversedLocal="813gnahcyrrehs"
                    domain="gmail"
                    tld="com"
                    icon={s.icon}
                    w={s.w}
                    h={s.h}
                  />
                ) : (
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-70"
                  >
                    <Image src={s.icon} alt="" width={s.w} height={s.h} className="object-contain" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 pb-10 text-sm text-white/90">
          <span aria-hidden>©</span>
          <p>2026 Asian Foodie - Sherry&rsquo;s Personal Tour</p>
        </div>
      </div>
    </footer>
  );
}
