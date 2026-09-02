import AboutHero from "../components/website/about/AboutHero";
import AboutSectionOne from "../components/website/about/AboutSectionOne";
import AboutSectionThree from "../components/website/about/AboutSectionThree";
import AboutSectionTwo from "../components/website/about/AboutSectionTwo";
import AboutUs from "../components/website/about/AboutUs";
import PremiumCTA from "../components/website/CTA";
import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import OngoingProjects from "../components/website/OngoingProjects";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* <AboutHero /> */}
      <AboutUs />
      {/*<AboutSectionOne />
      <AboutSectionTwo />
      <AboutSectionThree />
      <OngoingProjects /> */}
      {/* <PremiumCTA /> */}
      <Footer />
    </>
  );
}
