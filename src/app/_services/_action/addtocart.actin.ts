"use server" 

import axios from "axios";


export async function addItemToCart(productId: string, token: string) {
  try {
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
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
  } catch (error) {
    console.error("Add to cart error:", error);
    return null;
  }
}