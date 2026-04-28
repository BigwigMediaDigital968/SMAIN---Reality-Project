import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import ProjectGrid from "../components/website/project/ProjectGrid";
import ProjectHero from "../components/website/project/ProjectHero";

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <ProjectHero />
      <ProjectGrid />
      <Footer />
    </>
  );
}
