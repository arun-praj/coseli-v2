
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Coseli",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-4 md:px-12 max-w-[1500px] mx-auto">
            {/* Header Section */}
            <div className="mb-16 md:mb-24 text-center md:text-left">
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-black tracking-tight mb-6">
                    Get in Touch
                </h1>
                <p className="text-zinc-500 max-w-xl text-sm md:text-base leading-relaxed hidden md:block">
                    For bespoke inquiries, styling advice, or assistance with an existing order. Our dedicated team is here to help you experience true custom fit.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                {/* Left Column: Form */}
                <div className="lg:col-span-7 w-full lg:sticky lg:top-32">
                    <form className="flex flex-col gap-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="relative group">
                                <label htmlFor="firstName" className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    required
                                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
                                    placeholder="Jane"
                                />
                            </div>
                            <div className="relative group">
                                <label htmlFor="lastName" className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    required
                                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="email" className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div className="relative group">
                            <label htmlFor="subject" className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none placeholder:text-zinc-400"
                                placeholder="Order Inquiry, Bespoke Request, etc."
                            />
                        </div>

                        <div className="relative group">
                            <label htmlFor="message" className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">Message *</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="w-full bg-transparent border-b border-zinc-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors rounded-none resize-none placeholder:text-zinc-400"
                                placeholder="How can we assist you today?"
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full sm:w-auto self-start bg-black text-white px-10 py-5 text-sm font-medium tracking-widest uppercase hover:bg-zinc-800 transition-colors duration-300 mt-4 border border-black"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Right Column: Details & Image */}
                <div className="lg:col-span-5 flex flex-col gap-12 lg:pl-12 lg:border-l lg:border-zinc-100">

                    {/* Information Blocks */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-12 sm:gap-16 lg:gap-12">
                        <div className="space-y-4 flex-1">
                            <h3 className="font-serif text-2xl text-black">The Atelier</h3>
                            <div className="text-zinc-500 text-sm leading-relaxed space-y-1">
                                <p>Bira Complex, first floor, shop n.o : f2 New Road</p>
                                <p>Kathmandu, Nepal 44600D</p>
                                <p className="pt-2 text-black hover:text-zinc-500 transition-colors cursor-pointer inline-block border-b border-zinc-300 pb-0.5">Get Directions</p>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <h3 className="font-serif text-2xl text-black">Contact</h3>
                            <div className="text-zinc-500 text-sm leading-relaxed space-y-2">
                                <p className="flex items-center gap-2">
                                    <span className="w-16 hidden sm:inline-block">Email:</span>
                                    <a href="mailto:concierge@coseli.com" className="text-black hover:underline underline-offset-4 decoration-zinc-300">concierge@coseli.com</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="w-16 hidden sm:inline-block">Phone:</span>
                                    <a href="tel:+977014220000" className="text-black hover:underline underline-offset-4 decoration-zinc-300">+977 1 422 0000</a>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <h3 className="font-serif text-2xl text-black">Hours</h3>
                            <div className="text-zinc-500 text-sm leading-relaxed space-y-1">
                                <p className="flex justify-between max-w-[200px]"><span>Mon - Fri:</span> <span className="text-black">10am — 7pm</span></p>
                                <p className="flex justify-between max-w-[200px]"><span>Saturday:</span> <span className="text-black">11am — 5pm</span></p>
                                <p className="flex justify-between max-w-[200px]"><span>Sunday:</span> <span className="text-black">Closed</span></p>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1">
                            <h3 className="font-serif text-2xl text-black">Socials</h3>
                            <div className="text-zinc-500 text-sm leading-relaxed space-y-2">
                                <p className="flex items-center gap-2">
                                    <a href="#" className="text-black hover:underline underline-offset-4 decoration-zinc-300">Instagram</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <a href="#" className="text-black hover:underline underline-offset-4 decoration-zinc-300">TikTok</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <a href="#" className="text-black hover:underline underline-offset-4 decoration-zinc-300">FB Messenger</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Make a Return Action */}
                    <div className="bg-zinc-50 p-6 md:p-8 border border-zinc-100 mt-4">
                        <h3 className="font-serif text-xl text-black mb-2">Make a Return?</h3>
                        <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                            Need to return or exchange an item? You can quickly initiate the process online by entering your order details.
                        </p>
                        <a href="/returns" className="inline-block border border-black text-black px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300">
                            Initiate Return
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
