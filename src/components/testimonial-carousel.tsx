"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "The exquisite craftsmanship and attention to detail are immediately apparent. Best fitting shoes I've ever worn, bar none.",
        name: "James R.",
        title: "Bespoke Client",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
        quote: "A transformative experience from fitting to delivery. These are not just shoes, they are an investment in everyday elegance.",
        name: "Michael T.",
        title: "Loyal Patron",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    {
        quote: "I've tried many luxury brands, but the personal touch and unmatched quality here keep me coming back.",
        name: "David S.",
        title: "Collector",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    }
];

export function TestimonialCarousel() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    React.useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="w-full">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full w-[100vw] relative left-1/2 right-1/2 -mx-[50vw]"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {testimonials.map((t, index) => (
                        <CarouselItem key={index}>
                            <div className="flex flex-col items-center text-center animate-in fade-in duration-700">
                                <div className="flex justify-center mb-8">
                                    <div className="flex gap-1 text-black">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="font-serif text-2xl md:text-4xl leading-snug text-black italic max-w-4xl mx-auto px-4 md:px-12">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-8">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 aspect-square mt-4">
                                        <Image
                                            src={t.avatar}
                                            alt={t.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="text-left mt-4 pt-1">
                                        <p className="text-sm font-medium text-black">{t.name}</p>
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{t.title}</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="flex justify-center gap-2 mt-12">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            current === index ? "bg-black w-6" : "bg-zinc-300 hover:bg-zinc-400"
                        )}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
