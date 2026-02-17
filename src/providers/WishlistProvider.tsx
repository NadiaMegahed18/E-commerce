"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getWishlist as fetchWishlistAction } from '@/app/_services/_action/wishlist.action';
import { useSession } from 'next-auth/react';

interface WishlistContextType {
    wishlistIds: string[];
    isLoading: boolean;
    token: string | null;
    refreshWishlist: () => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    addToWishlistLocal: (productId: string) => void;
    removeFromWishlistLocal: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const getCookie = (name: string) => {
        if (typeof window === "undefined") return "";
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
        return "";
    };

    const refreshWishlist = useCallback(async () => {
        const t = getCookie("token-user");
        setToken(t);

        if (!t) {
            setWishlistIds([]);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetchWishlistAction(t);
            if (res && res.status === "success" && Array.isArray(res.data)) {
                const ids = res.data.map((item: any) => item.id || item._id);
                setWishlistIds(ids);
            }
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshWishlist();
    }, [refreshWishlist, session]);

    const isInWishlist = useCallback((productId: string) => {
        return wishlistIds.includes(productId);
    }, [wishlistIds]);

    const addToWishlistLocal = useCallback((productId: string) => {
        setWishlistIds(prev => [...prev, productId]);
    }, []);

    const removeFromWishlistLocal = useCallback((productId: string) => {
        setWishlistIds(prev => prev.filter(id => id !== productId));
    }, []);

    return (
        <WishlistContext.Provider value={{
            wishlistIds,
            isLoading,
            token,
            refreshWishlist,
            isInWishlist,
            addToWishlistLocal,
            removeFromWishlistLocal
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
