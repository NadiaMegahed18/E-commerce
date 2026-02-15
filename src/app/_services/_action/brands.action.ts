"use server"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/brands";

export async function getAllBrands() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Get brands error:", error.message);
        return null;
    }
}
