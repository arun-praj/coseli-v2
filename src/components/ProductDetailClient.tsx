"use client";

import { SizeGuide } from "@/components/size-guide";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { ShoppingCart, Truck, RefreshCcw, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProductDetailClientProps {
    product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const [validationError, setValidationError] = useState<string | null>(null);
    const [isAdded, setIsAdded] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Stores
    const addItem = useCartStore(state => state.addItem);
    const router = useRouter();

    const thumbnailsRef = useRef<HTMLDivElement>(null);

    // Prevent scroll when full screen is open
    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isFullScreen]);

    // Reset size and image when color changes
    const handleColorChange = (idx: number) => {
        setSelectedColor(idx);
        setSelectedSize(null);
        setSelectedImage(0); // Reset gallery back to primary image for this color

        // Smooth scroll to top on mobile to show the image change
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

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

    const selectedColorName = colors.length > 0 ? colors[selectedColor]?.name : null;

    // Get sizes for the selected color
    const availableSizesForColor = selectedColorName
        ? variants.filter((v: any) => v.color === selectedColorName)
        : variants;

    const uniqueSizesMap = new Map();
    availableSizesForColor.forEach((v: any) => {
        if (!uniqueSizesMap.has(v.size)) {
            uniqueSizesMap.set(v.size, { size: v.size, priceOverride: v.price_override, inventory: v.inventory_count, variantId: v.id });
        }
    });
    const sizes = Array.from(uniqueSizesMap.values());
    if (sizes.length === 0) sizes.push({ size: "One Size", priceOverride: null, inventory: 10, variantId: 0 });

    // Out-of-stock helpers
    const isColorOutOfStock = (colorName: string) =>
        variants.filter((v: any) => v.color === colorName).every((v: any) => v.inventory_count === 0);
    const activeSizeInventory = selectedSize !== null ? sizes[selectedSize]?.inventory ?? 1 : (sizes[0]?.inventory ?? 1);
    const isSizeOutOfStock = activeSizeInventory === 0;

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
    images = Array.from(new Set(images));

    if (images.length === 0) {
        if (product.thumbnail_image_url) images.push(product.thumbnail_image_url);
        if (product.hover_image_url) images.push(product.hover_image_url);
        if (product.annotated_image_url) images.push(product.annotated_image_url);
        if (images.length === 0) {
            images = ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"];
        }
    }

    const validSelectedImage = selectedImage < images.length ? selectedImage : 0;

    const scrollThumbnails = (direction: 'left' | 'right') => {
        if (thumbnailsRef.current) {
            const scrollAmount = 120;
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
            {/* Left/Top: Image Gallery */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:sticky lg:top-32 lg:h-[calc(100vh-140px)]">
                {/* Main Image */}
                <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[500px] bg-zinc-50 overflow-hidden group">
                    <Image
                        src={images[validSelectedImage] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <button
                        onClick={() => setIsFullScreen(true)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/50 hover:scale-110"
                        aria-label="View full screen"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>

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
                                    className={`relative w-24 aspect-[4/5] shrink-0 overflow-hidden bg-zinc-50 transition-all duration-300 snap-start ${validSelectedImage === idx ? 'opacity-100 ring-2 ring-inset ring-black' : 'opacity-40 hover:opacity-100'}`}
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

                {/* Full Screen Image Modal */}
                {isFullScreen && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col pt-20 pb-10 transition-all duration-300"
                        onClick={() => setIsFullScreen(false)}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
                            className="absolute top-8 right-8 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:rotate-90"
                            aria-label="Close full screen"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div
                            className="flex-1 relative w-full flex items-center justify-center px-4 md:px-20 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                        className="absolute left-4 md:left-8 z-[110] w-16 h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                        className="absolute right-4 md:right-8 z-[110] w-16 h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </>
                            )}

                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={images[validSelectedImage]}
                                    alt={`${product.name} - View ${validSelectedImage + 1}`}
                                    className="max-w-full max-h-full object-contain pointer-events-none select-none transition-all duration-500 ease-in-out"
                                />
                            </div>
                        </div>

                        <div
                            className="mt-8 flex flex-col items-center gap-6 px-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex gap-3 overflow-x-auto pb-4 max-w-full scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                                        className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 transition-all duration-300 ${validSelectedImage === idx
                                            ? 'ring-2 ring-white scale-105'
                                            : 'opacity-40 hover:opacity-100 scale-95'
                                            }`}
                                    >
                                        <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                            <span className="font-sans text-xs tracking-widest text-white/40 uppercase">
                                {validSelectedImage + 1} / {images.length} — {product.name}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Right/Bottom: Product Details */}
            <div className="w-full lg:w-2/5 flex flex-col pt-0 md:pt-4 lg:pt-0">
                <h1 className="font-serif text-4xl lg:text-5xl text-black md:leading-tight lg:leading-[1.1] mb-4 lg:mb-6">
                    {product.name}
                </h1>

                <p className="font-sans text-2xl font-light text-black mb-8">
                    NPR {currentPrice.toFixed(2)}
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
                            {colors.map((color, idx) => {
                                const oos = isColorOutOfStock(color.name as string);
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleColorChange(idx)}
                                        className={`relative w-16 h-20 bg-zinc-50 overflow-hidden transition-all duration-300 ${selectedColor === idx ? 'opacity-100 ring-2 ring-inset ring-black' : 'opacity-40 hover:opacity-100'} ${oos ? 'opacity-50' : ''}`}
                                    >
                                        <Image
                                            src={color.image}
                                            alt={color.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                        {oos && (
                                            <div className="absolute inset-0 flex items-end justify-center pb-1.5 bg-black/20">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-black/70 px-1.5 py-0.5 rounded">Out</span>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                {sizes.length > 0 && (
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold tracking-widest uppercase text-black">Size</h3>
                            <SizeGuide />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {sizes.map((sizeObj, idx) => {
                                const outOfStock = sizeObj.inventory === 0;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => !outOfStock && setSelectedSize(idx)}
                                        disabled={outOfStock}
                                        title={outOfStock ? 'Out of stock' : undefined}
                                        className={`relative py-3 text-sm transition-colors border ${outOfStock
                                            ? 'border-zinc-100 text-zinc-300 cursor-not-allowed bg-zinc-50'
                                            : selectedSize === idx
                                                ? 'border-black bg-black text-white'
                                                : 'border-zinc-200 text-black hover:border-black'
                                            }`}
                                    >
                                        {sizeObj.size}
                                        {outOfStock && (
                                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="block w-full h-px bg-zinc-300 absolute rotate-[-18deg]" />
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
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
                    {isSizeOutOfStock ? (
                        <>
                            <div className="w-full py-6 flex items-center justify-center border border-zinc-200 bg-zinc-50 uppercase tracking-widest text-sm text-zinc-400 font-medium select-none">
                                Out of Stock
                            </div>
                            <p className="text-xs text-zinc-400 text-center -mt-1">
                                This size is currently unavailable. Please select another size.
                            </p>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
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
                                    : `NPR ${shippingCost} shipping fee.`
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

                    {/* Featured In chips */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Featured In:</span>
                        <div className="flex flex-wrap gap-2">
                            {product.showcases && product.showcases.length > 0 ? (
                                product.showcases.map((s: any) => (
                                    <button
                                        key={s.id}
                                        onClick={() => router.push(`/showcases/${s.slug}`)}
                                        className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-[9px] uppercase tracking-widest font-bold text-zinc-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                    >
                                        {s.name}
                                    </button>
                                ))
                            ) : (
                                <button
                                    onClick={() => router.push(`/showcases/curated-essentials`)}
                                    className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-[9px] uppercase tracking-widest font-bold text-zinc-400 hover:bg-black hover:text-white transition-all opacity-60"
                                >
                                    Curated Essentials
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
