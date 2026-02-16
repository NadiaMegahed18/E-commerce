"use client"
import React from 'react'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { signupDataType, signUPSchema } from '@/Schema/signup.Schema'
import { signupAction } from '../_services/_action/signup.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserPlus } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(signUPSchema)
  })

  async function handleSignUp(values: signupDataType) {
    const res = await signupAction(values);

    if (res?.success) {
      toast.success("Account created successfully! Redirecting to login...", { position: "top-center" })
      setTimeout(() => router.push("/login"), 1500);
    } else {
      toast.error(res?.error || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center p-4 bg-[#fcfcfb] overflow-hidden">
      <div className="w-full max-w-5xl space-y-3 animate-in fade-in zoom-in-95 duration-700">

        {/* Header Section */}
        <div className="text-left space-y-1 pl-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none lowercase">
            register now
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(74,107,107,0.05)] border border-gray-100/50">
          <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">

            <div className="grid grid-cols-1 gap-4 border-b border-gray-50 pb-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1">
                    <FieldLabel htmlFor={field.name} className="font-medium text-sm text-gray-800 ml-1">Name :</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      className="h-11 md:h-12 bg-transparent border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-[#4A6B6B] transition-all font-medium text-base px-1 shadow-none"
                    />
                    {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1">
                    <FieldLabel htmlFor={field.name} className="font-medium text-sm text-gray-800 ml-1">Email :</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type='email'
                      className="h-11 md:h-12 bg-transparent border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-[#4A6B6B] transition-all font-medium text-base px-1 shadow-none"
                    />
                    {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1">
                    <FieldLabel htmlFor={field.name} className="font-medium text-sm text-gray-800 ml-1">Password :</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type='password'
                      className="h-11 md:h-12 bg-transparent border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-[#4A6B6B] transition-all font-medium text-base px-1 shadow-none"
                    />
                    {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1">
                    <FieldLabel htmlFor={field.name} className="font-medium text-sm text-gray-800 ml-1">Re-password :</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type='password'
                      className="h-11 md:h-12 bg-transparent border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-[#4A6B6B] transition-all font-medium text-base px-1 shadow-none"
                    />
                    {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1">
                    <FieldLabel htmlFor={field.name} className="font-medium text-sm text-gray-800 ml-1">Phone :</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type='tel'
                      className="h-11 md:h-12 bg-transparent border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-[#4A6B6B] transition-all font-medium text-base px-1 shadow-none"
                    />
                    {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-2">
              <Button
                className="w-full md:w-auto px-8 py-6 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-none transition-all hover:scale-[1.01] active:scale-[0.99]"
                type="submit"
              >
                Register now
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}