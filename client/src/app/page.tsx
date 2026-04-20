
import Author from "@/components/author/Author";
import Banner from "@/components/banner/Banner";
import ContactSection from "@/components/homepagesection/Contact2";
import FAQSection from "@/components/homepagesection/FaqSection";
import Services2 from "@/components/homepagesection/Services2";
import Works from "@/components/works/Works2";

export default function Home() {
  return (
    <main>
      <Banner />
      <Author />
      <Works />
      <Services2 />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
