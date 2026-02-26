"use client";
import { useState } from "react";
import { ChevronRight, Package, AlertCircle, CheckCircle2 } from "lucide-react";

interface OrderTrackingData {
    status: string;
    tracking_number: string;
    created_at: string;
    total_amount: number;
    payment_method: string;
    order_items?: any[];
}

export default function ReturnsPage() {
    const [showForm, setShowForm] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");

    // Status & Error States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);

    // Return States
    const [isReturning, setIsReturning] = useState(false);
    const [returnError, setReturnError] = useState("");
    const [returnReason, setReturnReason] = useState("");
    const [returnOtherReason, setReturnOtherReason] = useState("");

    const handleFindOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderNumber.trim() || !email.trim()) {
            setError("Please enter both order number and email.");
            return;
        }

        setIsLoading(true);
        setError("");
        setOrderData(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderNumber.trim())}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to find order");
            }

            const { data } = await response.json();

            if (data.status !== 'delivered') {
                throw new Error(`Order is currently '${data.status}'. Only delivered orders can be returned.`);
            }

            // We can optionally verify the email if we had it, but for now we just find by order NO
            setOrderData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReturnOrder = async () => {
        if (!orderData) return;

        const finalReason = returnReason === "Other" ? returnOtherReason : returnReason;

        if (!finalReason.trim()) {
            setReturnError("Please specify a reason for the return.");
            return;
        }

        setIsReturning(true);
        setReturnError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderData.tracking_number)}/return`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ return_reason: finalReason })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to initiate return");
            }

            // Success
            setIsSubmitted(true);
            setOrderData(null);
            setShowForm(false);
        } catch (err: any) {
            setReturnError(err.message);
        } finally {
            setIsReturning(false);
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
                </div>

                {/* Initiate Return Action Area */}
                <div className="border-t border-zinc-200 pt-16 text-center bg-zinc-50 p-8 md:p-12 mb-20">
                    {!showForm && !isSubmitted && !orderData && (
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

                    {showForm && !isSubmitted && !orderData && (
                        <div className="max-w-md mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="font-serif text-2xl text-black mb-6 text-center">Enter Order Details</h2>
                            <form onSubmit={handleFindOrder} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="orderNumber" className="block text-xs font-medium tracking-widest uppercase text-zinc-500">Order/Tracking Number *</label>
                                    <input
                                        type="text"
                                        id="orderNumber"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                                        required
                                        placeholder="e.g. TRK-123456"
                                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400 font-mono uppercase"
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

                                {error && (
                                    <p className="text-red-500 text-xs mt-3 bg-red-50 p-3 flex items-start gap-2 border border-red-500 font-medium">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
                                    </p>
                                )}

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
                                        disabled={isLoading}
                                        className="bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? "Searching..." : "Find Order"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {orderData && !isSubmitted && (
                        <div className="max-w-xl mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="font-serif text-2xl text-black mb-6 text-center">Select Items to Return</h2>

                            <div className="bg-white border border-zinc-200 p-4 md:p-6 mb-8">
                                <h4 className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-4">Order {orderData.tracking_number}</h4>
                                <div className="space-y-4">
                                    {orderData.order_items?.map((item: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 items-center">
                                            {item.thumbnail ? (
                                                <img src={item.thumbnail} alt={item.product_name || "Product"} className="w-16 h-16 object-cover bg-zinc-100" />
                                            ) : (
                                                <div className="w-16 h-16 bg-zinc-100 flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-zinc-300" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-black text-sm">{item.product_name || "Product Item"}</p>
                                                <p className="text-zinc-500 text-xs mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-mono text-sm">${(item.price_at_purchase * item.quantity).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Refund Amount (Est)</span>
                                    <span className="font-mono font-bold">${orderData.total_amount?.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-sm mx-auto">
                                <div>
                                    <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2">Reason for Return *</label>
                                    <select
                                        className="w-full border border-zinc-300 p-3 text-sm flex-1 bg-white focus:outline-none focus:border-black transition-colors"
                                        value={returnReason}
                                        onChange={(e) => setReturnReason(e.target.value)}
                                    >
                                        <option value="" disabled>Select a reason...</option>
                                        <option value="Wrong Size">Wrong Size</option>
                                        <option value="Defective">Item Defective</option>
                                        <option value="Not as described">Not as described</option>
                                        <option value="Changed mind">Changed my mind</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {returnReason === "Other" && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2">Please specify *</label>
                                        <textarea
                                            className="w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-black transition-colors min-h-[100px] bg-white resize-none"
                                            placeholder="Tell us what went wrong..."
                                            value={returnOtherReason}
                                            onChange={(e) => setReturnOtherReason(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 pt-4">
                                    <button
                                        onClick={handleReturnOrder}
                                        disabled={isReturning}
                                        className="w-full bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                    >
                                        {isReturning ? "Submitting..." : "Confirm Return"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOrderData(null)}
                                        disabled={isReturning}
                                        className="w-full text-zinc-500 text-xs tracking-widest uppercase font-medium hover:text-black transition-colors py-4"
                                    >
                                        Cancel
                                    </button>

                                    {returnError && (
                                        <p className="text-red-500 text-xs mt-2 bg-red-50 p-3 flex items-start gap-2 border border-red-500 font-medium">
                                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {returnError}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {isSubmitted && (
                        <div className="max-w-md mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="font-serif text-2xl text-black">Return Initiated</h2>
                            <p className="text-zinc-600 text-sm leading-relaxed">
                                We've received your return request for order <strong className="text-black">{orderNumber}</strong>. An email with return instructions and next steps has been sent to your address.
                            </p>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setShowForm(false);
                                    setOrderNumber("");
                                    setEmail("");
                                    setReturnReason("");
                                    setReturnOtherReason("");
                                }}
                                className="mt-8 text-xs tracking-widest uppercase font-medium border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors inline-block"
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
