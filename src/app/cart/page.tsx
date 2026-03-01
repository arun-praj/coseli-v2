"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { useCartStore } from "@/lib/store/cart";

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMounted(true);
    }, []);

    const subtotal = getCartTotal();

    if (!isMounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white pt-20 md:pt-32 pb-24 md:pb-32">
            <div className="max-w-screen-xl mx-auto px-4 md:px-12">

                <h1 className="font-serif text-4xl md:text-5xl text-black mb-12 tracking-tight">Shopping Bag</h1>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

                    {/* Left Column: Cart Items */}
                    <div className="w-full lg:w-[60%] flex flex-col">

                        {/* Table Header (Hidden on Mobile) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-200 text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-8">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-3 text-right">Total</div>
                        </div>

                        {/* Cart Item Row(s) */}
                        {items.length === 0 ? (
                            <div className="py-12 text-center text-zinc-500 font-sans border-b border-zinc-100">
                                Your shopping bag is empty.
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex flex-row md:grid md:grid-cols-12 gap-4 md:gap-6 items-start md:items-center py-6 border-b border-zinc-100">

                                    {/* Product Info */}
                                    <div className="col-span-6 flex w-full gap-4 md:gap-6">
                                        <div className="relative w-24 md:w-32 aspect-[4/5] bg-zinc-50 overflow-hidden shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-col w-full pt-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <a href={`/products/${item.productId}`} className="font-serif text-lg md:text-xl text-black leading-tight hover:opacity-70 transition-opacity pr-4">
                                                    {item.name}
                                                </a>
                                                {/* Mobile Trash */}
                                                <button onClick={() => removeItem(item.id)} className="md:hidden text-zinc-400 hover:text-red-500 transition-colors pt-1" aria-label="Remove item">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-xs md:text-sm text-zinc-500">{item.color} / {item.size}</p>
                                                {/* Mobile Price */}
                                                <span className="md:hidden font-medium text-sm text-black">NPR {item.price.toFixed(2)}</span>
                                            </div>

                                            {/* Desktop Price */}
                                            <span className="hidden md:block font-medium text-black mb-4">NPR {item.price.toFixed(2)}</span>

                                            {/* Mobile Quantity */}
                                            <div className="flex md:hidden items-center border border-zinc-200 w-fit mt-auto cursor-pointer">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                                    aria-label="Decrease quantity"

                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-medium text-black">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Controls (Desktop) */}
                                    <div className="col-span-3 hidden md:flex w-full justify-center items-center">
                                        <div className="flex items-center border border-zinc-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                                aria-label="Decrease quantity"

                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center text-sm font-medium text-black">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total and Remove (Desktop) */}
                                    <div className="col-span-3 hidden md:flex w-full justify-end items-center">
                                        <div className="flex items-center gap-6">
                                            <span className="font-medium text-lg text-black">NPR {(item.price * item.quantity).toFixed(2)}</span>
                                            <button onClick={() => removeItem(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[40%] flex flex-col pt-8 lg:pt-0">
                        <div className="lg:sticky lg:top-32 bg-zinc-50 p-8 rounded-sm">
                            <h2 className="font-serif text-2xl text-black mb-8 border-b border-zinc-200 pb-4">Summary</h2>

                            <div className="flex flex-col gap-4 font-sans text-sm text-zinc-600 mb-8">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium text-base">NPR {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping Estimate</span>
                                    <span className="text-zinc-500 italic">Calculated at checkout</span>
                                </div>

                                <div className="w-full h-[1px] bg-zinc-200 my-4" />

                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-black font-medium">Estimated Total</span>
                                    <span className="font-serif text-2xl text-black font-medium tracking-tight">NPR {subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="opacity-100">
                                <CheckoutButton
                                    className="w-full py-7 text-base shadow-lg shadow-black/10"
                                    href={items.length > 0 ? "/checkout" : "#"}
                                    text="Checkout"
                                />
                            </div>

                            <div className="mt-6 text-left lg:text-center">
                                <a href="/collections" className="text-sm text-zinc-500 hover:text-black transition-colors underline underline-offset-4">
                                    Continue Shopping
                                </a>
                            </div>



                        </div>
                    </div>

                </div>
            </div>

            {/* Customers Also Bought Section */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mt-16 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                    <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-black max-w-md">Customers also bought</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {/* Accessory 1 */}
                    <div className="group cursor-pointer block">
                        <div className="relative w-full aspect-square overflow-hidden bg-white border border-zinc-200 mb-4 mix-blend-multiply">
                            <Image
                                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"
                                alt="Premium Wax Polish"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <h3 className="font-serif text-lg mb-1 mt-2 text-black leading-tight">Premium Wax Polish</h3>
                                <p className="text-zinc-500 text-xs">Neutral Color</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                                <span className="font-sans text-sm text-black mb-1">NPR 18.00</span>
                                <button className="text-[10px] font-semibold tracking-widest uppercase border-b border-black text-black hover:text-zinc-500 hover:border-zinc-500 transition-colors pb-0.5">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Accessory 2 */}
                    <div className="group cursor-pointer block">
                        <div className="relative w-full aspect-square overflow-hidden bg-white border border-zinc-200 mb-4 mix-blend-multiply">
                            <Image
                                src="https://images.unsplash.com/photo-1563725585-61ec1f8e1fb4?q=80&w=800&auto=format&fit=crop"
                                alt="Horsehair Brush"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <h3 className="font-serif text-lg mb-1 mt-2 text-black leading-tight">Horsehair Brush</h3>
                                <p className="text-zinc-500 text-xs">Soft Bristle</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                                <span className="font-sans text-sm text-black mb-1">NPR 24.00</span>
                                <button className="text-[10px] font-semibold tracking-widest uppercase border-b border-black text-black hover:text-zinc-500 hover:border-zinc-500 transition-colors pb-0.5">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
