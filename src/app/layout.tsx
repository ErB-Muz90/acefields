import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AceField Logistics | East Africa's Premier Logistics Partner",
    template: "%s | AceField Logistics",
  },
  description:
    "Kenya's leading logistics company delivering parcel, freight, and cargo services across East Africa — Kenya, Uganda, Tanzania, Rwanda, and Burundi. Fast, reliable, affordable.",
  keywords: [
    "logistics Kenya",
    "courier East Africa",
    "parcel delivery Nairobi",
    "freight cargo Kenya",
    "cross-border logistics",
    "same day delivery Kenya",
    "warehousing Nairobi",
    "AceField Logistics",
  ],
  openGraph: {
    title: "AceField Logistics — East Africa's Premier Logistics Partner",
    description: "Fast, reliable logistics across Kenya, Uganda, Tanzania, Rwanda & Burundi.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AceField Logistics",
              url: "https://acefieldlogistics.com",
              logo: "https://acefieldlogistics.com/logo.png",
              description: "Premier logistics and courier services across East Africa.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Mombasa Road, Industrial Area",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254725306678",
                contactType: "customer service",
              },
              areaServed: ["Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi", "DR Congo", "South Sudan"],
            }),
          }}
        />
      </head>
      <body className="bg-white text-text-primary antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
