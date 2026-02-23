"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
    className?: string;
    text?: string;
    onClick?: () => void;
    href?: string;
}

export function CheckoutButton({ className = "", text = "Checkout", onClick, href }: CheckoutButtonProps) {
    const defaultClasses = "rounded-none uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 font-semibold";

    if (href) {
        return (
            <Button asChild className={`${defaultClasses} ${className}`} onClick={onClick}>
                <a href={href}>
                    <Lock className="w-4 h-4 shrink-0" />
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
            <Lock className="w-4 h-4 shrink-0" />
            <span>{text}</span>
        </Button>
    );
}
