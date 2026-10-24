import Navbar from "./components/Navbar";
import ParallaxHero from "./components/ParallaxHero";
import WhyUs from "./components/WhyUs";
import HotTours from "./components/HotTours";
import TheDeets from "./components/TheDeets";
import MeetFoodie from "./components/MeetFoodie";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ParallaxHero />
        <WhyUs />
        <HotTours />
        <TheDeets />
        <MeetFoodie />
        <Testimonials />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
