import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Internet Movies Rental - Catalogue",
  description: "Browse and manage the IMR movie catalogue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-cream font-body text-ink antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
