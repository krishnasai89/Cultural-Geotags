import CustomCursor from "@/component/CustomCursor";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export const metadata = {
  title: "Cultural Geotag Archive",
  description: "Spatial Web Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-slate-950 text-white min-h-screen flex flex-col justify-between">
        <CustomCursor />

        {/* Mounted global header floating frame */}
        <Navbar />

        {/* Main layout contents */}
        <div className="flex-grow">{children}</div>

        {/* Mounted global base layout footer */}
        <Footer />
      </body>
    </html>
  );
}
