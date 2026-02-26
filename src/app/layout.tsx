import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coseli | Custom Handcrafted Leather Shoes",
  description: "Luxury minimal custom fit handcrafted leather shoes, sneakers, and shambas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-zinc-950 flex flex-col min-h-screen`}>
        {/* Shared Header */}
        <Navigation />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Shared Footer */}
        <footer className="py-20 px-4 md:px-12 border-t border-zinc-200 bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-2xl tracking-tight text-black mb-6">COSELI</h2>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Handcrafted in limited quantities. Discover the pure joy of custom-fit leather footwear.
              </p>
            </div>

            {/* Column 2: Shop Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-black mb-2">Shop</h3>
              <a href="#" className="text-sm text-zinc-500 hover:text-black transition-colors">Leather Shoes</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-black transition-colors">Sneakers</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-black transition-colors">Shambas</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-black transition-colors">Accessories</a>
            </div>

            {/* Column 3: Support Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-black mb-2">Client Services</h3>
              <a href="/contact" className="text-sm text-zinc-500 hover:text-black transition-colors">Contact Us</a>
              <a href="/track" className="text-sm text-zinc-500 hover:text-black transition-colors">Track Order</a>
              <a href="/returns" className="text-sm text-zinc-500 hover:text-black transition-colors">Shipping & Returns</a>
              <a href="/faq" className="text-sm text-zinc-500 hover:text-black transition-colors">FAQ</a>
              <a href="/shoe-care" className="text-sm text-zinc-500 hover:text-black transition-colors">Shoe Care Guide</a>
            </div>

            {/* Column 4: Newsletter */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-black mb-2">The Atelier Inside</h3>
              <p className="text-sm text-zinc-500 mb-2">Subscribe to receive early access to new releases and exclusive events.</p>
              <div className="flex w-full">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 bg-transparent border-b border-zinc-300 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                  aria-label="Email Address"
                />
                <button
                  type="button"
                  className="border-b border-zinc-300 py-2 px-4 text-sm font-medium hover:border-black transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-screen-2xl mx-auto mt-20 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
            <div>&copy; {new Date().getFullYear()} Coseli. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors">Instagram</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
