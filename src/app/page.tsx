import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-zinc-200 pt-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] xl:h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:pt-0">
        <div className="z-10 md:text-center max-w-4xl mr-auto md:mx-auto flex flex-col items-start md:items-center gap-8 mix-blend-difference text-white">
          <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] tracking-tight">
            The Art of<br />
            <span className="italic font-light">Custom Fit</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto opacity-90">
            Handcrafted leather shoes and elevated sneakers, designed precisely for your journey.
          </p>
          <a href="/collections">
            <Button variant="outline" className="mt-8 rounded-none border-white text-white hover:bg-white hover:text-black px-8 py-6 text-sm tracking-widest uppercase transition-all duration-500 bg-transparent">
              Explore Collection
            </Button>
          </a>
        </div>

        {/* Abstract background for Hero (simulating a high-end editorial photo) */}
        <div className="absolute inset-0 w-full h-full bg-zinc-100 flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[5]" />
          <Image
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
            alt="Handcrafted leather shoe"
            fill
            className="object-cover object-center scale-105 animate-in fade-in zoom-in duration-1000 ease-out"
            priority
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-32 px-4 md:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-16 gap-8">
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-black max-w-md">Curated Essentials</h2>
          <a href="/products" className="text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
            View All Pieces
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-16">
          {/* Product 1 */}
          <a href="/products/oxford-classic" className="group cursor-pointer block">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6">
              <Image
                src="https://images.unsplash.com/photo-1614252332824-34df734c38d4?q=80&w=1887&auto=format&fit=crop"
                alt="The Oxford Classic"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-start">
              <div>
                <h3 className="font-serif text-base sm:text-xl mb-1 mt-2">The Oxford Classic</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">Handcrafted Leather</p>
              </div>
              <span className="font-sans text-sm mt-1 xl:mt-2">Rs. 320</span>
            </div>
          </a>

          {/* Product 2 */}
          <a href="/products/sneaker-01" className="group cursor-pointer block">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6">
              <Image
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop"
                alt="Coseli Sneaker 01"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-start">
              <div>
                <h3 className="font-serif text-base sm:text-xl mb-1 mt-2">Coseli Sneaker 01</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">Premium Canvas</p>
              </div>
              <span className="font-sans text-sm mt-1 xl:mt-2">Rs. 240</span>
            </div>
          </a>

          {/* Product 3 */}
          <a href="/products/shamba-loafer" className="group cursor-pointer block">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6">
              <Image
                src="https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1964&auto=format&fit=crop"
                alt="The Shamba Loafer"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-start">
              <div>
                <h3 className="font-serif text-base sm:text-xl mb-1 mt-2">The Shamba Loafer</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">Textured Leather</p>
              </div>
              <span className="font-sans text-sm mt-1 xl:mt-2">Rs. 280</span>
            </div>
          </a>

          {/* Product 4 */}
          <a href="/products/chelsea-boot" className="group cursor-pointer block">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6">
              <Image
                src="https://images.unsplash.com/photo-1620800762635-424a6435bd78?q=80&w=1974&auto=format&fit=crop"
                alt="Chelsea Boot"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-start">
              <div>
                <h3 className="font-serif text-base sm:text-xl mb-1 mt-2">The Chelsea Boot</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">Full-Grain Leather</p>
              </div>
              <span className="font-sans text-sm mt-1 xl:mt-2">Rs. 360</span>
            </div>
          </a>
        </div>
      </section>

      {/* Editorial / Brand Section */}
      <section className="py-16 md:py-24 px-4 bg-zinc-50">
        <div className="max-w-4xl mx-auto md:text-center text-left space-y-8">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug font-light text-zinc-900">
            "True luxury is not just what you wear, but how it makes you feel. Every pair of Coseli shoes is a testament to the artisan's touch, designed to move with you."
          </p>
          <div className="w-12 h-[1px] bg-black mr-auto md:mx-auto"></div>
          <p className="text-sm font-sans tracking-widest uppercase text-zinc-500">The Atelier</p>
        </div>
      </section>
    </div>
  );
}
