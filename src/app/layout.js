import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { AppProvider } from "@/context/AppContext";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: "Cultural Geotag Archive",
  description: "Spatial Web Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-slate-950 text-white min-h-screen flex flex-col justify-between">
        <CustomCursor />
        <AppProvider>
          <Preloader />
          <Navbar />
          <CartDrawer />
          <div className="flex-grow">{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
