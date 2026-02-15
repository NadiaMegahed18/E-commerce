"use server"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getWishlist(token: string) {
    try {
        const res = await fetch(BASE_URL, {
            headers: { token }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Get wishlist error:", error.message);
        return null;
    }
}

export async function addToWishlist(productId: string, token: string) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify({ productId })
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Add to wishlist error:", error.message);
        return null;
    }
}

export async function removeFromWishlist(productId: string, token: string) {
    try {
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: "DELETE",
            headers: { token }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Remove from wishlist error:", error.message);
        return null;
    }
}
