"use client"
import React from 'react'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { loginDataType, loginSchema } from '@/Schema/login.Schema'
import { loginAction } from '../_services/_action/login.action'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<loginDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function handlelogin(values: loginDataType) {
    const res = await loginAction(values);

    if (res?.success) {
      toast.success("Welcome back! Login successful", { position: "top-center" });
      router.push("/");
      router.refresh();
    } else {
      toast.error(res?.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center p-4 bg-[#fcfcfb] overflow-hidden">
      <div className="w-full max-w-5xl space-y-3 animate-in fade-in zoom-in-95 duration-700">

        {/* Header Section - Wide & Visible */}
        <div className="text-center space-y-1">
          <Link href="/" className="inline-flex items-center gap-2 text-[#4A6B6B] hover:text-[#A67B5B] transition-all font-bold text-xs uppercase tracking-widest opacity-60">
            <ArrowLeft size={14} /> Back to collections
          </Link>
          <h1 className="text-5xl md:text-6xl font-[1000] text-gray-900 tracking-tighter leading-none">
            Login<span className="text-[#A67B5B]">.</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px]">Access your premium account</p>
        </div>

        {/* Form Card - Wide Vertical Stack */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(74,107,107,0.05)] border border-gray-100/50">
          <form onSubmit={form.handleSubmit(handlelogin)} className="space-y-4">

            <div className="grid grid-cols-1 gap-4 border-b border-gray-50 pb-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1">
                    <FieldLabel htmlFor={field.name} className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e] ml-1">Email Address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type='email'
                      className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                      placeholder="you@example.com"
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
                    <div className="flex justify-between items-end pr-1">
                      <FieldLabel htmlFor={field.name} className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e] ml-1">Password</FieldLabel>
                      <Link href="/forgot-password" className="text-[10px] font-black text-[#A67B5B] hover:underline uppercase tracking-widest">Forgot?</Link>
                    </div>
                    <Input
                      {...field}
                      id={field.name}
                      type='password'
                      className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                      placeholder="••••••••"
                    />
                    {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                  </Field>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest pl-1">
                Not a member?
                <Link href="/signup" className="text-[#A67B5B] font-black hover:underline ml-2">
                  Sign Up instead
                </Link>
              </p>
              <Button
                className="w-full md:w-auto px-16 py-6 text-sm font-black bg-[#4A6B6B] hover:bg-black text-white rounded-lg shadow-lg shadow-[#4A6B6B]/10 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
                type="submit"
              >
                LOG IN <LogIn className="ml-2 w-4 h-4" />
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}