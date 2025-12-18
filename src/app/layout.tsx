import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Norato B - Peluquería Premium en Bogotá",
  description: "✨ Transforma tu estilo con técnicas profesionales. Cortes, Color, Keratina, Tratamientos. 📍 Kennedy, Bogotá. ☎️ +57 318 274 57 13",
  keywords: ["peluquería", "belleza", "Kennedy", "Bogotá", "corte de cabello", "tinte", "keratina", "balayage", "mechas"],
  authors: [{ name: "Norato B" }],
  creator: "Norato B",
  publisher: "Norato B",
  metadataBase: new URL('https://norato-b.vercel.app'),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://norato-b.vercel.app",
    title: "Norato B - Peluquería Premium 💇‍♀️✨",
    description: "Transforma tu estilo con las mejores técnicas. Cortes, Color, Keratina y más. 📍 Kennedy, Bogotá",
    siteName: "Norato B Peluquería",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Norato B - Peluquería Premium en Bogotá",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norato B - Peluquería Premium 💇‍♀️✨",
    description: "Transforma tu estilo. Cortes, Color, Keratina. Kennedy, Bogotá",
    images: ["https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}