"use client";
import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";

export default function ShoeCarePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 mix-blend-difference text-white px-4 md:px-12 mt-16">
                    <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight">
                        The Art of <br />
                        <span className="italic font-light">Shoe Care</span>
                    </h1>
                    <p className="font-sans text-sm tracking-widest uppercase mt-4">A Ritual of Longevity</p>
                </div>
                <Image
                    src="https://images.unsplash.com/photo-1621245041045-8fbfb39414ca?q=80&w=2938&auto=format&fit=crop"
                    alt="Shoe Care Tools"
                    fill
                    className="object-cover object-center brightness-75 scale-105"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-12 z-10 text-white animate-bounce-slow opacity-80 mix-blend-difference">
                    <ArrowDown className="w-6 h-6" strokeWidth={1.5} />
                </div>
            </section>

            {/* Introduction */}
            <section className="max-w-3xl mx-auto text-center px-4 md:px-12 py-24 md:py-32">
                <p className="text-zinc-600 font-serif text-lg md:text-xl leading-relaxed">
                    A well-crafted pair of full-grain leather shoes, when properly cared for, will not only last a lifetime but will grow more beautiful with age. Developing a rich patina requires honoring the leather through a deliberate ritual of cleaning, conditioning, and polishing.
                </p>
            </section>

            {/* The Ritual Steps */}
            <section className="max-w-[1200px] mx-auto px-4 md:px-12 pb-32">
                {/* Step 01 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 md:mb-48">
                    <div className="relative aspect-[4/5] w-full">
                        <Image
                            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2624&auto=format&fit=crop"
                            alt="Horsehair Brush on Leather"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-6 md:pr-12">
                        <span className="font-serif text-zinc-300 text-6xl md:text-8xl leading-none block mb-4">01</span>
                        <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-black">Preparation</h2>
                        <h3 className="font-serif text-3xl md:text-4xl text-black">Clean & Reset</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                            Begin by placing cedar shoe trees inside to maintain the shoe's shape and absorb any ambient moisture. Remove the laces to prevent them from absorbing polish. Using a genuine horsehair brush, vigorously brush the entire upper to remove dust and topical dirt. Clean the welts utilizing a smaller welt brush.
                        </p>
                    </div>
                </div>

                {/* Step 02 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 md:mb-48 md:flex-row-reverse flex-col-reverse">
                    <div className="flex flex-col justify-center space-y-6 md:pl-12 order-2 md:order-1">
                        <span className="font-serif text-zinc-300 text-6xl md:text-8xl leading-none block mb-4">02</span>
                        <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-black">Nourish</h2>
                        <h3 className="font-serif text-3xl md:text-4xl text-black">Conditioning</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                            Leather is a skin that requires hydration to prevent drying and cracking. Apply a small amount of premium leather conditioner using a cotton chamois or your fingertips. Massage it gently into the leather using circular motions, paying special attention to the creases. Allow the shoe to sit for 15 minutes to absorb the nutrients.
                        </p>
                    </div>
                    <div className="relative aspect-[4/5] w-full order-1 md:order-2">
                        <Image
                            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2574&auto=format&fit=crop"
                            alt="Applying Conditioner"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Step 03 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="relative aspect-[4/5] w-full">
                        <Image
                            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop"
                            alt="Polishing Leather Shoe"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-6 md:pr-12">
                        <span className="font-serif text-zinc-300 text-6xl md:text-8xl leading-none block mb-4">03</span>
                        <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-black">Protect</h2>
                        <h3 className="font-serif text-3xl md:text-4xl text-black">Polish & Shine</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                            Apply a colored cream polish to restore pigment, followed by a hard wax polish on the toe and heel counters for protection and shine. Apply in light, concentric circles. Finish by briskly buffing the entire shoe with your horsehair brush, resulting in a deep, lustrous finish.
                        </p>
                    </div>
                </div>
            </section>

            {/* Essential Tools Grid */}
            <section className="bg-zinc-50 py-24 md:py-32 px-4 md:px-12 border-t border-zinc-100">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-black mb-16">Essential Toolkit</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-left">
                        {/* Tool 1 */}
                        <a href="/products/cedar-shoe-trees" className="space-y-4 group cursor-pointer block">
                            <div className="h-48 w-full bg-zinc-200 relative mb-6 overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1616428616183-5c7472dd97ac?q=80&w=2574&auto=format&fit=crop" alt="Cedar Shoe Tree" fill className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <h4 className="font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300">Cedar Shoe Trees</h4>
                            <p className="font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2">NPR 4,500</p>
                            <p className="text-zinc-500 text-sm leading-relaxed mt-2">Essential for maintaining shape, preventing deep creases, and pulling damaging moisture away from the interior lining.</p>
                        </a>
                        {/* Tool 2 */}
                        <a href="/products/horsehair-brush" className="space-y-4 group cursor-pointer block">
                            <div className="h-48 w-full bg-zinc-200 relative mb-6 overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2757&auto=format&fit=crop" alt="Horsehair Brush" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <h4 className="font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300">Horsehair Brush</h4>
                            <p className="font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2">NPR 2,800</p>
                            <p className="text-zinc-500 text-sm leading-relaxed mt-2">Used for everyday cleaning to dust off the uppers, and for the final vigorous buffing stage after polishing.</p>
                        </a>
                        {/* Tool 3 */}
                        <a href="/products/conditioner-polish" className="space-y-4 group cursor-pointer block">
                            <div className="h-48 w-full bg-amber-900 relative mb-6 overflow-hidden transition-transform duration-700 group-hover:scale-105">
                                {/* Abstract representation of polish */}
                            </div>
                            <h4 className="font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300">Conditioner & Polish</h4>
                            <p className="font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2">NPR 3,200</p>
                            <p className="text-zinc-500 text-sm leading-relaxed mt-2">A high-quality liquid or cream conditioner to nourish, alongside pigmented cream and wax polishes to restore color and protect.</p>
                        </a>
                        {/* Tool 4 */}
                        <a href="/products/cotton-chamois" className="space-y-4 group cursor-pointer block">
                            <div className="h-48 w-full bg-zinc-200 relative mb-6 overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1528343118917-74070a927a7c?q=80&w=2574&auto=format&fit=crop" alt="Cotton Chamois" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <h4 className="font-serif text-xl text-black group-hover:underline underline-offset-4 decoration-zinc-300">Cotton Chamois</h4>
                            <p className="font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2">NPR 1,200</p>
                            <p className="text-zinc-500 text-sm leading-relaxed mt-2">A soft, lint-free cloth used for applying conditioners and polishes in precise, controlled layers.</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 md:py-32 text-center px-4">
                <h2 className="font-serif text-3xl md:text-5xl text-black mb-8">Ready to start your collection?</h2>
                <a
                    href="/collections"
                    className="inline-block border border-black text-black px-10 py-5 text-sm tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300"
                >
                    Explore Ready to Wear
                </a>
            </section>
        </div>
    );
}
