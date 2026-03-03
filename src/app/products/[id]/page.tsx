import { Metadata, ResolvingMetadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";
import Image from "next/image";

interface Props {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${apiUrl}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: "Product Not Found | Coseli",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${product.name} | Coseli Handcrafted Leather Shoes`,
        description: product.short_description || `Discover ${product.name}, a masterpiece of handcrafted leather footwear by Coseli.`,
        openGraph: {
            title: product.name,
            description: product.short_description,
            images: [product.thumbnail_image_url, ...previousImages],
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.short_description,
            images: [product.thumbnail_image_url],
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const id = (await params).id;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-32 flex items-center justify-center">
                <span className="text-red-500 font-sans tracking-widest uppercase text-sm">Error Loading Product</span>
            </div>
        );
    }

    // JSON-LD Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.thumbnail_image_url,
        "description": product.short_description,
        "brand": {
            "@type": "Brand",
            "name": "Coseli"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "NPR",
            "price": product.base_price,
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <div className="min-h-screen bg-white pt-20 md:pt-24 pb-24 md:pb-32 selection:bg-zinc-200">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
                {/* Breadcrumb minimal */}
                <div className="py-8 text-sm text-zinc-500 font-sans tracking-wide">
                    <a href="/" className="hover:text-black transition-colors">HOME</a>
                    <span className="mx-2">/</span>
                    <a href="/collections" className="hover:text-black transition-colors">SHOP</a>
                    <span className="mx-2">/</span>
                    <span className="text-black uppercase">{product.name}</span>
                </div>

                {/* Client Side Content */}
                <ProductDetailClient product={product} />

            </div>

            {/* You May Also Love (Static mock for now) */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mt-16 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                    <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-black max-w-md">You May Also Love</h2>
                    <a href="/collections" className="text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
                        Discover More
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-16">
                    {/* Related Product 1 */}
                    <a href={`/products/3`} className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1964&auto=format&fit=crop"
                                alt="The Shamba Loafer"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">The Shamba Loafer</h3>
                                <p className="text-zinc-500 text-sm">Textured Leather</p>
                            </div>
                            <span className="font-sans text-sm mt-2">NPR 280</span>
                        </div>
                    </a>

                    {/* Related Product 2 */}
                    <a href={`/products/4`} className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop"
                                alt="Coseli Sneaker 01"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">Coseli Sneaker 01</h3>
                                <p className="text-zinc-500 text-sm">Premium Canvas & Suede</p>
                            </div>
                            <span className="font-sans text-sm mt-2">NPR 240</span>
                        </div>
                    </a>

                    {/* Related Product 3 */}
                    <a href={`/products/5`} className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1620800762635-424a6435bd78?q=80&w=1974&auto=format&fit=crop"
                                alt="Chelsea Boot"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">The Chelsea Boot</h3>
                                <p className="text-zinc-500 text-sm">Full-Grain Leather</p>
                            </div>
                            <span className="font-sans text-sm mt-2">NPR 360</span>
                        </div>
                    </a>

                    {/* Related Product 4 */}
                    <a href={`/products/6`} className="group cursor-pointer block">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 mb-6">
                            <Image
                                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
                                alt="Weekend Loafer"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl mb-1 mt-2">Weekend Loafer</h3>
                                <p className="text-zinc-500 text-sm">Supple Suede</p>
                            </div>
                            <span className="font-sans text-sm mt-2">NPR 260</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
