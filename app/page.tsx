import HomeAbout from "./components/website/home/HomeAbout";
import HomeHero from "./components/website/home/HomeHero";
import HomeService from "./components/website/home/HomeService";
import HomeSlider from "./components/website/home/HomeSlider";
import Navbar from "./components/website/Navbar";
import HomeWhatWeDo from "./components/website/home/HomeWhatWeDo";
import HomeProject from "./components/website/home/HomeProjects";
import Footer from "./components/website/Footer";
import HomeTestimonial from "./components/website/home/HomeTestimonial";
import HomeLeadForm from "./components/website/home/HomeLeadForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeAbout />
      <HomeSlider />
      <HomeService />
      <HomeWhatWeDo />
      <HomeProject />
      <HomeTestimonial />
      <HomeLeadForm />
      <Footer />
    </>
  );
}
