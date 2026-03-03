import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "The Atelier | Coseli - Masterful Craftsmanship",
    description: "Step into the heart of Coseli. Discover our traditional shoemaking process, where heritage meets precision in every hand-stitched detail.",
    openGraph: {
        title: "The Atelier | Inside Coseli's Craft",
        description: "A look into the slow, meticulous art of handcrafted leather shoemaking.",
        images: ["https://images.unsplash.com/photo-1542451368-80f2d1ab31f5?q=80&w=2070&auto=format&fit=crop"],
    },
};

export default function AtelierPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-8 mix-blend-difference text-white px-4 md:px-12">
                    <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] tracking-tight">
                        The Artisan's <br />
                        <span className="italic font-light">Touch</span>
                    </h1>
                    <p className="font-sans text-lg md:text-xl font-light tracking-wide max-w-md mx-auto opacity-90">
                        Where heritage meets precision. Every pair is cut, stitched, and finished by hand.
                    </p>
                </div>
                {/* Immersive background simulating a cobbler at work */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-zinc-900">
                    <div className="absolute w-full h-full bg-black/40 z-[5]" />
                    <Image
                        src="https://images.unsplash.com/photo-1542451368-80f2d1ab31f5?q=80&w=2070&auto=format&fit=crop"
                        alt="Leather artisan working in the atelier"
                        fill
                        className="object-cover object-center scale-105 animate-in fade-in zoom-in duration-1000 ease-out opacity-80"
                        priority
                    />
                </div>
            </section>

            {/* Editorial Block 1: The Process (Text Left, Image Right) */}
            <section className="py-24 md:py-32 px-4 md:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <div className="flex-1 space-y-8 order-2 lg:order-1">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-snug">
                        Time-Honored <br /> Techniques
                    </h2>
                    <div className="w-12 h-[1px] bg-zinc-300"></div>
                    <div className="space-y-6 text-zinc-600 font-sans leading-relaxed max-w-lg">
                        <p>
                            We believe that truly great shoes are not manufactured—they are crafted. Our atelier in Kathmandu serves as a sanctuary for traditional shoemaking, preserving techniques that have been passed down through generations.
                        </p>
                        <p>
                            We source only the finest full-grain calfskin and suede, carefully selecting hides that will develop a rich, unique patina over years of wear. The cutting of the pattern is strictly done by hand, ensuring that the natural grain of the leather is respected.
                        </p>
                    </div>
                </div>
                <div className="flex-1 w-full order-1 lg:order-2">
                    <div className="relative aspect-[3/4] lg:aspect-square w-full bg-zinc-100 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1590848030248-e8cb0cbef57a?q=80&w=1968&auto=format&fit=crop"
                            alt="Shoe patterns being cut from leather"
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </section>

            {/* Full Bleed Quote Image */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center py-24 px-4 overflow-hidden bg-zinc-950 text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1628151015694-dfcc3c4fbfe8?q=80&w=1974&auto=format&fit=crop"
                        alt="Detail of stitching on leather"
                        fill
                        className="object-cover object-center opacity-40 mix-blend-luminosity"
                    />
                </div>
                <div className="z-10 relative max-w-3xl mx-auto text-center space-y-8">
                    <p className="font-serif text-2xl md:text-4xl lg:text-5xl leading-snug tracking-tight font-light">
                        "The soul of a shoe is forged by the hands that build it. No machine can replicate the intuition of a master artisan."
                    </p>
                    <p className="text-xs font-sans tracking-[0.2em] uppercase text-zinc-400">The Founder</p>
                </div>
            </section>

            {/* Editorial Block 2: The Final Polish (Image Left, Text Right) */}
            <section className="py-24 md:py-32 px-4 md:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <div className="flex-1 w-full">
                    <div className="relative aspect-[3/4] lg:aspect-square w-full bg-zinc-100 overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1515347619362-e64e5264b998?q=80&w=2072&auto=format&fit=crop"
                            alt="Polishing a finished leather shoe"
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                </div>
                <div className="flex-1 space-y-8">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-snug">
                        The Master's <br /> Polish
                    </h2>
                    <div className="w-12 h-[1px] bg-zinc-300"></div>
                    <div className="space-y-6 text-zinc-600 font-sans leading-relaxed max-w-lg">
                        <p>
                            The final stage in our atelier is perhaps the most personal. Using a blend of natural waxes, oils, and time, our artisans hand-burnish each pair. This is a slow, meticulous process that takes hours to perfect.
                        </p>
                        <p>
                            This final polish not only protects the organic material but breathes life into the shoe, creating depth and character before it even leaves the shop floor.
                        </p>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Highlights */}
            <section className="py-24 bg-zinc-50 px-4 md:px-12 border-t border-zinc-100">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div className="space-y-4">
                            <span className="font-serif text-3xl text-zinc-800">01</span>
                            <h3 className="font-sans text-sm tracking-widest uppercase font-medium text-black">Full-Grain Leathers</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                We source only the top layer of the hide, ensuring maximum durability, breathability, and aesthetic aging.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <span className="font-serif text-3xl text-zinc-800">02</span>
                            <h3 className="font-sans text-sm tracking-widest uppercase font-medium text-black">Goodyear Welted</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Our bespoke pieces utilize the Goodyear Welt construction, known for its water resistance and infinite resoling capability.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <span className="font-serif text-3xl text-zinc-800">03</span>
                            <h3 className="font-sans text-sm tracking-widest uppercase font-medium text-black">Cork Footbed</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Over time, the internal layer of cork molds exactly to the unique shape of your foot, creating a truly custom fit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-black mb-8">Wear the Craft</h2>
                <a
                    href="/collections"
                    className="inline-block border border-black text-black px-10 py-5 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300"
                >
                    Explore Collections
                </a>
            </section>
        </div>
    );
}
