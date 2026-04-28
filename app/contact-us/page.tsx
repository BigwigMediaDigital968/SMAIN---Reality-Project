import OurWork from "../components/website/about/OurWork";
import ContactForm from "../components/website/contact/ContactForm";
import ContactHero from "../components/website/contact/ContactHero";
import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import NewsLetter from "../components/website/NewsLetter";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactHero />
      <ContactForm />
      <OurWork />
      <NewsLetter />
      <Footer />
    </>
  );
}
