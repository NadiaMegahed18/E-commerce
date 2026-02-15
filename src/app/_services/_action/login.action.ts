"use server"
import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction(userData: any) {
  try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", userData);
    
    if (data.message === "success") {
      const cookiy = await cookies();
      cookiy.set("token-user", data.token, {
        httpOnly: false, 
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        path: "/"
      });
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || "Login failed" };
  }
}