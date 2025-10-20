import BackNav from "@/Components/Nav/BackNav";

export default function BackLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <BackNav />
            <main>{children}</main>
        </div>
    );
}
