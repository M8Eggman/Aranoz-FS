import Footer from "@/Components/Footer/Footer";
import FrontNav from "@/Components/Nav/FrontNav";

export default function FrontLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <FrontNav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
