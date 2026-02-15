"use server"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/categories";

export async function getAllCategories() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Get categories error:", error.message);
        return null;
    }
}

export async function getSubCategories(categoryId: string) {
    try {
        const res = await fetch(`${BASE_URL}/${categoryId}/subcategories`);
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Get subcategories error:", error.message);
        return null;
    }
}
