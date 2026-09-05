import { Open_Sans, Instrument_Sans, Work_Sans, Quicksand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gveretLevin = localFont({
  src: "./fonts/GveretLevin-Regular.ttf",
  variable: "--font-gveret-levin",
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: {
  default: "Sherry's Food Tour — Taste the Heart of Taipei",
  template: "%s | Sherry's Food Tour",
  },
  description: "Authentic Taipei food tours, hand-curated and led by Sherry Chang. Eat like a local, not a tourist.",
  keywords: ['Taipei food tour', 'Taiwan food tour', 'Taipei street food', 'Ningxia night market tour', 'Dadaocheng food'],
  openGraph: {
    title: "Sherry's Food Tour — Taste the Heart of Taipei",
    description: 'Authentic Taipei food tours led by a born-and-raised local. Hidden gems, real flavours, unforgettable experiences.',
    url: 'https://www.sherrychang318.com',
    siteName: "Sherry's Food Tour",
    images: [
      {
        url: 'https://www.sherrychang318.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Sherry's Food Tour — Taste the Heart of Taipei",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sherry's Food Tour — Taste the Heart of Taipei",
    description: 'Authentic Taipei food tours led by a born-and-raised local.',
    images: ['https://www.sherrychang318.com/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${instrumentSans.variable} ${workSans.variable} ${quicksand.variable} ${gveretLevin.variable} h-full antialiased`}
    >
      <head>
    {/* Google Tag Manager */}
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PN4625P9');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-PN4625P9"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
        {children}
      </body>
    </html>
  );
}
