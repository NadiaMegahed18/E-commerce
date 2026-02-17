import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const cookieStore = await cookies();
  

  const token = cookieStore.get("token-user")?.value;

  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart", 
      { productId }, 
      { headers: { token } } 
    );
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: "error", error: error.response?.data }, { status: 400 });
  }
}