import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";


export async function getCart(token: string) {
  try {
    const { data } = await axios.get(BASE_URL, { 
      headers: { token } 
    });
    return data;
  } catch (error) {
    return null;
  }
}
export async function updateQuantity(productId: string, count: number, token: string) {
  try {
    const { data } = await axios.put(`${BASE_URL}/${productId}`, { count }, { 
      headers: { token } 
    });
    return data;
  } catch (error) { return null; }
}


export async function removeItem(productId: string, token: string) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${productId}`, { 
      headers: { token } 
    });
    return data;
  } catch (error) { return null; }
}


export async function clearCart(token: string) {
  try {
    const { data } = await axios.delete(BASE_URL, { 
      headers: { token } 
    });
    return data;
  } catch (error) { return null; }
}