import OurWork from "../components/website/about/OurWork";
import FAQs from "../components/website/FAQs";
import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import ServiceCTA from "../components/website/service/ServiceCTA";
import ServiceHero from "../components/website/service/ServiceHero";
import ServiceService from "../components/website/service/ServiceService";
import ServiceShow from "../components/website/service/ServiceShow";
import { serviceFAQs } from "../data/faqData";

export default function ServicePage() {
  return (
    <>
      <Navbar />
      <ServiceHero />
      <ServiceService />
      <ServiceCTA />
      <ServiceShow />
      <OurWork />
      <FAQs items={serviceFAQs} title="Service Specific FAQs" />
      <Footer />
    </>
  );
}
