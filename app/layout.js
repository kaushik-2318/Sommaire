import "./globals.css";
import { Source_Sans_3 as FontSans } from "next/font/google";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ORIGIN_URL } from "@/utils/helper";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Sommaire - AI Powered PDF Summarization",
  description:
    "Save hours of reading time with AI powered PDF summarization. Transform lengthy PDFs into clear, accurate summaries in second with our advanced AI Technology.",
  openGraph: {
    images: [
      {
        url: "/sommaire.png",
      },
    ],
  },
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    cononical: ORIGIN_URL,
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
