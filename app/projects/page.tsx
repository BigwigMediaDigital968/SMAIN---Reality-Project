import PremiumCTA from "../components/website/CTA";
import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import NewsLetter from "../components/website/NewsLetter";
import ProjectGrid from "../components/website/project/ProjectGrid";
import ProjectHero from "../components/website/project/ProjectHero";
import Testimonial from "../components/website/Testimonial";

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <ProjectHero />
      <ProjectGrid />
      <PremiumCTA />
      <Testimonial />
      <NewsLetter />
      <Footer />
    </>
  );
}
