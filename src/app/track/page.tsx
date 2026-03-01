"use client";

import { useState, useEffect } from "react";
import { Search, Package, CheckCircle2, Truck, AlertCircle, XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderTrackingData {
    status: string;
    tracking_number: string;
    created_at: string;
    total_amount: number;
    payment_method: string;
    order_items?: any[];
    return_rejection_reason?: string;
    shipping_provider?: string;
    shipping_tracking_number?: string;
    shipping_details?: any;
}

export default function TrackOrderPage() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelError, setCancelError] = useState("");
    const [error, setError] = useState("");
    const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);

    // Return Form States
    const [showReturnForm, setShowReturnForm] = useState(false);
    const [isReturning, setIsReturning] = useState(false);
    const [returnError, setReturnError] = useState("");
    const [returnReason, setReturnReason] = useState("");
    const [returnOtherReason, setReturnOtherReason] = useState("");

    useEffect(() => {
        // Read tracking_no from URL on initial load if present
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const trackingNoParam = params.get("tracking_no");
            if (trackingNoParam) {
                setTrackingNumber(trackingNoParam);
            }
        }
    }, []);

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            setError("Please enter a tracking number");
            return;
        }

        setIsLoading(true);
        setError("");
        setCancelError("");
        setReturnError("");
        setShowReturnForm(false);
        setOrderData(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(trackingNumber.trim())}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to find order");
            }

            const { data } = await response.json();
            setOrderData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!orderData) return;
        setIsCancelling(true);
        setCancelError("");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${apiUrl}/orders/track/${encodeURIComponent(orderData.tracking_number)}/cancel`, {
                method: "POST",
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to cancel order");
            }
            const { data } = await response.json();
            setOrderData(data);
        } catch (err: any) {
            setCancelError(err.message);
        } finally {
            setIsCancelling(false);
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

            const { data } = await response.json();
            setOrderData(data); // update to return_pending
            setShowReturnForm(false);
            setReturnReason("");
            setReturnOtherReason("");
        } catch (err: any) {
            setReturnError(err.message);
        } finally {
            setIsReturning(false);
        }
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'pending': return <Package className="w-8 h-8 text-amber-500" />;
            case 'fulfilled': return <Package className="w-8 h-8 text-blue-500" />;
            case 'shipped': return <Truck className="w-8 h-8 text-indigo-500" />;
            case 'delivered': return <CheckCircle2 className="w-8 h-8 text-green-500" />;
            case 'return_pending': return <RefreshCcw className="w-8 h-8 text-rose-500" />;
            case 'under_return_review': return <AlertCircle className="w-8 h-8 text-amber-500" />;
            case 'returned': return <CheckCircle2 className="w-8 h-8 text-green-500" />;
            case 'cancelled': return <XCircle className="w-8 h-8 text-red-500" />;
            case 'return_rejected': return <XCircle className="w-8 h-8 text-rose-600" />;
            default: return <AlertCircle className="w-8 h-8 text-zinc-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-white pt-24 md:pt-32 pb-24 selection:bg-zinc-200">
            <div className="max-w-xl mx-auto px-4 md:px-8">

                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl text-black mb-4">Track Your Order</h1>
                    <p className="text-sm font-sans tracking-wide text-zinc-500">
                        Enter your tracking number below to see the latest status of your shipment.
                    </p>
                </div>

                <form onSubmit={handleTrackOrder} className="mb-12">
                    <div className="relative flex items-center">
                        <Search className="w-5 h-5 text-zinc-400 absolute left-4" />
                        <input
                            type="text"
                            placeholder="e.g. TRK-170884949..."
                            className="w-full border border-zinc-300 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400 uppercase font-mono"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs mt-3 bg-red-50 p-3 flex items-center gap-2 border border-red-500 font-medium">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </p>
                    )}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors py-7 font-semibold"
                    >
                        {isLoading ? "Searching..." : "Track Order"}
                    </Button>
                </form>

                {orderData && (
                    <div className="border border-zinc-200 bg-zinc-50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1">Order Tracking No.</span>
                                <span className="font-mono text-lg font-medium text-black">{orderData.tracking_number}</span>
                            </div>
                            <div className="text-left md:text-right">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1">Date Placed</span>
                                <span className="text-sm font-medium text-black">{new Date(orderData.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="border-t border-zinc-200 pt-8 pb-4">
                            <div className="flex items-center gap-6">
                                <div className="bg-white p-4 border border-zinc-200 shrink-0 shadow-sm">
                                    <StatusIcon status={orderData.status} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-1">Current Status</span>
                                    <span className="text-2xl font-serif text-black capitalize">{orderData.status.replace(/_/g, ' ')}</span>
                                </div>
                            </div>

                            {['shipped', 'delivered'].includes(orderData.status) && orderData.shipping_provider && (
                                <div className="mt-8 bg-zinc-50 border border-zinc-200 p-6">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-4">Shipping Information</h4>
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Carrier</p>
                                            <p className="text-sm font-medium text-black">{orderData.shipping_provider}</p>
                                        </div>
                                        {orderData.shipping_tracking_number && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Carrier Tracking No.</p>
                                                <p className="text-sm font-mono font-bold text-black">{orderData.shipping_tracking_number}</p>
                                            </div>
                                        )}
                                        {orderData.shipping_details?.contact_name && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Courier Contact</p>
                                                <p className="text-sm font-medium text-black">
                                                    {orderData.shipping_details.contact_name}
                                                    {orderData.shipping_details.contact_number && ` (${orderData.shipping_details.contact_number})`}
                                                </p>
                                            </div>
                                        )}
                                        {orderData.shipping_details?.vehicle_info && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Vehicle Info</p>
                                                <p className="text-sm font-medium text-black">{orderData.shipping_details.vehicle_info}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {orderData.status === 'return_rejected' && (
                                <div className="mt-6 bg-rose-50 border border-rose-200 p-4">
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-rose-900">Return Request Rejected</p>
                                            <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                                                Our team has inspected the returned item and found it does not meet our return eligibility criteria.
                                                The item will be shipped back to you shortly. Please contact support if you have any questions.
                                            </p>
                                            {orderData.return_rejection_reason && (
                                                <p className="text-xs font-bold text-rose-800 mt-2 uppercase tracking-tighter">
                                                    Reason: {orderData.return_rejection_reason}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Two-line Timeline Design */}
                            {orderData.status === 'cancelled' ? (
                                <>
                                    <div className="mt-8 flex items-center w-full max-w-sm mx-auto">
                                        <div className="h-1 flex-1 bg-black" />
                                        <div className="w-3 h-3 rounded-full bg-black" />
                                        <div className="h-1 flex-1 bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mt-3 max-w-sm mx-auto px-1">
                                        <span className="text-black">Pending</span>
                                        <span className="text-red-500">Cancelled</span>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-12 mt-12 mb-8">
                                    {/* Line 1: Order Flow */}
                                    <div className="max-w-xl mx-auto">
                                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-6 text-center">Fulfillment Journey</h4>
                                        <div className="flex items-center w-full px-2">
                                            {[
                                                { key: 'pending', label: 'Pending', icon: Package },
                                                { key: 'fulfilled', label: 'Processing', icon: Package },
                                                { key: 'shipped', label: 'Shipped', icon: Truck },
                                                { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
                                            ].map((step, idx, arr) => {
                                                const statusOrder = ['pending', 'fulfilled', 'shipped', 'delivered', 'return_pending', 'under_return_review', 'returned', 'return_rejected', 'shipping_failed'];
                                                const currentIndex = statusOrder.indexOf(orderData.status);
                                                const stepIndex = statusOrder.indexOf(step.key);

                                                let isCompleted = (stepIndex < currentIndex && currentIndex !== -1) || (orderData.status === 'shipping_failed' && stepIndex < 3);
                                                let isActive = (stepIndex === currentIndex) || (orderData.status === 'shipping_failed' && step.key === 'delivered');
                                                let isError = (orderData.status === 'shipping_failed' && step.key === 'delivered');

                                                return (
                                                    <div key={step.key} className="flex-1 flex flex-col items-center">
                                                        <div className="flex items-center w-full">
                                                            <div className={`h-1 flex-1 ${idx === 0 ? 'invisible' : (isCompleted || isActive ? 'bg-black' : 'bg-zinc-100')}`} />
                                                            <div className="relative">
                                                                <step.icon className={`w-4 h-4 mb-2 transition-colors duration-500 ${isActive ? (isError ? 'text-red-500' : 'text-black') : isCompleted ? 'text-zinc-800' : 'text-zinc-200'}`} />
                                                                <div className={`w-2.5 h-2.5 rounded-full mx-auto transition-all duration-500 ${isActive ? (isError ? 'bg-red-500 scale-125' : 'bg-black scale-125') : isCompleted ? 'bg-black' : 'bg-zinc-100'}`} />
                                                            </div>
                                                            <div className={`h-1 flex-1 ${idx === arr.length - 1 ? 'invisible' : (isCompleted ? 'bg-black' : 'bg-zinc-100')}`} />
                                                        </div>
                                                        <span className={`mt-3 text-[9px] font-bold uppercase tracking-tight transition-colors ${isActive ? (isError ? 'text-red-500' : 'text-black') : isCompleted ? 'text-zinc-900' : 'text-zinc-300'}`}>
                                                            {step.key === 'delivered' && orderData.status === 'shipping_failed' ? 'Failed' : step.label}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Line 2: Return Flow (Visible only if delivered or in return process) */}
                                    {(['delivered', 'return_pending', 'under_return_review', 'returned', 'return_rejected'].includes(orderData.status)) && (
                                        <div className="max-w-md mx-auto pt-8 border-t border-zinc-100 animate-in fade-in slide-in-from-top-4 duration-700">
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-6 text-center">Return Process</h4>
                                            <div className="flex items-center w-full px-2">
                                                {[
                                                    { key: 'return_pending', label: 'Requested', icon: RefreshCcw },
                                                    { key: 'under_return_review', label: 'Reviewing', icon: AlertCircle },
                                                    { key: 'returned', label: 'Returned', icon: CheckCircle2 },
                                                ].map((step, idx, arr) => {
                                                    const statusOrder = ['return_pending', 'under_return_review', 'returned'];
                                                    const currentIndex = statusOrder.indexOf(orderData.status);
                                                    const stepIndex = statusOrder.indexOf(step.key);

                                                    let isCompleted = (stepIndex < currentIndex && currentIndex !== -1) || (orderData.status === 'return_rejected' && stepIndex < 1);
                                                    let isActive = (stepIndex === currentIndex) || (orderData.status === 'return_rejected' && step.key === 'under_return_review');
                                                    let isError = (orderData.status === 'return_rejected' && step.key === 'under_return_review');

                                                    return (
                                                        <div key={step.key} className="flex-1 flex flex-col items-center">
                                                            <div className="flex items-center w-full">
                                                                <div className={`h-1 flex-1 ${idx === 0 ? 'invisible' : (isCompleted || isActive ? 'bg-rose-500' : 'bg-zinc-100')}`} />
                                                                <div className="relative">
                                                                    <step.icon className={`w-4 h-4 mb-2 transition-colors duration-500 ${isActive ? (isError ? 'text-red-500' : 'text-rose-500') : isCompleted ? 'text-rose-400' : 'text-zinc-200'}`} />
                                                                    <div className={`w-2.5 h-2.5 rounded-full mx-auto transition-all duration-500 ${isActive ? (isError ? 'bg-red-500 scale-125' : 'bg-rose-500 scale-125') : isCompleted ? 'bg-rose-500' : 'bg-zinc-100'}`} />
                                                                </div>
                                                                <div className={`h-1 flex-1 ${idx === arr.length - 1 ? 'invisible' : (isCompleted ? 'bg-rose-500' : 'bg-zinc-100')}`} />
                                                            </div>
                                                            <span className={`mt-3 text-[9px] font-bold uppercase tracking-tight transition-colors ${isActive ? (isError ? 'text-red-500' : 'text-rose-600') : isCompleted ? 'text-rose-400' : 'text-zinc-300'}`}>
                                                                {step.key === 'under_return_review' && orderData.status === 'return_rejected' ? 'Rejected' : step.label}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {orderData.status === 'pending' && (
                                <div className="mt-8 pt-8 border-t border-zinc-200 flex flex-col items-center">
                                    <Button
                                        variant="outline"
                                        onClick={handleCancelOrder}
                                        disabled={isCancelling}
                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full max-w-sm"
                                    >
                                        {isCancelling ? "Cancelling..." : "Cancel Order"}
                                    </Button>
                                    {cancelError && (
                                        <p className="text-red-500 text-xs mt-3 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> {cancelError}
                                        </p>
                                    )}
                                </div>
                            )}

                            {orderData.status === 'delivered' && !showReturnForm && (
                                <div className="mt-8 pt-8 border-t border-zinc-200 flex flex-col items-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowReturnForm(true)}
                                        className="text-black border-black hover:bg-black hover:text-white w-full max-w-sm rounded-none uppercase tracking-widest font-semibold py-6"
                                    >
                                        Return Order
                                    </Button>
                                </div>
                            )}

                            {showReturnForm && (
                                <div className="mt-8 pt-8 border-t border-zinc-200 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <h3 className="font-serif text-2xl text-black mb-6 text-center">Initiate Return</h3>

                                    <div className="bg-white border border-zinc-200 p-4 md:p-6 mb-8 max-w-2xl mx-auto">
                                        <h4 className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-4">Items to Return</h4>
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
                                                    <div className="font-mono text-sm">NPR {(item.price_at_purchase * item.quantity).toFixed(2)}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Total Purchase Value</span>
                                            <span className="font-mono font-bold">NPR {orderData.total_amount?.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="max-w-sm mx-auto space-y-6">
                                        <div>
                                            <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-2">Reason for Return *</label>
                                            <select
                                                className="w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
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
                                                    className="w-full border border-zinc-300 p-3 text-sm focus:outline-none focus:border-black transition-colors min-h-[100px]"
                                                    placeholder="Tell us what went wrong..."
                                                    value={returnOtherReason}
                                                    onChange={(e) => setReturnOtherReason(e.target.value)}
                                                />
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-3 pt-4">
                                            <Button
                                                onClick={handleReturnOrder}
                                                disabled={isReturning}
                                                className="w-full rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors py-6 font-semibold"
                                            >
                                                {isReturning ? "Submitting..." : "Confirm Return"}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    setShowReturnForm(false);
                                                    setReturnError("");
                                                }}
                                                disabled={isReturning}
                                                className="w-full uppercase tracking-widest text-zinc-500 hover:text-black hover:bg-zinc-100 py-6"
                                            >
                                                Go Back
                                            </Button>

                                            {returnError && (
                                                <p className="text-red-500 text-xs mt-2 bg-red-50 p-3 flex items-start gap-2 border border-red-500 font-medium">
                                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {returnError}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
