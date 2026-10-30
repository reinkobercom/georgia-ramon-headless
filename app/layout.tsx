import { CartProvider } from "components/cart/cart-context";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Inter, Playfair_Display } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} – Bean-to-Bar Schokolade aus Soest`,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: false,
    index: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="selection:bg-gold-300 selection:text-cocoa-950">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton position="bottom-center" />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
