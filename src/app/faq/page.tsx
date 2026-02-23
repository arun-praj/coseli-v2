"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// FAQ Data Structure
const faqs = [
    {
        category: "Bespoke & Orders",
        questions: [
            {
                q: "How long does a bespoke order take?",
                a: "Our master artisans craft every bespoke pair by hand in our Kathmandu atelier. Please allow 6 to 8 weeks from the date of your fitting (or receipt of measurements) for the completion of your order."
            },
            {
                q: "How do I ensure the perfect custom fit?",
                a: "We highly recommend visiting our atelier for an initial sizing and mold creation. Alternatively, if you are purchasing Ready-to-Wear, refer to our comprehensive sizing guide. If you have any hesitation, our concierge team is available to assist you."
            },
            {
                q: "Can I modify my bespoke order after placing it?",
                a: "You have a 48-hour window after placing a bespoke order to make minor modifications to the leather selection or finish. After this period, the leather is cut and the process cannot be reversed."
            }
        ]
    },
    {
        category: "Shipping & Returns",
        // Skipping some for brevity, but you get the idea
        questions: [
            {
                q: "Do you ship internationally?",
                a: "Yes, we offer worldwide shipping via our logistics partners. Shipping fees and delivery times vary depending on the destination and will be calculated at checkout. Please note that international customers are responsible for any customs duties or taxes."
            },
            {
                q: "What is your return policy?",
                a: "Ready-to-Wear items may be returned within 30 days of delivery for a full refund or exchange, provided they are in pristine, unworn condition with the original packaging. Unfortunately, bespoke and personalized orders are final sale and cannot be returned."
            }
        ]
    },
    {
        category: "Materials & Care",
        questions: [
            {
                q: "What kind of leather do you use?",
                a: "We strictly source premium full-grain calfskin and suede from ethical tanneries. Full-grain leather retains the outermost layer of the hide, ensuring maximum durability, breathability, and the development of a unique, rich patina over time."
            },
            {
                q: "How should I care for my leather shoes?",
                a: "Always store your shoes with cedar shoe trees to maintain their shape and absorb moisture. We recommend regular brushing and the application of a high-quality leather conditioner and wax polish every few weeks of active wear."
            },
            {
                q: "Do you offer a resoling service?",
                a: "Yes. All Coseli shoes feature a traditional Goodyear Welt or Blake stitch construction, making them fully resolable. Send them back to our atelier, and our artisans will breathe new life into your favorite pair."
            }
        ]
    }
];

// Reusable Accordion Item
function AccordionItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-zinc-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
            >
                <span className="font-serif text-lg md:text-xl text-black pr-8">{question}</span>
                <span className="text-zinc-400 group-hover:text-black transition-colors shrink-0">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed pl-4 md:pl-8 border-l-2 border-zinc-100">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-4 md:px-12 max-w-[1000px] mx-auto">
            {/* Header */}
            <div className="mb-20 text-center">
                <h1 className="font-serif text-5xl md:text-6xl text-black tracking-tight mb-6">
                    FAQ
                </h1>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                    Answers to common inquiries regarding our atelier, orders, and services.
                </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-16">
                {faqs.map((categoryBlock, index) => (
                    <section key={index}>
                        <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-black mb-6">
                            {categoryBlock.category}
                        </h2>
                        <div className="border-t border-zinc-200">
                            {categoryBlock.questions.map((item, qIndex) => (
                                <AccordionItem key={qIndex} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer Support CTA */}
            <div className="mt-24 pt-16 border-t border-zinc-100 text-center">
                <h3 className="font-serif text-2xl text-black mb-4">Still have questions?</h3>
                <p className="text-zinc-500 text-sm mb-8">
                    Our concierge team is available to assist you with any bespoke requests or detailed inquiries.
                </p>
                <a
                    href="/contact"
                    className="inline-block border border-black text-black px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300"
                >
                    Contact the Atelier
                </a>
            </div>
        </div>
    );
}
