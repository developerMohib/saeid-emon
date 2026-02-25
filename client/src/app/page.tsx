import CustomCursor from "@/animations/CustomCursor";
import ParticlesBg from "@/animations/ParticlesBg";
import Author2 from "@/components/Author2";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import ContactSection from "@/components/Contact2";
import FAQSection from "@/components/FaqSection";
import Homepage from "@/components/Homepage";
import Services2 from "@/components/Services2";
import Works2 from "@/components/Works2";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <ParticlesBg />
      <Banner />
      <Banner2 />
      <Author2 />
      <Works2 />
      <Services2 />
      <FAQSection />
      <ContactSection />
      <Homepage />
    </main>
  );
}
