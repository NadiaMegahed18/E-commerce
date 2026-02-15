import * as z from "zod";


export const loginSchema = z.object({

  email: z.string().min(1, "enter vailed email").email("enter vailed email"),
  

  password: z.string().min(1, "plz enter your password").min(8, "password at lest 8 char"),
});




export type loginDataType = z.infer<typeof loginSchema>;
