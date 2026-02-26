"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { ShoppingCart, Truck, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const [validationError, setValidationError] = useState<string | null>(null);
    const [isAdded, setIsAdded] = useState(false);

    // Stores
    const addItem = useCartStore(state => state.addItem);
    const router = useRouter();

    const thumbnailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
                const res = await fetch(`${apiUrl}/products/${id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const { data } = await res.json();
                setProduct(data);
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Reset size and image when color changes
    const handleColorChange = (idx: number) => {
        setSelectedColor(idx);
        setSelectedSize(null);
        setSelectedImage(0); // Reset gallery back to primary image for this color
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-24 pb-32 flex items-center justify-center">
                <span className="text-zinc-400 font-sans tracking-widest uppercase text-sm animate-pulse">Loading Product...</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white pt-24 pb-32 flex items-center justify-center">
                <span className="text-red-500 font-sans tracking-widest uppercase text-sm">Error Loading Product</span>
            </div>
        );
    }

    const variants = product.variants || [];

    // Derive unique colors
    const colors = Array.from(new Set(variants.map((v: any) => v.color))).map(colorName => {
        const variantWithColor = variants.find((v: any) => v.color === colorName);
        const image = variantWithColor?.images?.[0]?.image_url
            || product.thumbnail_image_url
            || product.annotated_image_url
            || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop";
        return { name: colorName as string, image };
    });

    // If no colors exist via variants, we can use a dummy empty array and fallback
    const selectedColorName = colors.length > 0 ? colors[selectedColor]?.name : null;

    // Get sizes for the selected color
    const availableSizesForColor = selectedColorName
        ? variants.filter((v: any) => v.color === selectedColorName)
        : variants;

    // Remove duplicate sizes
    const uniqueSizesMap = new Map();
    availableSizesForColor.forEach((v: any) => {
        if (!uniqueSizesMap.has(v.size)) {
            uniqueSizesMap.set(v.size, { size: v.size, priceOverride: v.price_override, inventory: v.inventory_count, variantId: v.id });
        }
    });
    const sizes = Array.from(uniqueSizesMap.values());
    if (sizes.length === 0) sizes.push({ size: "One Size", priceOverride: null, inventory: 10, variantId: 0 });

    // Handle prices
    const activeSize = selectedSize !== null ? sizes[selectedSize] : sizes[0];
    const currentPrice = activeSize?.priceOverride !== null && activeSize?.priceOverride !== undefined
        ? activeSize.priceOverride
        : product.base_price;

    // Gather images for gallery
    let images: string[] = [];
    if (selectedColorName) {
        images = variants
            .filter((v: any) => v.color === selectedColorName)
            .flatMap((v: any) => (v.images || []).map((img: any) => img.image_url));
    }
    images = Array.from(new Set(images)); // Remove duplicate image URLs

    // Fallback if no specific variant images
    if (images.length === 0) {
        if (product.thumbnail_image_url) images.push(product.thumbnail_image_url);
        if (product.hover_image_url) images.push(product.hover_image_url);
        if (product.annotated_image_url) images.push(product.annotated_image_url);
        if (images.length === 0) {
            images = ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"];
        }
    }

    // Safety bounds for selectedImage
    const validSelectedImage = selectedImage < images.length ? selectedImage : 0;

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
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Derived properties
    const shippingCost = product.shipping_price || 0;
    const shippingType = "Standard Delivery";
    const returns = "Free returns within 30 days of receipt.";

    const handleAddToCart = (buyNow = false) => {
        if (selectedSize === null && sizes.length > 0 && sizes[0].size !== "One Size") {
            setValidationError("Please select a size first.");
            return;
        }

        setValidationError(null);

        addItem({
            productId: product.id,
            variantId: activeSize?.variantId || 0,
            name: product.name,
            color: selectedColorName || "Default",
            size: activeSize?.size || "One Size",
            price: currentPrice,
            image: images[validSelectedImage] || product.thumbnail_image_url
        });

        if (buyNow) {
            router.push("/cart");
        } else {
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-16 md:pt-24 pb-24 md:pb-32 selection:bg-zinc-200">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">

                {/* Breadcrumb minimal */}
                <div className="mb-6 mt-6 text-sm text-zinc-500 font-sans tracking-wide">
                    <a href="/" className="hover:text-black transition-colors">HOME</a>
                    <span className="mx-2">/</span>
                    <a href="/collections" className="hover:text-black transition-colors">SHOP</a>
                    <span className="mx-2">/</span>
                    <span className="text-black uppercase">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">

                    {/* Left/Top: Image Gallery */}
                    <div className="w-full lg:w-3/5 flex flex-col gap-4 lg:sticky lg:top-32 lg:h-[calc(100vh-140px)]">
                        {/* Main Image */}
                        <div className="relative w-full h-[50vh] md:h-[65vh] lg:aspect-auto lg:h-full lg:flex-1 bg-zinc-50 overflow-hidden group">
                            <Image
                                src={images[validSelectedImage] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Main Image Navigation */}
                            {images.length > 1 && (
                                <>
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
                                </>
                            )}
                        </div>
                        {/* Thumbnails Carousel */}
                        {images.length > 1 && (
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
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-24 aspect-[4/5] shrink-0 overflow-hidden bg-zinc-50 transition-opacity duration-300 snap-start ${validSelectedImage === idx ? 'opacity-100 ring-1 ring-black' : 'opacity-50 hover:opacity-100'}`}
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
                        )}
                    </div>

                    {/* Right/Bottom: Product Details */}
                    <div className="w-full lg:w-2/5 flex flex-col pt-0 md:pt-4 lg:pt-12">

                        <h1 className="font-serif text-4xl lg:text-5xl text-black md:leading-tight lg:leading-[1.1] mb-4 lg:mb-6">
                            {product.name}
                        </h1>

                        <p className="font-sans text-2xl font-light text-black mb-8">
                            Rs. {currentPrice.toFixed(2)}
                        </p>

                        <div className="w-full h-[1px] bg-zinc-200 mb-8" />

                        {/* Colors */}
                        {colors.length > 0 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-semibold tracking-widest uppercase text-black">Color</h3>
                                    <span className="text-sm text-zinc-500">{colors[selectedColor]?.name}</span>
                                </div>
                                <div className="flex gap-4 flex-wrap">
                                    {colors.map((color, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleColorChange(idx)}
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
                        )}

                        {/* Sizes */}
                        {sizes.length > 0 && (
                            <div className="mb-12">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-semibold tracking-widest uppercase text-black">Size</h3>
                                    <a href="#" className="text-xs text-zinc-500 hover:text-black transition-colors underline underline-offset-4">Size Guide</a>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {sizes.map((sizeObj, idx) => (
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
                        )}

                        {/* Actions */}
                        <div className="flex flex-col gap-4 mb-12">
                            {validationError && (
                                <p className="text-red-500 text-sm font-medium tracking-wide mb-2 animate-in fade-in slide-in-from-top-1">
                                    {validationError}
                                </p>
                            )}
                            <Button
                                onClick={() => handleAddToCart(true)}
                                variant="default"
                                className="w-full py-6 rounded-none bg-black text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest text-sm"
                            >
                                Buy Now
                            </Button>
                            <Button
                                onClick={() => handleAddToCart(false)}
                                variant="outline"
                                className={`w-full py-6 rounded-none border-zinc-200 uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${isAdded
                                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                                    : "text-black hover:bg-zinc-50"
                                    }`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {isAdded ? "Added to Cart" : "Add to Cart"}
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
                                        {shippingType}
                                    </h4>
                                    <p className="text-sm text-zinc-500">
                                        {shippingCost === 0
                                            ? "Complimentary shipping on this item."
                                            : `Rs. ${shippingCost} shipping fee.`
                                        } Arrives in 3-5 Business Days.
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
                                        {returns}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description Details */}
                        <div className="prose prose-sm text-zinc-500 font-sans leading-relaxed">
                            <p>{product.long_description || product.short_description || "Premium Quality Shoes."}</p>

                            <ul className="mt-6 space-y-2">
                                {product.material && <li><span className="text-black font-medium">Material:</span> {product.material}</li>}
                                {product.lining && <li><span className="text-black font-medium">Lining:</span> {product.lining}</li>}
                                {product.sole && <li><span className="text-black font-medium">Sole:</span> {product.sole}</li>}
                                {product.construction_type && <li><span className="text-black font-medium">Construction:</span> {product.construction_type}</li>}
                                <li>Handcrafted Excellence</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>

            {/* You May Also Love (Static mock for now, can be updated later) */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mt-16 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                    <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-black max-w-md">You May Also Love</h2>
                    <a href="/collections" className="text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
                        Discover More
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-16">
                    {/* Related Product 1 */}
                    <a href={`/products/3`} className="group cursor-pointer block">
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
                    <a href={`/products/4`} className="group cursor-pointer block">
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
                    <a href={`/products/5`} className="group cursor-pointer block">
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
                    <a href={`/products/6`} className="group cursor-pointer block">
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
