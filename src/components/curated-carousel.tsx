"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
    id: number;
    name: string;
    base_price: number;
    short_description: string;
    thumbnail_image_url: string;
    hover_image_url: string;
    annotated_image_url: string;
}

export function CuratedCarousel({ products, title = "Curated Essentials" }: { products: Product[], title?: string }) {
    if (!products || products.length === 0) {
        return (
            <div className="py-24 text-center text-zinc-500">
                No curated essentials found. Add some in the admin panel!
            </div>
        );
    }

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full relative"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-16 gap-4 md:gap-8">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tight text-black max-w-md">{title}</h2>

                <div className="flex flex-col items-end gap-4 w-full md:w-auto mt-4 md:mt-0">
                    <a href="/collections" className="text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
                        View All Pieces
                    </a>

                    {products.length > 2 && (
                        <div className="flex gap-2">
                            <CarouselPrevious className="static translate-y-0 text-black border-zinc-200 h-8 w-8 md:h-10 md:w-10 hover:bg-zinc-100" />
                            <CarouselNext className="static translate-y-0 text-black border-zinc-200 h-8 w-8 md:h-10 md:w-10 hover:bg-zinc-100" />
                        </div>
                    )}
                </div>
            </div>

            <CarouselContent className="-ml-4 sm:-ml-8">
                {products.map((product) => (
                    <CarouselItem key={product.id} className="pl-4 sm:pl-8 basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <a href={`/products/${product.id}`} className="group cursor-pointer block">
                            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-4 sm:mb-6">
                                {/* Primary Thumbnail */}
                                <Image
                                    src={product.thumbnail_image_url || product.annotated_image_url || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"}
                                    alt={product.name}
                                    fill
                                    className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${product.hover_image_url ? 'group-hover:opacity-0' : ''}`}
                                />
                                {/* Hover Thumbnail (if available) */}
                                {product.hover_image_url && (
                                    <Image
                                        src={product.hover_image_url}
                                        alt={`${product.name} hover`}
                                        fill
                                        className="object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col xl:flex-row justify-between items-start">
                                <div>
                                    <h3 className="font-serif text-base sm:text-lg md:text-xl mb-1 mt-2 text-black">{product.name}</h3>
                                    <p className="text-zinc-500 text-xs sm:text-sm">{product.short_description || "Premium Quality"}</p>
                                </div>
                                <span className="font-sans text-sm mt-1 xl:mt-2 text-black">NPR {product.base_price.toFixed(2)}</span>
                            </div>
                        </a>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
