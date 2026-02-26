"use client";

import { Lock, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
    className?: string;
    text?: string;
    onClick?: () => void;
    href?: string;
    icon?: "lock" | "bag" | "arrow";
}

export function CheckoutButton({ className = "", text = "Checkout", onClick, href, icon }: CheckoutButtonProps) {
    const defaultClasses = "rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 font-semibold";

    let IconComponent = Lock;
    if (icon === "bag") IconComponent = ShoppingBag;
    else if (icon === "arrow") IconComponent = ArrowRight;
    else if (!icon && text.toLowerCase().includes("order")) IconComponent = ShoppingBag;
    else if (!icon && text.toLowerCase().includes("shopping")) IconComponent = ArrowRight;

    if (href) {
        return (
            <Button asChild className={`${defaultClasses} ${className}`} onClick={onClick}>
                <a href={href}>
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{text}</span>
                </a>
            </Button>
        );
    }

    return (
        <Button
            className={`${defaultClasses} ${className}`}
            onClick={onClick}
        >
            <IconComponent className="w-4 h-4 shrink-0" />
            <span>{text}</span>
        </Button>
    );
}
