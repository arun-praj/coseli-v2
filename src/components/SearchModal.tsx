"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock Data
const popularItems = [
    {
        id: "1",
        name: "The Oxford Classic",
        image: "https://images.unsplash.com/photo-1614252332824-34df734c38d4?q=80&w=300&auto=format&fit=crop",
        price: "Rs. 320.00"
    },
    {
        id: "2",
        name: "Suede Loafers",
        image: "https://images.unsplash.com/photo-1554522435-d8dc8ea86df6?q=80&w=300&auto=format&fit=crop",
        price: "Rs. 280.00"
    },
    {
        id: "3",
        name: "Chelsea Boots",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=300&auto=format&fit=crop",
        price: "Rs. 450.00"
    },
    {
        id: "4",
        name: "Minimalist Sneakers",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop",
        price: "Rs. 220.00"
    }
];

const allProducts = [
    ...popularItems,
    {
        id: "5",
        name: "Leather Shambas",
        image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=300&auto=format&fit=crop",
        price: "Rs. 180.00"
    }
];

const topSuggestions = ["Oxfords", "Loafers", "Boots", "Sneakers", "Shoe Care"];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isTyping = query.length > 0;
    const filteredProducts = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    const filteredSuggestions = topSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="fixed inset-0 z-[80] flex flex-col items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative w-full bg-white transition-all duration-500 overflow-y-auto shadow-2xl origin-top animate-in slide-in-from-top-4 ${isTyping ? "h-screen" : "h-[70vh] md:h-[50vh]"
                    }`}
            >
                {/* Search Bar Header */}
                <div className="sticky top-0 bg-white z-10 border-b border-zinc-100 flex items-center px-6 md:px-12 py-4 md:py-5">
                    <div className="flex-1 flex items-center bg-zinc-100/80 hover:bg-zinc-100 transition-colors rounded-full px-5 py-3">
                        <Search className="w-4 h-4 text-zinc-500 mr-3 shrink-0" strokeWidth={1.5} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for products, categories..."
                            className="flex-1 text-base md:text-lg font-serif text-black placeholder:text-zinc-500 outline-none bg-transparent"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {query && (
                            <button onClick={() => setQuery("")} className="p-1 -mr-1 text-zinc-400 hover:text-black transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button onClick={onClose} className="ml-4 md:ml-8 px-4 py-2 border border-zinc-200 rounded-full font-sans text-xs tracking-widest uppercase text-zinc-600 hover:text-black hover:border-black transition-colors">
                        Close
                    </button>
                </div>

                <div className="px-6 md:px-12 py-8 md:py-12 max-w-[1400px] mx-auto animate-in fade-in duration-500 delay-150 fill-mode-both">
                    {!isTyping ? (
                        /* Empty State */
                        <div>
                            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4 md:mb-6">Popular Searches</h3>
                            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                                {popularItems.map(item => (
                                    <a key={item.id} href={`/products/${item.id}`} className="group block cursor-pointer max-w-[120px]" onClick={onClose}>
                                        <div className="relative aspect-[4/5] bg-zinc-100 mb-2 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                                sizes="(max-width: 768px) 33vw, 15vw"
                                            />
                                        </div>
                                        <h4 className="font-serif text-sm text-black group-hover:underline underline-offset-4 decoration-zinc-300 leading-tight">{item.name}</h4>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Active State */
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
                            {/* Suggestions (Left Desktop / Top Mobile) */}
                            <div className="flex flex-col gap-4">
                                <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4">Suggestions</h3>
                                {filteredSuggestions.length > 0 ? (
                                    filteredSuggestions.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setQuery(suggestion)}
                                            className="text-left font-serif text-2xl md:text-3xl text-zinc-400 hover:text-black hover:italic transition-all flex items-center group py-2"
                                        >
                                            {suggestion}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-zinc-400 font-serif italic text-lg">No suggestions found.</p>
                                )}
                            </div>

                            {/* Products (Right Desktop / Bottom Mobile) */}
                            <div>
                                <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-8">Products</h3>
                                {filteredProducts.length > 0 ? (
                                    <div className="flex flex-col gap-6">
                                        {filteredProducts.map(product => (
                                            <a key={product.id} href={`/products/${product.id}`} className="flex items-center gap-6 group cursor-pointer" onClick={onClose}>
                                                <div className="relative w-24 aspect-[4/5] bg-zinc-100 shrink-0 overflow-hidden">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                                        sizes="96px"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-1 border-b border-zinc-100 pb-6 group-hover:border-black transition-colors self-end pb-2">
                                                    <h4 className="font-serif text-xl text-black">{product.name}</h4>
                                                    <span className="font-sans text-xs tracking-widest uppercase text-zinc-500 mt-2">{product.price}</span>
                                                </div>
                                                <div className="pr-4 self-end pb-6">
                                                    <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-black transition-all -ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 duration-300" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-zinc-400 font-serif italic text-lg">No products matched your search.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

