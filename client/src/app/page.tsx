import Banner from "@/components/Banner";
import Author2 from "@/components/homepagesection/Author2";
import ContactSection from "@/components/homepagesection/Contact2";
import FAQSection from "@/components/homepagesection/FaqSection";
import Services2 from "@/components/homepagesection/Services2";
import Works2 from "@/components/homepagesection/Works2";

export default function Home() {
  return (
    <main>
      <Banner />
      <Author2 />
      <Works2 />
      <Services2 />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
