import WhatsAppButton from "../../components/website/home/Whatapp";
import Footer from "../../components/website/Footer";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Footer />
            <WhatsAppButton />
        </>
    );
}
