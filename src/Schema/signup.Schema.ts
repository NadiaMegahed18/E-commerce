import * as z from "zod";

export const signUPSchema = z.object({
  name: z.string().min(1, "plz enter your name").min(3, "name must be at lest 3 char"),
  phone: z.string().min(1, "plz enter your name").regex(/^01[1250][0-9]{8}$/),
  email: z.string().min(1, "enter vailed email").email("enter vailed email"),
  password: z.string().min(1, "plz enter your password").min(8, "password at lest 8 char"),
  rePassword: z.string().min(1, "plz enter your re password").min(8, "re password must be at lest 8 char")
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "password and rePassword not matched"
});

export type signupDataType = z.infer<typeof signUPSchema>;








