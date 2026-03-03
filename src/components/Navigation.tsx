"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { SearchModal } from "./SearchModal";

export function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const isPrivacyPage = pathname === "/privacy";

    const { items, getCartTotal } = useCartStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const totalItems = isMounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const cartTotal = isMounted ? getCartTotal() : 0;

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    if (isPrivacyPage) {
        return (
            <nav className="fixed w-full top-0 z-50 flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-md border-b border-zinc-100">
                <div className="font-serif text-2xl tracking-tight text-black">
                    <a href="/">COSELI</a>
                </div>
                <div className="text-sm font-medium tracking-wide text-zinc-600 hover:text-black transition-colors">
                    <a href="/">BACK TO HOME</a>
                </div>
            </nav>
        );
    }

    const navLinks = [
        { name: "SHOP", href: "/" },
        { name: "COLLECTIONS", href: "/collections" },
        { name: "ATELIER", href: "/atelier" },
        { name: "CONTACT", href: "/contact" },
    ];

    return (
        <>
            <nav className="fixed w-full top-0 z-[70] flex items-center justify-between px-6 md:px-8 py-4 md:py-6 bg-white/90 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
                <div className="font-serif text-2xl tracking-tight text-black z-[60]">
                    <a href="/">COSELI</a>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-zinc-600">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="hover:text-black transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4 md:gap-6 text-sm font-medium z-[60]">
                    {/* Search Section */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hover:opacity-60 transition-opacity p-2 -mr-2 cursor-pointer"
                        aria-label="Open search"
                    >
                        <Search className="w-5 h-5 text-black" strokeWidth={1.5} />
                    </button>

                    {/* Cart Section */}
                    <div className="relative group">
                        <a href="/cart" className="relative flex items-center hover:opacity-70 transition-opacity py-4 cursor-pointer">
                            <svg className="svg-icon icon-bag w-[22px] h-[22px] text-black" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                                <desc>Bag Icon</desc>
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M1.09053 5.00869H17.9096L18.9818 15.445C19.1672 17.0769 17.9119 18.51 16.2913 18.51L2.7087 18.51C1.08808 18.51 -0.167246 17.0769 0.0181994 15.445L1.09053 5.00869ZM2.40808 6.50869L1.48668 15.6168C1.40224 16.3599 1.97334 17.01 2.7087 17.01L16.2913 17.01C17.0267 17.01 17.5977 16.3599 17.5133 15.6168L16.592 6.50869H2.40808Z" transform="translate(1)"></path>
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.3466 0.622759C7.90387 0.233871 8.61575 0 9.49996 0C10.3842 0 11.0961 0.233871 11.6533 0.622759C12.2048 1.00762 12.5612 1.51352 12.7903 1.99321C13.0183 2.47048 13.1286 2.93833 13.183 3.2803C13.2105 3.45311 13.2246 3.59868 13.2317 3.70389C13.2353 3.75662 13.2372 3.79958 13.2382 3.83116C13.2387 3.84696 13.239 3.85994 13.2392 3.86992L13.2393 3.8826L13.2394 3.88722L13.2394 3.88908C13.2394 3.88908 13.2394 3.89065 12.5002 3.89065C11.7612 3.90271 11.7611 3.89133 11.7611 3.89133L11.7611 3.89294L11.7608 3.8796C11.7603 3.86517 11.7593 3.84065 11.757 3.80751C11.7525 3.74096 11.7431 3.64118 11.7237 3.51955C11.6844 3.27264 11.6072 2.95533 11.4601 2.64744C11.3142 2.34196 11.108 2.06271 10.8157 1.85869C10.5291 1.65871 10.1159 1.5 9.49996 1.5C8.88403 1.5 8.47081 1.65871 8.18424 1.85869C7.8919 2.06271 7.68573 2.34196 7.53981 2.64744C7.39275 2.95533 7.31551 3.27264 7.2762 3.51955C7.25684 3.64118 7.24742 3.74096 7.24288 3.80751C7.24062 3.84065 7.23959 3.86517 7.23913 3.8796L7.23879 3.89337L7.23878 3.89193C7.23878 3.89193 7.23878 3.89065 6.49968 3.89065C5.76057 3.89065 5.76057 3.8899 5.76057 3.8899L5.76058 3.88722L5.7606 3.8826L5.76075 3.86992C5.7609 3.85994 5.76118 3.84696 5.76169 3.83116C5.76269 3.79958 5.7646 3.75662 5.76819 3.70389C5.77537 3.59868 5.7894 3.45311 5.81691 3.2803C5.87136 2.93833 5.98164 2.47048 6.20961 1.99321C6.43873 1.51352 6.79512 1.00762 7.3466 0.622759Z" transform="translate(1)"></path>
                            </svg>
                            {isMounted && totalItems > 0 && (
                                <span className="absolute top-[12px] -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </a>

                        {/* Mobile Backdrop Overlay for Cart Hover */}
                        <div className="fixed inset-0 top-[64px] md:top-[80px] bg-black/40 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 md:hidden z-40 pointer-events-none" />

                        {/* Cart Dropdown */}
                        <div className="fixed top-[64px] md:top-[80px] left-0 w-full md:absolute md:top-[calc(100%+1px)] md:left-auto md:right-0 md:w-80 bg-white md:border border-zinc-200 border-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 md:translate-y-2 group-hover:translate-y-0 z-50 flex flex-col cursor-default">
                            {isMounted && items.length > 0 ? (
                                <>
                                    <div className="max-h-[60vh] overflow-y-auto">
                                        {items.map((item) => (
                                            <div key={item.id} className="p-5 border-b border-zinc-100 flex gap-4">
                                                <div className="relative w-16 aspect-[4/5] bg-zinc-50 shrink-0 border border-zinc-100 mix-blend-multiply">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover object-center"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-1 justify-center">
                                                    <a href={`/products/${item.productId}`} className="font-serif text-base text-black leading-tight mb-1 hover:opacity-70 transition-opacity">
                                                        {item.name}
                                                    </a>
                                                    <span className="text-[10px] text-zinc-500 mb-2">{item.color} / {item.size} <span className="text-zinc-400 mx-1">|</span> Qty: {item.quantity}</span>
                                                    <span className="font-medium text-black text-sm">NPR {item.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-5 bg-zinc-50 border-t border-zinc-100">
                                        <div className="flex justify-between items-center mb-4 text-sm">
                                            <span className="text-zinc-600">Subtotal</span>
                                            <span className="font-medium text-black">NPR {cartTotal.toFixed(2)}</span>
                                        </div>
                                        <CheckoutButton
                                            href="/checkout"
                                            text="Checkout"
                                            className="w-full py-6 text-xs"
                                        />
                                        <div className="mt-4 text-center">
                                            <a href="/cart" className="text-xs text-zinc-500 hover:text-black underline underline-offset-4 transition-colors">View Cart</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-8 text-center bg-white flex flex-col items-center">
                                    <p className="text-sm text-zinc-500 mb-4 font-sans">Your shopping bag is empty.</p>
                                    <a href="/collections" className="text-xs text-black border-b border-black font-medium pb-0.5 tracking-widest uppercase hover:text-zinc-500 hover:border-zinc-500 transition-colors">Start Shopping</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Menu Toggle (Mobile Only) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 -mr-2 text-zinc-600 hover:text-black transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-[55] md:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-serif text-xl tracking-[0.2em] uppercase text-black hover:italic transition-all duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="mt-8 flex flex-col items-center gap-4 text-xs font-sans tracking-[0.2em] text-zinc-400">
                        <p>KATHMANDU, NEPAL</p>
                        <p>© 2024 COSELI ATELIER</p>
                    </div>
                </div>
            </div>

            {/* Global Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
