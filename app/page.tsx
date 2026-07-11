import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MusicSection from "@/components/MusicSection";
import About from "@/components/About";
import Events from "@/components/Events";
import Hire from "@/components/Hire";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <MusicSection />
        <About />
        <Events />
        <Hire />
      </main>
      <Footer />
    </>
  );
}
