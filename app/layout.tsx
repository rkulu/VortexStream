import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import AsideSidebar from "@/components/AsideSidebar";
import TopHeader from "@/components/TopHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { getSiteMetadata } from "@/lib/settings";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSiteMetadata();

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.sankavollerei.com"),
    icons: {
      icon: meta.faviconUrl || "/favicon.ico",
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: "/",
      siteName: meta.siteName,
      images: [
        {
          url: meta.ogImage,
          width: 1200,
          height: 630,
          alt: meta.siteName,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased dark`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-sans selection:bg-[#9d4edd]/30 selection:text-white">
        <div className="mesh-gradient" />
        
        {/* Desktop Sidebar */}
        <AsideSidebar />
        
        {/* Main Content Area */}
        <div className="md:ml-[280px] flex flex-col min-h-screen relative pb-16 md:pb-0">
          <TopHeader />
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-3 sm:px-5 md:px-8 py-4 sm:py-5 md:py-6">
            {children}
          </main>
          <Footer />
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
