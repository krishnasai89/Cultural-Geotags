import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/component/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cultural Geotag Archive",
  description: "Spatial Web Experience",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="antialiased bg-slate-950 text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
