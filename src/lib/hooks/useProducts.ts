import { useState, useEffect } from 'react';

export interface Product {
    id: number;
    name: string;
    short_description: string | null;
    long_description: string | null;
    base_price: number;
    shipping_price: number;
    material: string | null;
    lining: string | null;
    sole: string | null;
    construction_type: string | null;
    category: string | null;
    is_featured: boolean;
    video_url: string | null;
    annotated_image_url: string | null;
    thumbnail_image_url: string | null;
    hover_image_url: string | null;
    created_at: string;
    updated_at: string;
}

interface FetchProductsOptions {
    limit?: number;
    offset?: number;
    category?: string[];
    material?: string[];
    color?: string[];
    min_price?: number;
    max_price?: number;
    sort?: string;
}

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: Error | null;
    totalActiveFilters: number;
}

export function useProducts(options: FetchProductsOptions): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Calculate total active filters for UI
    const totalActiveFilters =
        (options.category?.length || 0) +
        (options.material?.length || 0) +
        (options.color?.length || 0) +
        (options.min_price !== undefined ? 1 : 0) +
        (options.max_price !== undefined ? 1 : 0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                // Build query params
                const params = new URLSearchParams();

                if (options.limit !== undefined) params.append('limit', options.limit.toString());
                if (options.offset !== undefined) params.append('offset', options.offset.toString());
                if (options.category && options.category.length > 0) params.append('category', options.category.join(','));
                if (options.material && options.material.length > 0) params.append('material', options.material.join(','));
                if (options.color && options.color.length > 0) params.append('color', options.color.join(','));
                if (options.min_price !== undefined) params.append('min_price', options.min_price.toString());
                if (options.max_price !== undefined) params.append('max_price', options.max_price.toString());
                if (options.sort) params.append('sort', options.sort);

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
                const response = await fetch(`${apiUrl}/products?${params.toString()}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }

                const result = await response.json();
                setProducts(result.data || []);
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        // Debounce fetching slightly to avoid spamming the API when toggling multiple filters quickly
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [
        options.limit, options.offset, // dependencies that should trigger refetch
        JSON.stringify(options.category), JSON.stringify(options.material), JSON.stringify(options.color),
        options.min_price, options.max_price, options.sort
    ]);

    return { products, loading, error, totalActiveFilters };
}
