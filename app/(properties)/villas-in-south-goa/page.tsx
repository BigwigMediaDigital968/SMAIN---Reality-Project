import Footer from "@/app/components/website/Footer";
import HomeLeadForm from "@/app/components/website/home/HomeLeadForm";
import HomeProject from "@/app/components/website/home/HomeProjects";
import WhatsAppButton from "@/app/components/website/home/Whatapp";
import Navbar from "@/app/components/website/Navbar";
import ProjectHero from "@/app/components/website/project/ProjectHero";
import api from "@/app/lib/api";



export default async function page() {
  const {data} = await api.get("/api/properties?location=south-goa");
    const properties = data.properties;
    // console.log(properties)
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
            <HomeProject properties={properties} />
            <HomeLeadForm />
            {/* <NewsLetter /> */}
            <Footer />
            <WhatsAppButton />
        </>
    );
}
