"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/CheckoutButton";
import { useCartStore } from "@/lib/store/cart";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
    const [isMounted, setIsMounted] = useState(false);
    const { items: cartItems, getCartTotal, clearCart } = useCartStore();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isCouponExpanded, setIsCouponExpanded] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [checkoutSession, setCheckoutSession] = useState<{ id: string; expiresAt: string } | null>(null);
    const [isStartingSession, setIsStartingSession] = useState(false);
    const [sessionError, setSessionError] = useState("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isExpired, setIsExpired] = useState(false);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("cod");
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);

    // Fetch Payment Methods
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setIsLoadingPaymentMethods(true);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
                const res = await fetch(`${apiUrl}/payment-methods`);
                if (!res.ok) throw new Error("Failed to fetch payment methods");
                const { data } = await res.json();
                setPaymentMethods(data);
                // Set default if exists
                if (data.length > 0) {
                    const cod = data.find((m: any) => m.code === 'cod');
                    setSelectedPaymentMethod(cod ? 'cod' : data[0].code);
                }
            } catch (err) {
                console.error("Payment methods fetch error:", err);
            } finally {
                setIsLoadingPaymentMethods(false);
            }
        };
        fetchPaymentMethods();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMounted(true);
    }, []);

    // Session initialization logic
    useEffect(() => {
        if (!isMounted || isSubmitting) return;

        if (cartItems.length > 0 && !checkoutSession && !sessionError && !isStartingSession) {
            startCheckoutSession();
        }
    }, [isMounted, cartItems.length, checkoutSession, sessionError, isStartingSession, isSubmitting]);

    const startCheckoutSession = async () => {
        setIsStartingSession(true);
        setSessionError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const savedSessionId = localStorage.getItem('coseli_checkout_session_id');

            const response = await fetch(`${apiUrl}/orders/checkout/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    checkout_session_id: savedSessionId || undefined,
                    items: cartItems.map(item => ({
                        variant_id: item.variantId,
                        quantity: item.quantity,
                    }))
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to reserve inventory. One or more items might be out of stock.");
            }

            const sessionId = data.data.sessionId;

            setCheckoutSession({
                id: sessionId,
                expiresAt: data.data.expiresAt
            });
            localStorage.setItem('coseli_checkout_session_id', sessionId);
            setIsExpired(false);
        } catch (error: any) {
            setSessionError(error.message);
        } finally {
            setIsStartingSession(false);
        }
    };

    // Timer Logic
    useEffect(() => {
        if (!checkoutSession?.expiresAt || isExpired) return;

        const expiresAt = new Date(checkoutSession.expiresAt).getTime();

        // Set initial time immediately to avoid flash
        const initialNow = new Date().getTime();
        const initialDistance = expiresAt - initialNow;
        if (initialDistance <= 0) {
            setIsExpired(true);
            setTimeLeft(0);
        } else {
            setTimeLeft(initialDistance);
        }

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiresAt - now;

            if (distance <= 0) {
                clearInterval(timer);
                setTimeLeft(0);
                setIsExpired(true);
                localStorage.removeItem('coseli_checkout_session_id');
            } else {
                setTimeLeft(distance);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [checkoutSession, isExpired]);

    const formatTimeLeft = (ms: number) => {
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (submitSuccess) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
            }, 100);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#000000', '#ffffff', '#a1a1aa', '#3f3f46', '#27272a']
            });
        }
    }, [submitSuccess]);

    const subtotal = getCartTotal();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const shipping = 15;
    const discount = appliedCoupon ? appliedCoupon.discount_amount : 0;
    const total = subtotal + shipping - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;

        setIsValidatingCoupon(true);
        setCouponError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${apiUrl}/coupons/validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: couponCode,
                    items: cartItems.map(item => ({
                        product_id: Number(item.productId),
                        price: item.price,
                        quantity: item.quantity
                    }))
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid coupon code.");
            }

            setAppliedCoupon(data.data);
            setCouponError("");
        } catch (error: any) {
            setAppliedCoupon(null);
            setCouponError(error.message);
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    const handlePlaceOrder = async () => {
        if (isExpired) {
            setSubmitError("Your checkout session has expired. Please refresh the page to re-reserve inventory.");
            return;
        }

        if (!checkoutSession?.id) {
            setSubmitError("Checkout session not initialized. Please refresh the page.");
            return;
        }

        // Check for stale cart items (from before variantId was added to store)
        const hasStaleItems = cartItems.some(item => !item.variantId);
        if (hasStaleItems) {
            setSubmitError("Your cart contains outdated items. Please clear your cart and add the items again.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${apiUrl}/orders/guest`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_info: {
                        contact_no: phone,
                        email: email || undefined,
                    },
                    shipping_address: {
                        first_name: firstName,
                        last_name: lastName,
                        city,
                        address,
                    },
                    items: cartItems.map(item => ({
                        variant_id: item.variantId,
                        quantity: item.quantity,
                    })),
                    coupon_code: appliedCoupon?.code || undefined,
                    checkout_session_id: checkoutSession.id,
                    payment_method: selectedPaymentMethod,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to place order.");
            }

            const responseData = await response.json();
            setTrackingNumber(responseData?.data?.tracking_number || "");

            setSubmitSuccess(true);
            clearCart();
            localStorage.removeItem('coseli_checkout_session_id');
        } catch (error: any) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-white pt-24 md:pt-32 pb-24 md:pb-32 flex items-center justify-center">
                <div className="max-w-md mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl text-black mb-6">Order Placed</h1>
                    {trackingNumber && (
                        <div className="mb-6 p-4 border border-zinc-200 bg-zinc-50">
                            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Your Tracking Number</span>
                            <span className="font-mono text-lg font-medium tracking-wider text-black">{trackingNumber}</span>
                        </div>
                    )}
                    <p className="text-zinc-500 font-sans mb-12">Thank you! Your order has been successfully placed. We will contact you shortly to coordinate delivery.</p>
                    <CheckoutButton href="/collections" text="Continue Shopping" className="w-full py-6 text-base" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20 md:pt-32 pb-24 md:pb-32 selection:bg-zinc-200">
            <div className="max-w-screen-xl mx-auto px-4 md:px-12">

                {/* Logo and minimal header for distraction-free checkout could go here */}
                <div className="mb-12 text-sm text-zinc-500 font-sans tracking-wide">
                    <a href="/cart" className="hover:text-black transition-colors">CART</a>
                    <span className="mx-2">/</span>
                    <span className="text-black uppercase">INFORMATION & SECURE CHECKOUT</span>
                </div>

                {/* Timer Section */}
                {!isStartingSession && !sessionError && !submitSuccess && checkoutSession && (
                    <div className={`mb-8 p-4 border flex items-center justify-between transition-colors ${isExpired ? 'bg-red-50 border-red-200' : timeLeft < 60000 ? 'bg-amber-50 border-amber-200' : 'bg-zinc-50 border-zinc-200'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                            <span className={`text-xs font-medium tracking-widest uppercase ${isExpired ? 'text-red-600' : 'text-zinc-600'}`}>
                                {isExpired ? 'Inventory Released' : 'Inventory Reserved'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-400 font-sans uppercase tracking-[0.2em]">Expires In</span>
                            <span className={`font-mono text-sm font-medium ${isExpired ? 'text-red-600' : timeLeft < 60000 ? 'text-amber-600' : 'text-black'}`}>
                                {formatTimeLeft(timeLeft)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Error Section */}
                {(sessionError || (timeLeft === 0 && isExpired && !submitSuccess && checkoutSession)) && (
                    <div className="mb-12 p-6 border border-red-200 bg-red-50/50 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-500">
                        <h3 className="font-serif text-xl text-red-600 mb-2">
                            {sessionError ? "Inventory Reservation Failed" : "Checkout Session Expired"}
                        </h3>
                        <p className="text-sm text-red-500/80 mb-6 max-w-sm">
                            {sessionError || "We've released your items so others can purchase them. Please refresh to re-reserve and continue."}
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-black text-white hover:bg-zinc-800 rounded-none uppercase text-xs tracking-widest px-8"
                        >
                            Refresh Checkout
                        </Button>
                    </div>
                )}

                {/* Loading State */}
                {isStartingSession && !submitSuccess && (
                    <div className="mb-12 py-12 flex flex-col items-center animate-pulse">
                        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-xs text-zinc-400 uppercase tracking-widest">Reserving Inventory...</p>
                    </div>
                )}

                <div className={`flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 relative ${(isStartingSession || sessionError || (isExpired && !submitSuccess)) ? 'opacity-30 pointer-events-none grayscale' : ''}`}>

                    {/* Left Column: Forms */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-12">

                        {/* 1. Contact Section */}
                        <section>
                            <h2 className="font-serif text-3xl text-black mb-6">Contact</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2 block">Phone Number <span className="text-red-500">*</span></label>
                                    <div className="flex group font-sans">
                                        <span className="inline-flex items-center px-4 border border-r-0 border-zinc-300 bg-zinc-50 text-sm font-medium text-zinc-600 transition-colors group-focus-within:border-black">
                                            +977
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-2">Required for delivery coordination. Currently supporting Nepal region only.</p>
                                </div>

                                <div className="pt-2">
                                    <input
                                        type="email"
                                        placeholder="Email (Optional)"
                                        className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="flex items-center gap-3 mt-4 text-black">
                                        <input type="checkbox" id="newsletter" defaultChecked={false} className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black accent-black" />
                                        <label htmlFor="newsletter" className="text-sm cursor-pointer select-none">Email me with news and offers</label>
                                    </div>
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
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="City *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Apartment, House No, Street name, etc. *"
                                    className="w-full border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </section>

                        {/* 3. Payment Method */}
                        <section>
                            <h2 className="font-serif text-3xl text-black mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                {isLoadingPaymentMethods ? (
                                    <div className="animate-pulse space-y-3">
                                        <div className="h-16 bg-zinc-50 border border-zinc-200" />
                                        <div className="h-16 bg-zinc-50 border border-zinc-200" />
                                    </div>
                                ) : paymentMethods.length > 0 ? (
                                    paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setSelectedPaymentMethod(method.code)}
                                            className={`group relative border px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${selectedPaymentMethod === method.code
                                                ? 'border-black bg-white ring-1 ring-black shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]'
                                                : 'border-zinc-200 bg-white hover:border-zinc-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Premium Radio Button */}
                                                <div className={`w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 ${selectedPaymentMethod === method.code
                                                    ? 'border-black'
                                                    : 'border-zinc-300 group-hover:border-zinc-400'
                                                    }`}>
                                                    <div className={`w-2.5 h-2.5 rounded-full bg-black transition-all duration-300 transform ${selectedPaymentMethod === method.code ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                                        }`} />
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold tracking-tight text-black">{method.name}</span>
                                                    {method.description && (
                                                        <span className="text-xs text-zinc-500 mt-0.5 font-normal leading-relaxed">{method.description}</span>
                                                    )}
                                                </div>
                                            </div>
                                            {method.icon_url && (
                                                <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 p-1.5 flex-shrink-0">
                                                    <img src={method.icon_url} alt={method.name} className="w-full h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-zinc-500 italic">No payment methods available right now.</p>
                                )}
                            </div>
                        </section>

                        {/* Terms and Submit */}
                        <div className="pt-8 mt-2 border-t border-zinc-200">
                            {submitError && (
                                <div className="mb-6 p-4 border border-red-500 bg-red-50 text-red-500 text-sm font-medium">
                                    {submitError}
                                </div>
                            )}
                            <p className="text-xs text-zinc-500 leading-relaxed mb-8">
                                By clicking on continue, you agree to place your order and accept our <a href="#" className="underline underline-offset-2 hover:text-black transition-colors">Terms and Conditions</a>,
                                as well as our <a href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Your personal data will be used to process your order,
                                support your experience throughout this website, and for other purposes described in our privacy policy.
                            </p>
                            <CheckoutButton
                                className="w-full py-7 text-base shadow-lg shadow-black/10 mt-4"
                                text={isSubmitting ? "Placing Order..." : "Place Order"}
                                onClick={handlePlaceOrder}
                            />
                        </div>

                        {/* Order Summary (Mobile Only - positioned after Submit) */}
                        <div className="block lg:hidden bg-zinc-50 border border-zinc-200 p-4 rounded-sm mt-8">
                            <h2 className="font-serif text-lg text-black mb-4 border-b border-zinc-200 pb-3">Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>

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
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <h4 className="font-serif text-sm text-black leading-tight">{item.name} ({item.quantity})</h4>
                                            <p className="text-[10px] text-zinc-500">{item.color} / {item.size}</p>
                                        </div>
                                        <div className="text-sm font-medium text-black">
                                            NPR {item.price.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-[1px] bg-zinc-200 mb-4" />

                            {/* Totals Table (Borderless, compact) */}
                            <div className="flex flex-col gap-2 font-sans text-xs text-zinc-600 mb-4">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium">NPR {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className="text-black font-medium">NPR {shipping.toFixed(2)}</span>
                                </div>
                                {discount > 0 && appliedCoupon && (
                                    <div className="flex justify-between items-center text-green-600 font-medium tracking-tight">
                                        <span>Discount ({appliedCoupon.code})</span>
                                        <span>- NPR {discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-200">
                                    <span className="text-sm text-black font-medium">Total</span>
                                    <div className="flex items-end gap-1.5 text-black">
                                        <span className="text-[9px] text-zinc-500 font-medium mb-0.5">NPR</span>
                                        <span className="font-serif text-lg font-medium tracking-tight">NPR {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary (Desktop Only) */}
                    <div className="hidden lg:flex w-full lg:w-[45%] flex-col pt-8 lg:pt-0">
                        {/* Sticky container on large screens */}
                        <div className="lg:sticky lg:top-32 bg-zinc-50 p-6 md:p-8 rounded-sm">
                            <h2 className="font-serif text-xl md:text-2xl text-black mb-6 border-b border-zinc-200 pb-4">Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>

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
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <h4 className="font-serif text-sm md:text-base text-black leading-tight mb-0.5">{item.name} ({item.quantity})</h4>
                                            <p className="text-xs text-zinc-500">{item.color} / {item.size}</p>
                                        </div>
                                        <div className="text-sm font-medium text-black">
                                            NPR {item.price.toFixed(2)}
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
                                    <div className="flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                placeholder="Coupon code"
                                                className="flex-1 border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400 bg-white uppercase"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                disabled={isValidatingCoupon || !!appliedCoupon}
                                            />
                                            {appliedCoupon ? (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setAppliedCoupon(null);
                                                        setCouponCode("");
                                                    }}
                                                    className="rounded-none border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 px-6 text-sm tracking-wide transition-colors"
                                                >
                                                    Remove
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={handleApplyCoupon}
                                                    disabled={isValidatingCoupon || !couponCode.trim()}
                                                    variant="outline"
                                                    className="rounded-none border-zinc-300 hover:border-black bg-white hover:bg-zinc-50 text-black px-6 text-sm tracking-wide transition-colors"
                                                >
                                                    {isValidatingCoupon ? "..." : "Apply"}
                                                </Button>
                                            )}
                                        </div>
                                        {couponError && (
                                            <p className="text-xs text-red-500 font-medium">{couponError}</p>
                                        )}
                                        {appliedCoupon && (
                                            <p className="text-xs text-green-600 font-medium italic">
                                                Coupon applied! You saved NPR {appliedCoupon.discount_amount.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-[1px] bg-zinc-200 mb-6" />

                            {/* Totals Table (Borderless) */}
                            <div className="flex flex-col gap-3 font-sans text-sm text-zinc-600 mb-6">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-black font-medium">NPR {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className="text-black font-medium">NPR {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400">
                                    <span>Coupon Discount</span>
                                    {discount > 0 ? (
                                        <span className="text-green-600 font-medium">- NPR {discount.toFixed(2)}</span>
                                    ) : (
                                        <span>NPR 0.00</span>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-200">
                                    <span className="text-base text-black font-medium">Total</span>
                                    <div className="flex items-end gap-2 text-black">
                                        <span className="text-[10px] text-zinc-500 font-medium mb-1">NPR</span>
                                        <span className="font-serif text-2xl font-medium tracking-tight">NPR {total.toFixed(2)}</span>
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
