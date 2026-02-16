"use server"
import axios from "axios";

export async function forgotPasswordAction(email: string) {
    try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
        return { success: true, message: data.message };
    } catch (error: any) {
        console.error("Forgot Password Error:", error.response?.data || error.message);
        return { success: false, error: error.response?.data?.message || "Something went wrong" };
    }
}

export async function verifyCodeAction(resetCode: string) {
    try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode });
        return { success: true, message: data.status };
    } catch (error: any) {
        console.error("Verify Code Error:", error.response?.data || error.message);
        return { success: false, error: error.response?.data?.message || "Invalid or expired code" };
    }
}

export async function resetPasswordAction(userData: {
    email: string;
    newPassword: string;
}) {
    try {
        const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", userData);
        return { success: true, token: data.token };
    } catch (error: any) {
        console.error("Reset Password Error:", error.response?.data || error.message);
        return { success: false, error: error.response?.data?.message || "Failed to reset password" };
    }
}
