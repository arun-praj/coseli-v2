import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CuratedCarousel } from "@/components/curated-carousel";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

interface Product {
  id: number;
  name: string;
  base_price: number;
  short_description: string;
  thumbnail_image_url: string;
  hover_image_url: string;
  annotated_image_url: string;
}

async function getCuratedEssentials(): Promise<Product[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    // Use force-cache so Next.js statically renders this page at build time
    const res = await fetch(`${apiUrl}/showcases/curated_essentials`, { cache: 'force-cache' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Failed to fetch curated essentials:", err);
    return [];
  }
}

async function getPopularPicks(): Promise<Product[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${apiUrl}/showcases/popular`, { cache: 'force-cache' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Failed to fetch popular picks:", err);
    return [];
  }
}

export default async function Home() {
  const curatedProducts = await getCuratedEssentials();
  const popularProducts = await getPopularPicks();

  return (
    <div className="min-h-screen bg-white selection:bg-zinc-200 pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[440px] md:h-[calc(100vh-80px)] xl:h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:pt-0 transition-all duration-700">
        <div className="z-10 md:text-center max-w-4xl mr-auto md:mx-auto flex flex-col items-start md:items-center gap-4 md:gap-8 mix-blend-difference text-white">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl leading-[1.1] tracking-tight">
            The Art of<br />
            <span className="italic font-light">Custom Fit</span>
          </h1>
          <p className="font-sans text-base md:text-xl font-light tracking-wide max-w-lg mx-auto opacity-90">
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
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-32 px-4 md:px-12 max-w-screen-2xl mx-auto">
        <CuratedCarousel products={curatedProducts} />
      </section>

      {/* Editorial / Brand Section */}
      <section className="py-8 md:py-24 px-4 bg-zinc-50">
        <div className="max-w-4xl mx-auto md:text-center text-left space-y-8">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug font-light text-zinc-900">
            "True luxury is not just what you wear, but how it makes you feel. Every pair of Coseli shoes is a testament to the artisan's touch, designed to move with you."
          </p>
          <div className="w-12 h-[1px] bg-black mr-auto md:mx-auto"></div>
          <p className="text-sm font-sans tracking-widest uppercase text-zinc-500">The Atelier</p>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-8 md:py-32 px-4 md:px-12 max-w-screen-2xl mx-auto">
        <CuratedCarousel products={popularProducts} title="Top Picks" />
      </section>

      {/* Testimonial Section */}
      <section className="py-12 md:py-24 px-4 bg-white border-t border-zinc-100">
        <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-12">
          <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-6 md:mb-8">Client Stories</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </div>
  );
}
