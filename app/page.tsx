import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import About from "@/components/About";
import Events from "@/components/Events";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MusicSection />
        <About />
        <Events />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
