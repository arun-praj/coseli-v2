"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useProducts, useCollectionCounts, useShowcases, Product } from "@/lib/hooks/useProducts";

const filterCategories = [
    { id: "collection", name: "Collection", options: ["Chukka", "Shamba", "Oxford", "Sneaker", "Loafer", "Boot"] },
    { id: "price", name: "Price", options: ["Under NPR 150", "NPR 150 - NPR 250", "Over NPR 250"] },
    { id: "color", name: "Color", options: ["Black", "Brown", "Tan", "White", "Navy", "Grey", "Olive"] },
    { id: "gender", name: "Gender", options: ["Men", "Women", "Unisex"] },
    { id: "materials", name: "Materials", options: ["Leather", "Suede", "Canvas", "Vegan Leather", "Synthetic", "Mesh"] },
];



export default function CollectionsPage() {
    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(true);
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
    const [mobileFiltersDirty, setMobileFiltersDirty] = useState(false);

    // Track which accordion sections are open
    const [openFilterSections, setOpenFilterSections] = useState<string[]>([]);

    // Track selected sorting option
    const [selectedSort, setSelectedSort] = useState<string>("Recommended");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                // Mobile: expand all filter accordions
                setOpenFilterSections(filterCategories.map(c => c.id));
            } else {
                // Desktop: expand only the top 'Collection' accordion
                setOpenFilterSections(["collection"]);
            }
        };

        handleResize(); // run once on mount

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Track categories that have "Show More" expanded (meaning > 4 items)
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Track selected filter options just for visual state
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const totalActiveFilters = Object.values(selectedFilters).flat().length;

    const { counts: collectionCounts } = useCollectionCounts();
    const { showcases } = useShowcases();

    // Map selected filters -> API query params
    const getHookOptions = () => {
        let min_price: number | undefined = undefined;
        let max_price: number | undefined = undefined;

        if (selectedFilters.price) {
            if (selectedFilters.price.includes("Under NPR 150")) {
                max_price = 150;
            }
            if (selectedFilters.price.includes("Over NPR 250")) {
                min_price = min_price ? Math.min(min_price, 250) : 250;
            }
            if (selectedFilters.price.includes("NPR 150 - NPR 250")) {
                min_price = 150;
                max_price = 250;
            }
        }

        let sortParam = undefined;
        let showcaseParam = undefined;

        // Check if selectedSort is a showcase
        const selectedShowcase = showcases.find(s => s.name === selectedSort);

        if (selectedShowcase) {
            showcaseParam = selectedShowcase.slug;
        } else {
            if (selectedSort === "Price: Low to High") sortParam = "price_asc";
            else if (selectedSort === "Price: High to Low") sortParam = "price_desc";
            else if (selectedSort === "Newest") sortParam = "newest";
            else if (selectedSort === "Recommended") sortParam = "recommended";
            else if (selectedSort === "Trending") sortParam = "trending";
            else if (selectedSort === "Popular") sortParam = "popular";
        }

        return {
            category: selectedFilters.collection,
            material: selectedFilters.materials,
            color: selectedFilters.color,
            min_price,
            max_price,
            sort: sortParam,
            showcase: showcaseParam
        };
    };

    const { products, loading, loadingMore, hasMore, error, loadMore } = useProducts(getHookOptions());

    // Dynamically build filter categories based on DB collections
    const dynamicFilterCategories = filterCategories.map(cat => {
        if (cat.id === "collection" && Object.keys(collectionCounts).length > 0) {
            return { ...cat, options: Object.keys(collectionCounts) };
        }
        return cat;
    });

    // Scroll listener for infinite pagination
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = Math.ceil(window.innerHeight + window.scrollY);
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight - 1500) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    const toggleFilterAccordion = (categoryId: string) => {
        setOpenFilterSections(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const toggleShowMore = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const toggleFilterOption = (categoryId: string, option: string) => {
        setMobileFiltersDirty(true);
        setSelectedFilters(prev => {
            const currentSelected = prev[categoryId] || [];
            const isSelected = currentSelected.includes(option);

            return {
                ...prev,
                [categoryId]: isSelected
                    ? currentSelected.filter(item => item !== option)
                    : [...currentSelected, option]
            };
        });
    };

    return (
        <div className="pt-24 md:pt-32 pb-24 px-4 md:px-12 max-w-[1800px] mx-auto min-h-screen">

            {/* Page Header */}
            <div className="mb-12 text-center md:text-left">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight mb-4">All Collections</h1>
                <p className="text-zinc-500 max-w-xl text-sm md:text-base leading-relaxed hidden md:block">
                    Discover our handcrafted range of luxury minimal footwear, designed for the purest comfort and timeless aesthetics.
                </p>
            </div>

            {/* Toolbar (Show/Hide Filter + Sort By) */}
            <div className="flex flex-row justify-between items-center py-6 border-b border-t border-zinc-200 mb-8 gap-4">
                {/* Desktop Toggle */}
                <button
                    onClick={() => setIsFilterSidebarVisible(!isFilterSidebarVisible)}
                    className="hidden lg:flex items-center gap-2 group hover:text-black text-zinc-600 transition-colors"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wide uppercase">
                        {isFilterSidebarVisible ? "Hide Filters" : "Show Filters"}
                    </span>
                </button>

                {/* Mobile Toggle */}
                <button
                    onClick={() => {
                        setMobileFiltersDirty(false);
                        setIsMobileFilterVisible(true);
                    }}
                    className="flex lg:hidden items-center gap-2 group hover:text-black text-zinc-600 transition-colors"
                >
                    <SlidersHorizontal className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium tracking-wide uppercase">
                        Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                    </span>
                </button>

                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <span className="text-sm text-zinc-500 hidden sm:block">{loading ? '...' : products.length} Results</span>
                    <div className="relative group/sort">
                        <button className="flex items-center gap-1 sm:gap-2 text-sm font-medium text-black group-hover/sort:text-zinc-600 transition-colors py-2">
                            <span className="hidden sm:inline">Sort By: {selectedSort}</span>
                            <span className="sm:hidden">Sort</span>
                            <ChevronDown className="w-4 h-4 shrink-0" />
                        </button>
                        {/* Sort Dropdown (Hover) */}
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-zinc-200 shadow-xl opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all duration-200 z-40 py-2">
                            {/* Recommended/Standard options + Dynamically added showcases */}
                            {[
                                "Recommended",
                                ...showcases.map(s => s.name),
                                "Price: Low to High",
                                "Price: High to Low"
                            ].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSelectedSort(option)}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 transition-colors ${selectedSort === option ? 'text-black font-medium' : 'text-zinc-600 hover:text-black'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`flex flex-col lg:flex-row ${isFilterSidebarVisible ? 'gap-8 lg:gap-12' : 'gap-0'} items-start transition-all duration-500 relative lg:pl-4`}>

                {/* Left Sidebar: Filters */}
                <div
                    className={`hidden lg:block shrink-0 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full transition-all duration-500 ease-in-out lg:sticky lg:top-32 lg:h-[calc(100vh-120px)] ${isFilterSidebarVisible ? "w-full lg:w-[15rem] opacity-100" : "w-0 opacity-0 lg:h-0"
                        }`}
                >
                    <div className="w-full flex flex-col gap-6 pb-8">
                        {dynamicFilterCategories.map((category) => {
                            const isOpen = openFilterSections.includes(category.id);
                            return (
                                <div key={category.id} className="border-b border-zinc-200 pb-6">
                                    <button
                                        onClick={() => toggleFilterAccordion(category.id)}
                                        className="w-full flex justify-between items-center text-left py-1 group"
                                    >
                                        <span className="font-medium text-sm text-black uppercase tracking-widest">{category.name}</span>
                                        {isOpen ? (
                                            <ChevronUp className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                                        )}
                                    </button>

                                    {/* Accordion Content */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="flex flex-col gap-3">
                                            {category.options.map((option, index) => {
                                                const isSelected = (selectedFilters[category.id] || []).includes(option);
                                                const isVisible = index < 4 || expandedCategories.includes(category.id);

                                                return (
                                                    <label
                                                        key={option}
                                                        className={`flex items-center gap-3 cursor-pointer group transition-all duration-300 ease-in-out origin-top ${isVisible ? "max-h-12 opacity-100 mb-0 pointer-events-auto" : "max-h-0 opacity-0 mb-0 overflow-hidden pointer-events-none"}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={isSelected}
                                                            onChange={() => toggleFilterOption(category.id, option)}
                                                        />
                                                        {/* Standard Checkbox */}
                                                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-black border-black' : 'border-zinc-300 bg-white group-hover:border-black'}`}>
                                                            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                        </div>

                                                        {/* Optional Color Swatch */}
                                                        {category.id === "color" && (
                                                            <div
                                                                className="w-4 h-4 rounded-full border border-zinc-200 shrink-0 shadow-sm"
                                                                style={{
                                                                    backgroundColor:
                                                                        option === "Black" ? "#000000" :
                                                                            option === "Brown" ? "#5C4033" :
                                                                                option === "Tan" ? "#D2B48C" :
                                                                                    option === "White" ? "#FFFFFF" :
                                                                                        option === "Navy" ? "#000080" : "#E5E5E5"
                                                                }}
                                                            />
                                                        )}

                                                        <span className={`text-sm transition-colors truncate ${isSelected ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>
                                                            {option} {category.id === "collection" && collectionCounts[option] !== undefined && <span className="text-zinc-400 font-normal text-xs ml-1">({collectionCounts[option]})</span>}
                                                        </span>
                                                    </label>
                                                );
                                            })}

                                            {category.options.length > 4 && (
                                                <button
                                                    onClick={() => toggleShowMore(category.id)}
                                                    className="text-left text-xs font-medium text-zinc-500 hover:text-black transition-colors mt-0 sm:-mt-1 flex items-center gap-1 w-fit"
                                                >
                                                    {expandedCategories.includes(category.id) ? (
                                                        <>Show Less <ChevronUp className="w-3 h-3" /></>
                                                    ) : (
                                                        <>Show More ({category.options.length - 4}) <ChevronDown className="w-3 h-3" /></>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Product Grid */}
                <div className="flex-1 w-full transition-all duration-500 min-h-[50vh]">
                    {loading && products.length === 0 ? (
                        <div className="flex justify-center items-center h-full w-full py-20">
                            <span className="text-zinc-400 uppercase tracking-widest text-sm animate-pulse">Loading Collection...</span>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-full w-full py-20">
                            <span className="text-red-500 uppercase tracking-widest text-sm">Error Loading Products</span>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex justify-center items-center h-full w-full py-20">
                            <span className="text-zinc-400 uppercase tracking-widest text-sm">No products found for these filters.</span>
                        </div>
                    ) : (
                        <div className={`transition-all duration-500 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {selectedFilters.collection && selectedFilters.collection.length > 0 && (
                                <h2 className="text-3xl font-serif mb-6 text-black border-b border-zinc-200 pb-2">
                                    {selectedFilters.collection.join(", ")} Collection{selectedFilters.collection.length > 1 ? 's' : ''}
                                </h2>
                            )}
                            <div className={`grid grid-cols-2 md:grid-cols-3 ${isFilterSidebarVisible ? 'lg:grid-cols-3 xl:grid-cols-3' : 'lg:grid-cols-4 xl:grid-cols-5'} gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8 sm:gap-y-12`}>
                                {products.map((product) => (
                                    <a key={product.id} href={`/products/${product.id}`} className="group cursor-pointer block">
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
                                                <p className="text-zinc-500 text-xs sm:text-sm hidden sm:block">{product.short_description || "Premium Quality"}</p>
                                            </div>
                                            <span className="font-sans text-sm mt-1 xl:mt-2 font-medium text-black">NPR {product.base_price.toFixed(2)}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Infinite Scroll Indicators */}
                    {loadingMore && (
                        <div className="flex justify-center items-center py-12 w-full">
                            <span className="text-zinc-400 uppercase tracking-widest text-sm animate-pulse">Loading More...</span>
                        </div>
                    )}
                </div>
                {/* Mobile Filter Modal (Full Page) */}
                {isMobileFilterVisible && (
                    <div className="fixed inset-0 z-[100] bg-white flex flex-col lg:hidden animate-in slide-in-from-bottom-[100%] duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
                            <span className="font-serif text-2xl text-black">Filters</span>
                            <button
                                onClick={() => {
                                    setIsMobileFilterVisible(false);
                                    setMobileFiltersDirty(false);
                                }}
                                className="p-2 -mr-2 text-zinc-500 hover:text-black transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Scrollable Content (Filters) */}
                        <div className="flex-1 overflow-y-auto p-4 pb-24">
                            <div className="flex flex-col gap-6">
                                {dynamicFilterCategories.map((category) => {
                                    const isOpen = openFilterSections.includes(category.id);
                                    return (
                                        <div key={category.id} className="border-b border-zinc-200 pb-6">
                                            <button
                                                onClick={() => toggleFilterAccordion(category.id)}
                                                className="w-full flex justify-between items-center text-left py-1 group"
                                            >
                                                <span className="font-medium text-sm text-black uppercase tracking-widest">{category.name}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                                                )}
                                            </button>

                                            {/* Accordion Content */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                                            >
                                                <div className="flex flex-col gap-3">
                                                    {category.options.map((option, index) => {
                                                        const isSelected = (selectedFilters[category.id] || []).includes(option);
                                                        const isVisible = index < 4 || expandedCategories.includes(category.id);

                                                        return (
                                                            <label
                                                                key={option}
                                                                className={`flex items-center gap-3 cursor-pointer group transition-all duration-300 ease-in-out origin-top ${isVisible ? "max-h-12 opacity-100 mb-0 pointer-events-auto" : "max-h-0 opacity-0 mb-0 overflow-hidden pointer-events-none"}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={isSelected}
                                                                    onChange={() => toggleFilterOption(category.id, option)}
                                                                />
                                                                {/* Standard Checkbox */}
                                                                <div className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-black border-black' : 'border-zinc-300 bg-white group-hover:border-black'}`}>
                                                                    {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                                </div>

                                                                {/* Optional Color Swatch */}
                                                                {category.id === "color" && (
                                                                    <div
                                                                        className="w-4 h-4 rounded-full border border-zinc-200 shrink-0 shadow-sm"
                                                                        style={{
                                                                            backgroundColor:
                                                                                option === "Black" ? "#000000" :
                                                                                    option === "Brown" ? "#5C4033" :
                                                                                        option === "Tan" ? "#D2B48C" :
                                                                                            option === "White" ? "#FFFFFF" :
                                                                                                option === "Navy" ? "#000080" : "#E5E5E5"
                                                                        }}
                                                                    />
                                                                )}

                                                                <span className={`text-sm transition-colors truncate ${isSelected ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>
                                                                    {option} {category.id === "collection" && collectionCounts[option] !== undefined && <span className="text-zinc-400 font-normal text-xs ml-1">({collectionCounts[option]})</span>}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}

                                                    {category.options.length > 4 && (
                                                        <button
                                                            onClick={() => toggleShowMore(category.id)}
                                                            className="text-left text-xs font-medium text-zinc-500 hover:text-black transition-colors mt-0 sm:-mt-1 flex items-center gap-1 w-fit"
                                                        >
                                                            {expandedCategories.includes(category.id) ? (
                                                                <>Show Less <ChevronUp className="w-3 h-3" /></>
                                                            ) : (
                                                                <>Show More ({category.options.length - 4}) <ChevronDown className="w-3 h-3" /></>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Modal Sticky Footer (Actions) */}
                        {mobileFiltersDirty && (
                            <div className="absolute bottom-0 w-full p-4 border-t border-zinc-200 bg-white flex gap-4 mt-auto">
                                <button
                                    onClick={() => setSelectedFilters({})}
                                    className="flex-1 py-4 text-sm font-medium border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors uppercase tracking-widest"
                                >
                                    {totalActiveFilters > 0 ? `Clear (${totalActiveFilters})` : 'Clear'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsMobileFilterVisible(false);
                                        setMobileFiltersDirty(false);
                                    }}
                                    className="flex-1 py-4 text-sm font-medium bg-black text-white hover:bg-zinc-800 transition-colors uppercase tracking-widest"
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}
