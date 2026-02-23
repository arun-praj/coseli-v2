"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/CheckoutButton";

// Mock data for the cart
const cartItems = [
    {
        id: "oxford-classic",
        name: "The Oxford Classic",
        color: "Onyx Black",
        size: "US 10",
        price: 320,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1614252332824-34df734c38d4?q=80&w=300&auto=format&fit=crop"
    }
];

export default function CheckoutPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 15;
    const total = subtotal + shipping;

    const [email, setEmail] = useState("");
    const [isCouponExpanded, setIsCouponExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-white pt-16 md:pt-24 pb-24 md:pb-32 selection:bg-zinc-200">
            <div className="max-w-screen-xl mx-auto px-4 md:px-12">

                {/* Logo and minimal header for distraction-free checkout could go here */}
                <div className="mb-12 text-sm text-zinc-500 font-sans tracking-wide">
                    <a href="/products/oxford-classic" className="hover:text-black transition-colors">CART</a>
                    <span className="mx-2">/</span>
                    <span className="text-black uppercase">INFORMATION & SECURE CHECKOUT</span>
                </div>

                <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 relative">

                    {/* Left Column: Forms */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-12">

                        {/* 1. Contact Section */}
                        <section>
                            <h2 className="font-serif text-3xl text-black mb-6">Contact</h2>
                            <div className="space-y-6">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email (Optional)"
                                        className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {email && (
                                        <div className="flex items-center gap-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300 text-black">
                                            <input type="checkbox" id="newsletter" defaultChecked={false} className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black accent-black" />
                                            <label htmlFor="newsletter" className="text-sm cursor-pointer select-none">Email me with news and offers</label>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2 block">Phone Number <span className="text-red-500">*</span></label>
                                    <div className="flex group">
                                        <span className="inline-flex items-center px-4 border border-r-0 border-zinc-300 bg-zinc-50 text-sm font-medium text-zinc-600 transition-colors group-focus-within:border-black">
                                            +977
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-2">Required for delivery coordination. Currently supporting Nepal region only.</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Delivery Section */}
                        <section>
                            <h2 className="font-serif text-3xl text-black mb-6">Delivery</h2>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="First Name *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                />
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="City *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Apartment, House No, Street name, etc. *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                />
                            </div>
                        </section>

                        {/* 3. Payment Method */}
                        <section>
                            <h2 className="font-serif text-3xl text-black mb-6">Payment Method</h2>
                            <div className="space-y-3">

                                {/* Esewa Disabled */}
                                <div className="border border-zinc-200 p-4 opacity-50 cursor-not-allowed bg-zinc-50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-full border border-zinc-300" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-black">Esewa</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-medium">Not supported right now</span>
                                </div>

                                {/* Khalti Disabled */}
                                <div className="border border-zinc-200 p-4 opacity-50 cursor-not-allowed bg-zinc-50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-full border border-zinc-300" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-black">Khalti</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-medium">Not supported right now</span>
                                </div>

                                {/* Cash on Delivery Active */}
                                <div className="border border-black p-4 bg-zinc-50 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-full border-[5px] border-black flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-black">Cash on Delivery</span>
                                            <span className="text-xs text-zinc-500 mt-0.5">Pay with cash upon delivery.</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Terms and Submit */}
                        <div className="pt-8 mt-2 border-t border-zinc-200">
                            <p className="text-xs text-zinc-500 leading-relaxed mb-8">
                                By clicking on continue, you agree to place your order and accept our <a href="#" className="underline underline-offset-2 hover:text-black transition-colors">Terms and Conditions</a>,
                                as well as our <a href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Your personal data will be used to process your order,
                                support your experience throughout this website, and for other purposes described in our privacy policy.
                            </p>
                            <CheckoutButton
                                className="w-full py-7 text-base shadow-lg shadow-black/10 mt-4"
                                text="Place Order"
                            />
                        </div>

                        {/* Order Summary (Mobile Only - positioned after Submit) */}
                        <div className="block lg:hidden bg-zinc-50 border border-zinc-200 p-4 rounded-sm mt-8">
                            <h2 className="font-serif text-lg text-black mb-4 border-b border-zinc-200 pb-3">Order Summary</h2>

                            {/* Items List (Extra Compact) */}
                            <div className="flex flex-col gap-3 mb-4">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-center group">
                                        <div className="relative w-12 aspect-[4/5] bg-white overflow-hidden shrink-0 border border-zinc-200 mix-blend-multiply">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Quantity Badge slightly overlapping */}
                                            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-500 text-white rounded-full flex items-center justify-center text-[8px] font-medium z-10 shadow-sm">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <h4 className="font-serif text-sm text-black leading-tight">{item.name}</h4>
                                            <p className="text-[10px] text-zinc-500">{item.color} / {item.size}</p>
                                        </div>
                                        <div className="text-sm font-medium text-black">
                                            Rs. {item.price.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-[1px] bg-zinc-200 mb-4" />

                            {/* Totals Table (Borderless, compact) */}
                            <div className="flex flex-col gap-2 font-sans text-xs text-zinc-600 mb-4">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium">Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className="text-black font-medium">Rs. {shipping.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-200">
                                    <span className="text-sm text-black font-medium">Total</span>
                                    <div className="flex items-end gap-1.5 text-black">
                                        <span className="text-[9px] text-zinc-500 font-medium mb-0.5">NPR</span>
                                        <span className="font-serif text-lg font-medium tracking-tight">Rs. {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary (Desktop Only) */}
                    <div className="hidden lg:flex w-full lg:w-[45%] flex-col pt-8 lg:pt-0">
                        {/* Sticky container on large screens */}
                        <div className="lg:sticky lg:top-32 bg-zinc-50 p-6 md:p-8 rounded-sm">
                            <h2 className="font-serif text-xl md:text-2xl text-black mb-6 border-b border-zinc-200 pb-4">Order Summary</h2>

                            {/* Items List (Compact) */}
                            <div className="flex flex-col gap-4 mb-6">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center group">
                                        <div className="relative w-16 aspect-[4/5] bg-white overflow-hidden shrink-0 border border-zinc-200 mix-blend-multiply">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Quantity Badge slightly overlapping */}
                                            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-zinc-500 text-white rounded-full flex items-center justify-center text-[10px] font-medium z-10 shadow-sm">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <h4 className="font-serif text-sm md:text-base text-black leading-tight mb-0.5">{item.name}</h4>
                                            <p className="text-xs text-zinc-500">{item.color} / {item.size}</p>
                                        </div>
                                        <div className="text-sm font-medium text-black">
                                            Rs. {item.price.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-[1px] bg-zinc-200 mb-6" />

                            {/* Coupon Code Toggle & Form */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setIsCouponExpanded(!isCouponExpanded)}
                                    className="text-sm text-black hover:text-zinc-600 transition-colors underline underline-offset-4 font-medium"
                                >
                                    {isCouponExpanded ? "Hide coupon form" : "Add coupon"}
                                </button>

                                {isCouponExpanded && (
                                    <div className="flex gap-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            className="flex-1 border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400 bg-white"
                                        />
                                        <Button variant="outline" className="rounded-none border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black px-6 text-sm tracking-wide transition-colors">
                                            Apply
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-[1px] bg-zinc-200 mb-6" />

                            {/* Totals Table (Borderless) */}
                            <div className="flex flex-col gap-3 font-sans text-sm text-zinc-600 mb-6">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium">Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className="text-black font-medium">Rs. {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400">
                                    <span>Coupon Discount</span>
                                    <span>Rs. 0.00</span>
                                </div>

                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-200">
                                    <span className="text-base text-black font-medium">Total</span>
                                    <div className="flex items-end gap-2 text-black">
                                        <span className="text-[10px] text-zinc-500 font-medium mb-1">NPR</span>
                                        <span className="font-serif text-2xl font-medium tracking-tight">Rs. {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-100 p-2.5 rounded-sm">
                                <p className="text-[10px] text-left md:text-center text-zinc-500 font-medium uppercase tracking-widest">
                                    Pricing are inclusive of Tax
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
