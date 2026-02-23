"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for the product
const productData = {
    id: "oxford-classic",
    name: "The Oxford Classic",
    description: "A timeless silhouette, handcrafted from the finest Italian full-grain leather. Designed for the discerning individual who appreciates subtle luxury and uncompromising quality. The Oxford Classic features a hand-stitched welt and a supple leather lining that molds to your foot over time.",
    basePrice: 320,
    images: [
        "https://images.unsplash.com/photo-1614252332824-34df734c38d4?q=80&w=1887&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1964&auto=format&fit=crop"
    ],
    colors: [
        { name: "Onyx Black", hex: "#1A1A1A", image: "https://images.unsplash.com/photo-1614252332824-34df734c38d4?q=80&w=300&auto=format&fit=crop" },
        { name: "Cognac Brown", hex: "#8A5A44", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop" },
        { name: "Midnight Navy", hex: "#2C3E50", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop" }
    ],
    sizes: [
        { size: "US 8", priceModifier: 0 },
        { size: "US 9", priceModifier: 0 },
        { size: "US 10", priceModifier: 0 },
        { size: "US 11", priceModifier: 15 }, // Larger sizes cost slightly more in this mock
        { size: "US 12", priceModifier: 15 }
    ],
    shipping: {
        type: "Standard Delivery",
        cost: 15, // Set to 0 for Free Delivery on other products
        estimatedDays: "3-5 Business Days"
    },
    returns: "Free returns within 30 days of receipt."
};

export default function ProductDetailPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const selectedColorObj = productData.colors[selectedColor];

    const currentPrice = selectedSize !== null
        ? productData.basePrice + productData.sizes[selectedSize].priceModifier
        : productData.basePrice;

    const thumbnailsRef = useRef<HTMLDivElement>(null);

    const scrollThumbnails = (direction: 'left' | 'right') => {
        if (thumbnailsRef.current) {
            const scrollAmount = 120; // approximate width of thumbnail + gap
            thumbnailsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handlePrevImage = () => {
        setSelectedImage((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImage((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen bg-white pt-16 md:pt-24 pb-24 md:pb-32 selection:bg-zinc-200">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">

                {/* Breadcrumb minimal */}
                <div className="mb-6 mt-6 text-sm text-zinc-500 font-sans tracking-wide">
                    <a href="/" className="hover:text-black transition-colors">HOME</a>
                    <span className="mx-2">/</span>
                    <a href="/products" className="hover:text-black transition-colors">SHOP</a>
                    <span className="mx-2">/</span>
                    <span className="text-black uppercase">{productData.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">

                    {/* Left/Top: Image Gallery */}
                    <div className="w-full lg:w-3/5 flex flex-col gap-4 lg:sticky lg:top-32 lg:h-[calc(100vh-140px)]">
                        {/* Main Image */}
                        <div className="relative w-full h-[50vh] md:h-[65vh] lg:aspect-auto lg:h-full lg:flex-1 bg-zinc-50 overflow-hidden group">
                            <Image
                                src={productData.images[selectedImage]}
                                alt={productData.name}
                                fill
                                priority
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Main Image Navigation */}
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-7 h-7 stroke-[1.5]" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-7 h-7 stroke-[1.5]" />
                            </button>
                        </div>
                        {/* Thumbnails Carousel */}
                        <div className="relative group/carousel">
                            <button
                                onClick={() => scrollThumbnails('left')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-105"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-7 h-7 stroke-[1.5]" />
                            </button>

                            <div
                                ref={thumbnailsRef}
                                className="flex gap-4 overflow-x-auto scrollbar-hide shrink-0 snap-x snap-mandatory"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {productData.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative w-24 aspect-[4/5] shrink-0 overflow-hidden bg-zinc-50 transition-opacity duration-300 snap-start ${selectedImage === idx ? 'opacity-100 ring-1 ring-black' : 'opacity-50 hover:opacity-100'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollThumbnails('right')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-105"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-7 h-7 stroke-[1.5]" />
                            </button>
                        </div>
                    </div>

                    {/* Right/Bottom: Product Details */}
                    <div className="w-full lg:w-2/5 flex flex-col pt-0 md:pt-4 lg:pt-12">

                        <h1 className="font-serif text-4xl lg:text-5xl text-black md:leading-tight lg:leading-[1.1] mb-4 lg:mb-6">
                            {productData.name}
                        </h1>

                        <p className="font-sans text-2xl font-light text-black mb-8">
                            Rs. {currentPrice}
                        </p>

                        <div className="w-full h-[1px] bg-zinc-200 mb-8" />

                        {/* Colors */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-semibold tracking-widest uppercase text-black">Color</h3>
                                <span className="text-sm text-zinc-500">{productData.colors[selectedColor].name}</span>
                            </div>
                            <div className="flex gap-4">
                                {productData.colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedColor(idx)}
                                        className={`relative w-16 h-20 bg-zinc-50 overflow-hidden transition-all duration-300 ${selectedColor === idx ? 'ring-1 ring-black ring-offset-2' : 'hover:opacity-80'}`}
                                    >
                                        <Image
                                            src={color.image}
                                            alt={color.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-semibold tracking-widest uppercase text-black">Size</h3>
                                <a href="#" className="text-xs text-zinc-500 hover:text-black transition-colors underline underline-offset-4">Size Guide</a>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {productData.sizes.map((sizeObj, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedSize(idx)}
                                        className={`py-3 text-sm transition-colors border ${selectedSize === idx ? 'border-black bg-black text-white' : 'border-zinc-200 text-black hover:border-black'}`}
                                    >
                                        {sizeObj.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 mb-12">
                            <Button
                                variant="default"
                                className="w-full py-6 rounded-none bg-black text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest text-sm"
                            >
                                Buy Now
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full py-6 rounded-none border-zinc-200 text-black hover:bg-zinc-50 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </Button>
                        </div>

                        {/* Delivery & Returns */}
                        <div className="flex flex-col gap-6 py-8 mb-12 border-t border-b border-zinc-100">
                            <div className="flex gap-4 items-start">
                                <span className="p-2 bg-zinc-50 rounded-full shrink-0">
                                    <Truck className="w-5 h-5 text-zinc-900" strokeWidth={1.5} />
                                </span>
                                <div>
                                    <h4 className="font-sans text-sm font-semibold tracking-wide text-black mb-1">
                                        {productData.shipping.type}
                                    </h4>
                                    <p className="text-sm text-zinc-500">
                                        {productData.shipping.cost === 0
                                            ? "Complimentary shipping on this item."
                                            : `Rs. ${productData.shipping.cost} shipping fee.`
                                        } Arrives in {productData.shipping.estimatedDays}.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <span className="p-2 bg-zinc-50 rounded-full shrink-0">
                                    <RefreshCcw className="w-5 h-5 text-zinc-900" strokeWidth={1.5} />
                                </span>
                                <div>
                                    <h4 className="font-sans text-sm font-semibold tracking-wide text-black mb-1">
                                        Returns & Exchanges
                                    </h4>
                                    <p className="text-sm text-zinc-500">
                                        {productData.returns}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description Details */}
                        <div className="prose prose-sm text-zinc-500 font-sans leading-relaxed">
                            <p>{productData.description}</p>

                            <ul className="mt-6 space-y-2">
                                <li><span className="text-black font-medium">Material:</span> Italian Full-Grain Calfskin Leather</li>
                                <li><span className="text-black font-medium">Lining:</span> Supple Natural Leather</li>
                                <li><span className="text-black font-medium">Sole:</span> Stacked Leather & Rubber Heel</li>
                                <li><span className="text-black font-medium">Construction:</span> Blake Stitch</li>
                                <li>Handcrafted in Florence, Italy</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>

            {/* You May Also Love */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mt-16 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                    <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-black max-w-md">You May Also Love</h2>
                    <a href="/products" className="text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
                        Discover More
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-16">
                    {/* Related Product 1 */}
                    <a href="/products/shamba-loafer" className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1964&auto=format&fit=crop"
                                alt="The Shamba Loafer"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">The Shamba Loafer</h3>
                                <p className="text-zinc-500 text-sm">Textured Leather</p>
                            </div>
                            <span className="font-sans text-sm mt-2">Rs. 280</span>
                        </div>
                    </a>

                    {/* Related Product 2 */}
                    <a href="/products/sneaker-01" className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop"
                                alt="Coseli Sneaker 01"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">Coseli Sneaker 01</h3>
                                <p className="text-zinc-500 text-sm">Premium Canvas & Suede</p>
                            </div>
                            <span className="font-sans text-sm mt-2">Rs. 240</span>
                        </div>
                    </a>

                    {/* Related Product 3 */}
                    <a href="/products/chelsea-boot" className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1620800762635-424a6435bd78?q=80&w=1974&auto=format&fit=crop"
                                alt="Chelsea Boot"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">The Chelsea Boot</h3>
                                <p className="text-zinc-500 text-sm">Full-Grain Leather</p>
                            </div>
                            <span className="font-sans text-sm mt-2">Rs. 360</span>
                        </div>
                    </a>

                    {/* Related Product 4 */}
                    <a href="/products/weekend-loafer" className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
                                alt="Weekend Loafer"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">Weekend Loafer</h3>
                                <p className="text-zinc-500 text-sm">Supple Suede</p>
                            </div>
                            <span className="font-sans text-sm mt-2">Rs. 260</span>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    );
}
