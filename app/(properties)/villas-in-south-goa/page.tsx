import Footer from "@/app/components/website/Footer";
import HomeLeadForm from "@/app/components/website/home/HomeLeadForm";
import HomeProject from "@/app/components/website/home/HomeProjects";
import WhatsAppButton from "@/app/components/website/home/Whatapp";
import Navbar from "@/app/components/website/Navbar";
import ProjectHero from "@/app/components/website/project/ProjectHero";


const projects: any[] = [

  {
    id: 3,
    title: "La Isla by Vianaar",
    category: "Conscious Living",
    description:
      "A deliberate collection of 2, 3, and 4 BHK luxury climate-responsive villas in South Goa, guided by nature and built with circular resource loops.",
    image:
      "/properties/La-Isla/property-1 (1).jpeg",
    href:"/villas-in-south-goa/la-isla-by-vianaar"
  },
];
export default function page() {
    return (
        <>
            <Navbar />
            <ProjectHero eyebrow="PREMIUM PROPERTIES"
                heading={
                    <>
                        Find Your Dream Home
                        <br />
                        in South Goa
                    </>
                }
                description="Luxury villas, premium apartments and investment-worthy homes near Goa's most sought-after beaches."
                img="/properties/La-Isla/property-1 (1).jpeg" />
            <HomeProject properties={projects} />
            <HomeLeadForm />
            {/* <NewsLetter /> */}
            <Footer />
            <WhatsAppButton />
        </>
    );
}
