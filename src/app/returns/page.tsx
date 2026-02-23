"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ReturnsPage() {
    const [showForm, setShowForm] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, accept any order number as valid
        if (orderNumber.trim() && email.trim()) {
            setIsSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-4 md:px-12 max-w-screen-xl mx-auto">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-6xl text-black tracking-tight mb-6">Returns & Exchanges</h1>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                        We want you to love your custom fit. If you're not entirely satisfied with your purchase, we're here to help.
                    </p>
                </div>

                {/* Return Policy Info */}
                <div className="space-y-12 mb-20 text-zinc-600 font-sans leading-relaxed">
                    <section>
                        <h2 className="font-serif text-2xl text-black mb-4">Our Return Policy</h2>
                        <p className="mb-4">
                            You have 30 days from the date of delivery to return or exchange your unworn, unwashed, and unaltered items. All items must be returned in their original packaging, including the dust bag and shoe box.
                        </p>
                        <p>
                            Please note that bespoke or fully custom-made orders are not eligible for returns or exchanges, as they are crafted specifically to your individual measurements and specifications.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-black mb-4">How to Return</h2>
                        <ol className="list-decimal pl-5 space-y-4">
                            <li><strong>Initiate your return:</strong> Click the button below and enter your order number and email address to start the process.</li>
                            <li><strong>Approval:</strong> Once your return is approved, we will email you detailed return instructions.</li>
                            <li><strong>Pack your items:</strong> Securely package the shoes in their original box.</li>
                            <li><strong>Ship it back:</strong> Drop off your package at the designated courier location or schedule a pickup within 7 days.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-black mb-4">Refunds</h2>
                        <p>
                            Once our atelier receives and inspects your returned item (usually within 3-5 business days of receipt), we will process your refund. The funds will be credited back to your original payment method. Please allow up to 10 business days for the refund to reflect on your statement.
                        </p>
                    </section>

                    <section className="bg-zinc-50 p-6 md:p-8 border border-zinc-100 mt-12">
                        <h2 className="font-serif text-2xl text-black mb-4">Need Help?</h2>
                        <p className="mb-6">
                            If you have any questions about your return or exchange, our concierge team is always available to assist you.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 text-black">
                            <p className="flex items-center gap-2">
                                <span className="text-zinc-500 w-16">Email:</span>
                                <a href="mailto:concierge@coseli.com" className="hover:underline underline-offset-4 decoration-zinc-300">concierge@coseli.com</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-zinc-500 w-16">Phone:</span>
                                <a href="tel:+977014220000" className="hover:underline underline-offset-4 decoration-zinc-300">+977 1 422 0000</a>
                            </p>
                        </div>
                        <a href="/contact" className="inline-block border border-black text-black px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300">
                            Visit Contact Page
                        </a>
                    </section>
                </div>

                {/* Initiate Return Action Area */}
                <div className="border-t border-zinc-200 pt-16 text-center bg-zinc-50 p-8 md:p-12">
                    {!showForm && !isSubmitted && (
                        <div className="space-y-6">
                            <h2 className="font-serif text-3xl text-black">Ready to make a return?</h2>
                            <p className="text-zinc-500 text-sm mb-8">Have your order number ready.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors"
                            >
                                Initiate Return <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {showForm && !isSubmitted && (
                        <div className="max-w-md mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="font-serif text-2xl text-black mb-6 text-center">Enter Order Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="orderNumber" className="block text-xs font-medium tracking-widest uppercase text-zinc-500">Order Number *</label>
                                    <input
                                        type="text"
                                        id="orderNumber"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        required
                                        placeholder="e.g. COSELI-123456"
                                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-xs font-medium tracking-widest uppercase text-zinc-500">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Used during checkout"
                                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
                                    />
                                </div>
                                <div className="pt-4 flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="text-xs tracking-widest uppercase text-zinc-500 hover:text-black transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors"
                                    >
                                        Find Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {isSubmitted && (
                        <div className="max-w-md mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-black">Order Found</h2>
                            <p className="text-zinc-600 text-sm leading-relaxed">
                                We've located order <strong className="text-black">{orderNumber}</strong>. An email with return instructions has been sent to <strong className="text-black">{email}</strong>.
                            </p>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setShowForm(false);
                                    setOrderNumber("");
                                    setEmail("");
                                }}
                                className="mt-8 text-xs tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors inline-block"
                            >
                                Return Another Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
