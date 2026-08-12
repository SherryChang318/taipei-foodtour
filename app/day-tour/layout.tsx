import localFont from "next/font/local";

const gveretLevin = localFont({
  src: "../fonts/GveretLevin-Regular.ttf",
  variable: "--font-gveret-levin",
  weight: "400",
  display: "swap",
});

export default function DayTourLayout({ children }) {
  return (
    <div className={gveretLevin.variable}>
      {children}
    </div>
  );
}
