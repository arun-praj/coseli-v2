"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";

// Mock data for the cart
const initialCartItem = {
    id: "oxford-classic",
    name: "The Oxford Classic",
    color: "Onyx Black",
    size: "US 10",
    price: 320,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1614252332824-34df734c38d4?q=80&w=300&auto=format&fit=crop"
};

export default function CartPage() {
    const [item, setItem] = useState(initialCartItem);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, item.quantity + delta);
        setItem({ ...item, quantity: newQuantity });
    };

    const subtotal = item.price * item.quantity;

    return (
        <div className="min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32">
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

                        {/* Cart Item Row */}
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 items-center py-6 border-b border-zinc-100">

                            {/* Product Info */}
                            <div className="col-span-6 flex w-full gap-6">
                                <div className="relative w-24 md:w-32 aspect-[4/5] bg-zinc-50 overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <a href="/products/oxford-classic" className="font-serif text-xl text-black leading-tight mb-2 hover:opacity-70 transition-opacity">
                                        {item.name}
                                    </a>
                                    <p className="text-sm text-zinc-500 mb-1">Color: {item.color}</p>
                                    <p className="text-sm text-zinc-500 mb-4">Size: {item.size}</p>
                                    <span className="font-medium text-black">Rs. {item.price.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="col-span-3 flex w-full md:justify-center justify-between items-center mt-4 md:mt-0">
                                <span className="md:hidden text-sm font-semibold tracking-widest uppercase text-zinc-400">Quantity</span>
                                <div className="flex items-center border border-zinc-200">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-medium text-black">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Total and Remove */}
                            <div className="col-span-3 flex w-full md:justify-end justify-between items-center mt-4 md:mt-0">
                                <span className="md:hidden text-sm font-semibold tracking-widest uppercase text-zinc-400">Total</span>
                                <div className="flex items-center gap-6">
                                    <span className="font-medium text-lg text-black">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                    <button className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[40%] flex flex-col pt-8 lg:pt-0">
                        <div className="lg:sticky lg:top-32 bg-zinc-50 p-8 rounded-sm">
                            <h2 className="font-serif text-2xl text-black mb-8 border-b border-zinc-200 pb-4">Summary</h2>

                            <div className="flex flex-col gap-4 font-sans text-sm text-zinc-600 mb-8">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium text-base">Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping Estimate</span>
                                    <span className="text-zinc-500 italic">Calculated at checkout</span>
                                </div>

                                <div className="w-full h-[1px] bg-zinc-200 my-4" />

                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-black font-medium">Estimated Total</span>
                                    <span className="font-serif text-2xl text-black font-medium tracking-tight">Rs. {subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <CheckoutButton
                                className="w-full py-7 text-base shadow-lg shadow-black/10"
                                href="/checkout"
                                text="Checkout"
                            />

                            <div className="mt-6 text-left lg:text-center">
                                <a href="/products" className="text-sm text-zinc-500 hover:text-black transition-colors underline underline-offset-4">
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
                                <span className="font-sans text-sm text-black mb-1">Rs. 18.00</span>
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
                                <span className="font-sans text-sm text-black mb-1">Rs. 24.00</span>
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
