// src/app/layout.js
import CustomCursor from "@/component/CustomCursor";
import "./globals.css";

export const metadata = {
  title: "Cultural Geotag Archive",
  description: "Spatial Web Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
