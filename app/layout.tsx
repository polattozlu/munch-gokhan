
import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Munch - Lezzetli Yemekler Hızlıca Kapınızda",
  description: "Favori restoranlarınızdan sipariş verin, taze ve sıcak yemeklerin kapınıza kadar gelsin. Munch ile yemek siparişi artık çok kolay!",
  keywords: "yemek siparişi, online yemek, restoran, fast food, pizza, kebap, sushi, burger",
  authors: [{ name: "Munch Team" }],
  creator: "Munch",
  publisher: "Munch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    title: 'Munch - Lezzetli Yemekler Hızlıca Kapınızda',
    description: 'Favori restoranlarınızdan sipariş verin, taze ve sıcak yemeklerin kapınıza kadar gelsin.',
    siteName: 'Munch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Munch - Lezzetli Yemekler Hızlıca Kapınıza',
    description: 'Favori restoranlarınızdan sipariş verin, taze ve sıcak yemeklerin kapınıza kadar gelsin.',
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
    <html lang="tr" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ea580c'/%3E%3Ctext x='50' y='35' font-family='Arial,sans-serif' font-size='18' font-weight='bold' text-anchor='middle' fill='white'%3EM%3C/text%3E%3Ccircle cx='35' cy='65' r='8' fill='%23fbbf24'/%3E%3Ccircle cx='50' cy='70' r='6' fill='%23f59e0b'/%3E%3Ccircle cx='65' cy='62' r='7' fill='%23f97316'/%3E%3C/svg%3E" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}