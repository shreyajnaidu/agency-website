import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "YourBrand",
  description: "Creative agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white">

        {/* 🔥 Background Image */}
        <div
          className="relative z-50 transition-all duration-500"
          style={{
            backgroundImage: "url('/image1.jpg')",
          }}
        />

        {/* 🔥 Dark overlay for readability */}
        <div className="fixed inset-0 -z-10 bg-black/70" />

        <Navbar />

        <main className="pt-20">
          {children}
        </main>

      </body>
    </html>
  );
}