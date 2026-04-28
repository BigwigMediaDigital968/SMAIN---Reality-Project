import AboutHero from "../components/website/about/AboutHero";
import AboutSectionOne from "../components/website/about/AboutSectionOne";
import AboutSectionThree from "../components/website/about/AboutSectionThree";
import AboutSectionTwo from "../components/website/about/AboutSectionTwo";
import PremiumCTA from "../components/website/CTA";
import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutSectionOne />
      <AboutSectionTwo />
      <AboutSectionThree />
      <PremiumCTA />
      <Footer />
    </>
  );
}
