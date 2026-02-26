import { useState, useEffect, useCallback, useRef } from 'react';

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
    category?: string[];
    material?: string[];
    color?: string[];
    min_price?: number;
    max_price?: number;
    sort?: string;
}

export interface UseProductsResult {
    products: Product[];
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    error: Error | null;
    totalActiveFilters: number;
    loadMore: () => void;
}

export function useProducts(options: FetchProductsOptions): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [offset, setOffset] = useState<number>(0);

    const LIMIT = options.limit || 20;

    // Calculate total active filters for UI
    const totalActiveFilters =
        (options.category?.length || 0) +
        (options.material?.length || 0) +
        (options.color?.length || 0) +
        (options.min_price !== undefined ? 1 : 0) +
        (options.max_price !== undefined ? 1 : 0);

    // Reset offset when filters change
    useEffect(() => {
        setOffset(0);
        // We no longer clear products here so the UI can display them muted while fetching
        setHasMore(true);
    }, [
        LIMIT,
        JSON.stringify(options.category), JSON.stringify(options.material), JSON.stringify(options.color),
        options.min_price, options.max_price, options.sort
    ]);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (offset === 0) setLoading(true);
            else setLoadingMore(true);
            setError(null);

            isFetchingRef.current = true;

            try {
                // Build query params
                const params = new URLSearchParams();

                params.append('limit', LIMIT.toString());
                params.append('offset', offset.toString());

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
                const newProducts = result.data || [];

                if (offset === 0) {
                    setProducts(newProducts);
                } else {
                    setProducts(prev => {
                        const existingIds = new Set(prev.map(p => p.id));
                        const uniqueNew = newProducts.filter((p: Product) => !existingIds.has(p.id));
                        return [...prev, ...uniqueNew];
                    });
                }

                if (newProducts.length < LIMIT) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
                setLoadingMore(false);
                isFetchingRef.current = false;
            }
        };

        // Debounce fetching slightly to avoid spamming the API
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [
        offset, // Depend on offset to trigger new fetches for loadMore
        LIMIT,
        JSON.stringify(options.category), JSON.stringify(options.material), JSON.stringify(options.color),
        options.min_price, options.max_price, options.sort
    ]);

    const loadMore = useCallback(() => {
        if (!loading && !loadingMore && hasMore && !isFetchingRef.current) {
            isFetchingRef.current = true;
            setOffset(prev => prev + LIMIT);
        }
    }, [loading, loadingMore, hasMore, LIMIT]);

    return { products, loading, loadingMore, hasMore, error, totalActiveFilters, loadMore };
}

export function useCollectionCounts() {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
                const response = await fetch(`${apiUrl}/products/collection-counts`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch collection counts: ${response.statusText}`);
                }
                const result = await response.json();
                setCounts(result.data || {});
            } catch (err: any) {
                console.error("Error fetching collection counts:", err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    return { counts, loading, error };
}
