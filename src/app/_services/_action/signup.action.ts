"use server"
import axios from "axios";

export async function signupAction(userData: any) {
  try {

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData);

    if (data.message === "success") {
      return { success: true, data };
    }
    return { success: false, error: "Signup unexpectedly failed" };
  } catch (error: any) {
    console.error("Signup Error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || "Signup failed" };
  }
}