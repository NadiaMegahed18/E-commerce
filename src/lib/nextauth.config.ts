import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextauthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { placeholder: "enter your email", type: "email" },
        password: {}
      },

      authorize: async function (userData) {
        console.log("userData", userData);

        let res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        let finalRes = await res.json();
        console.log("finalRes", finalRes);

        if (finalRes.message == "success") {
          return {
            id: finalRes.user._id || "", 
            name: finalRes.user.name,
            email: finalRes.user.email,
            userTokenFromBackEnd: finalRes.token,
          }
        } else {
          return null;
        }
      }
    })
  ],

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt(params: any) {
      if (params.user) {
        params.token.userTokenFromBackEnd = params.user.userTokenFromBackEnd;
      }
      return params.token;
    },

    session(params: any) {
      console.log("params from session callback", params);
      
      if (params.token) {
        params.session.userTokenFromBackEnd = params.token.userTokenFromBackEnd;
      }
      
      return params.session;
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, 
  }
};