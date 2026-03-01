"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Search, X, ArrowRight, Loader2, Package } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const POPULAR_TERMS = ["Oxfords", "Loafers", "Boots", "Sneakers", "Leather", "Suede"];

interface Product {
    id: number;
    name: string;
    short_description: string | null;
    base_price: number;
    material: string | null;
    thumbnail_image_url: string | null;
    hover_image_url: string | null;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [popular, setPopular] = useState<Product[]>([]);
    const [searching, setSearching] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            // Load popular products if not yet loaded
            if (popular.length === 0) {
                setLoadingPopular(true);
                fetch(`${API}/products?limit=6&sort=recommended`)
                    .then(r => r.json())
                    .then(d => setPopular(d.data || []))
                    .catch(() => { })
                    .finally(() => setLoadingPopular(false));
            }
        } else {
            setQuery("");
            setResults([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Debounced search
    const doSearch = useCallback(async (q: string) => {
        if (!q.trim()) { setResults([]); setSearching(false); return; }
        setSearching(true);
        try {
            const res = await fetch(`${API}/products?q=${encodeURIComponent(q)}&limit=8`);
            const data = await res.json();
            setResults(data.data || []);
        } catch { setResults([]); }
        finally { setSearching(false); }
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (query.trim().length === 0) { setResults([]); setSearching(false); return; }
        setSearching(true); // show spinner immediately
        debounceRef.current = setTimeout(() => doSearch(query), 350);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [query, doSearch]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (isOpen) window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isTyping = query.length > 0;
    const productImage = (p: Product) =>
        p.thumbnail_image_url || p.hover_image_url ||
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop";

    // Filter popular term suggestions based on query
    const filteredSuggestions = isTyping
        ? POPULAR_TERMS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
        : POPULAR_TERMS;

    return (
        <div className="fixed inset-0 z-[80] flex flex-col items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className={`relative w-full bg-white transition-all duration-500 overflow-y-auto shadow-2xl origin-top animate-in slide-in-from-top-4 ${isTyping ? "h-screen" : "h-[70vh] md:h-[55vh]"
                }`}>
                {/* Search Bar Header */}
                <div className="sticky top-0 bg-white z-10 border-b border-zinc-100 flex items-center px-6 md:px-12 py-4 md:py-5">
                    <div className="flex-1 flex items-center bg-zinc-100/80 hover:bg-zinc-100 transition-colors rounded-full px-5 py-3">
                        {searching
                            ? <Loader2 className="w-4 h-4 text-zinc-400 mr-3 shrink-0 animate-spin" />
                            : <Search className="w-4 h-4 text-zinc-500 mr-3 shrink-0" strokeWidth={1.5} />
                        }
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for products, materials…"
                            className="flex-1 text-base md:text-lg font-serif text-black placeholder:text-zinc-400 outline-none bg-transparent"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        {query && (
                            <button onClick={() => setQuery("")} className="p-1 -mr-1 text-zinc-400 hover:text-black transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 md:ml-8 px-4 py-2 border border-zinc-200 rounded-full font-sans text-xs tracking-widest uppercase text-zinc-600 hover:text-black hover:border-black transition-colors"
                    >
                        Close
                    </button>
                </div>

                <div className="px-6 md:px-12 py-8 md:py-12 max-w-[1400px] mx-auto animate-in fade-in duration-500 delay-150 fill-mode-both">
                    {!isTyping ? (
                        /* ── Empty state: popular products ── */
                        <div>
                            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4 md:mb-6">
                                Popular Right Now
                            </h3>
                            {loadingPopular ? (
                                <div className="flex items-center justify-center h-32">
                                    <Loader2 className="w-5 h-5 animate-spin text-zinc-300" />
                                </div>
                            ) : popular.length > 0 ? (
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                                    {popular.map(item => (
                                        <a key={item.id} href={`/products/${item.id}`} className="group block cursor-pointer" onClick={onClose}>
                                            <div className="relative aspect-[4/5] bg-zinc-100 mb-2 overflow-hidden">
                                                {productImage(item) ? (
                                                    <Image
                                                        src={productImage(item)}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                                        sizes="(max-width: 768px) 33vw, 15vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package className="w-8 h-8 text-zinc-200" />
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="font-serif text-sm text-black group-hover:underline underline-offset-4 decoration-zinc-300 leading-tight line-clamp-2">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                                                NPR {item.base_price.toLocaleString()}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-zinc-300 font-serif italic text-lg">No products found.</p>
                            )}

                            {/* Quick search tags */}
                            <div className="mt-10 flex flex-wrap gap-2">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mr-2 self-center">Try:</span>
                                {POPULAR_TERMS.map(term => (
                                    <button
                                        key={term}
                                        onClick={() => setQuery(term)}
                                        className="px-3 py-1 border border-zinc-200 rounded-full text-xs text-zinc-600 hover:border-black hover:text-black transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ── Active search state ── */
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
                            {/* Suggestions (left / top) */}
                            <div className="flex flex-col gap-4">
                                <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4">
                                    Suggestions
                                </h3>
                                {filteredSuggestions.length > 0 ? (
                                    filteredSuggestions.map((s, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setQuery(s)}
                                            className="text-left font-serif text-2xl md:text-3xl text-zinc-400 hover:text-black hover:italic transition-all py-2"
                                        >
                                            {s}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-zinc-400 font-serif italic text-lg">No suggestions.</p>
                                )}
                            </div>

                            {/* Results (right / bottom) */}
                            <div>
                                <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-8">
                                    {searching ? "Searching…" : `Products ${results.length > 0 ? `(${results.length})` : ""}`}
                                </h3>

                                {searching ? (
                                    <div className="flex items-center gap-3 text-zinc-300">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="font-serif italic text-lg">Looking for results…</span>
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="flex flex-col gap-6">
                                        {results.map(product => (
                                            <a
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-6 group cursor-pointer"
                                                onClick={onClose}
                                            >
                                                <div className="relative w-24 aspect-[4/5] bg-zinc-100 shrink-0 overflow-hidden">
                                                    <Image
                                                        src={productImage(product)}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                                        sizes="96px"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-1 border-b border-zinc-100 pb-2 group-hover:border-black transition-colors self-end">
                                                    <h4 className="font-serif text-xl text-black">{product.name}</h4>
                                                    {product.short_description && (
                                                        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{product.short_description}</p>
                                                    )}
                                                    <span className="font-sans text-xs tracking-widest uppercase text-zinc-500 mt-2">
                                                        NPR {product.base_price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="pr-4 self-end pb-2">
                                                    <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-black transition-all -ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 duration-300" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-zinc-400 font-serif italic text-lg">
                                            No products found for &ldquo;{query}&rdquo;
                                        </p>
                                        <p className="text-sm text-zinc-400">Try a different keyword or browse our collections.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
