"use server"
import { ProductType } from "../_types/product.type";

export async function getAllproducts(): Promise<ProductType[] | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
 
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.error("Error in getAllproducts:", error);
    return null;
  }
}

export async function getProduct(id: string): Promise<ProductType | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      console.warn(`API Warning for product ${id}: ${res.status} ${res.statusText}`);
      return null;
    }

    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.error("Error in getProduct:", error);
    return null;
  }
}
