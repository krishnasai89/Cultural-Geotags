import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-slate-950 text-slate-100">
        <AppProvider>
          <CustomCursor />
          <Preloader />
          <Navbar />
          <CartDrawer />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
