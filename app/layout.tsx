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
      <body className="bg-slate-950 text-white">
        <Navbar />

        {/* This is REQUIRED */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}