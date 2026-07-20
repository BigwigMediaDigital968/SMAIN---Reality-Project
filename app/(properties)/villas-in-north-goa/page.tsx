import Footer from "@/app/components/website/Footer";
import HomeLeadForm from "@/app/components/website/home/HomeLeadForm";
import HomeProject from "@/app/components/website/home/HomeProjects";
import WhatsAppButton from "@/app/components/website/home/Whatapp";
import Navbar from "@/app/components/website/Navbar";
import ProjectHero from "@/app/components/website/project/ProjectHero";
import api from "@/app/lib/api";

const projects: any[] = [
    {
        id: 1,
        title: "The Azalea",
        category: "Villas",
        description:
            "Exclusive 5 BHK field-facing independent luxury villas featuring private pools and premium coastal architecture in Candolim.",
        image:
            "/properties/poperty-1/Bird eye view.jpg",
        href: "/villas-in-north-goa/fully-furnished-5-bhk-villa-candolim-north-goa"
    },
    {
        id: 2,
        title: "The Floretta by Ellora",
        category: "Special Projects",
        description:
            "An elite sanctuary of 8 ultra-luxury 4 BHK architectural masterpieces in Parra blending sleek modernity with serene natural living.",
        image:
            "/properties/floretta-by-ellora/DJI_20250129165952_0366_D.jpg",

        href: "/villas-in-north-goa/floretta-by-ellora-4-bhk-villa-parra-goa"

    },
];

export default async function page() {
    const {data} = await api.get("/api/properties?location=north-goa");
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
                        in North Goa
                    </>
                }
                img="/properties/poperty-1/Bird eye view.jpg"
                img2="/properties/floretta-by-ellora/DJI_20250129165952_0366_D.jpg"
                description="Luxury villas, premium apartments and investment-worthy homes near Goa's most sought-after beaches." />

            <HomeProject properties={properties} />
            <HomeLeadForm />
            {/* <NewsLetter /> */}
        </>
    );
}
