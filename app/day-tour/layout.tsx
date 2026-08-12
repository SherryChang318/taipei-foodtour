import localFont from "next/font/local";
import { ReactNode } from "react";

const gveretLevin = localFont({
  src: "../fonts/GveretLevin-Regular.ttf",
  variable: "--font-gveret-levin",
  weight: "400",
  display: "swap",
});

export default function DayTourLayout({ children }: { children: ReactNode }) {
  return (
    <div className={gveretLevin.variable}>
      {children}
    </div>
  );
}
