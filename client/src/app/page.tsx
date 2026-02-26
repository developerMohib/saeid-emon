import Author2 from "@/components/homepagesection/Author2";
import Banner from "@/components/Banner";
import ContactSection from "@/components/homepagesection/Contact2";
import FAQSection from "@/components/homepagesection/FaqSection";
import Services2 from "@/components/homepagesection/Services2";
import Works2 from "@/components/homepagesection/Works2";
import Banner2 from "@/components/homepagesection/Banner2";

export default function Home() {
  return (
    <main>
      <Banner />
      <Banner2 />
      <Author2 />
      <Works2 />
      <Services2 />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
