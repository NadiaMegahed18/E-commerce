"use server"

import axios from "axios";

export async function addItemToCart(productId: string, token: string) {
    try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId
            },
            {
                headers: {
                    token: token
                }
            }
        )
        return data;
    } catch (error: any) {
        console.error("Add to cart error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return null;
    }
}
