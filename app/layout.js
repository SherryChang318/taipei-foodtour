import { Open_Sans, Instrument_Sans, Work_Sans, Quicksand } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: "Sherry's Food Tour — Taste the Heart of Taipei",
  description:
    "Authentic Taipei food tours, hand-crafted and led by Sherry Chang. Eat like a local, not a tourist.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${instrumentSans.variable} ${workSans.variable} ${quicksand.variable} ${gveretLevin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <GoogleAnalytics gaId="G-CN6XTV6X0D" />
      </body>
    </html>
  );
}
