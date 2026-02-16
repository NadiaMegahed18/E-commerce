"use client"
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from 'lucide-react'
import { forgotPasswordAction, verifyCodeAction, resetPasswordAction } from '../_services/_action/forgot-password.action'

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // Form for Step 1: Email
    const emailForm = useForm({ defaultValues: { email: "" } });
    // Form for Step 2: Code
    const codeForm = useForm({ defaultValues: { code: "" } });
    // Form for Step 3: New Password
    const passwordForm = useForm({ defaultValues: { newPassword: "" } });

    async function handleEmailSubmit(values: { email: string }) {
        setLoading(true);
        const res = await forgotPasswordAction(values.email);
        setLoading(false);
        if (res.success) {
            toast.success("Verification code sent to your email");
            setEmail(values.email);
            setStep(2);
        } else {
            toast.error(res.error);
        }
    }

    async function handleCodeSubmit(values: { code: string }) {
        setLoading(true);
        const res = await verifyCodeAction(values.code);
        setLoading(false);
        if (res.success) {
            toast.success("Code verified successfully");
            setStep(3);
        } else {
            toast.error(res.error);
        }
    }

    async function handlePasswordSubmit(values: { newPassword: string }) {
        setLoading(true);
        const res = await resetPasswordAction({ email, newPassword: values.newPassword });
        setLoading(false);
        if (res.success) {
            toast.success("Password reset successful! Please login.");
            router.push("/login");
        } else {
            toast.error(res.error);
        }
    }

    return (
        <div className="min-h-screen h-screen flex items-center justify-center p-4 bg-[#fcfcfb] overflow-hidden">
            <div className="w-full max-w-5xl space-y-3 animate-in fade-in zoom-in-95 duration-700">

                {/* Header Section */}
                <div className="text-center space-y-1">
                    <Link href="/login" className="inline-flex items-center gap-2 text-[#4A6B6B] hover:text-[#A67B5B] transition-all font-bold text-xs uppercase tracking-widest opacity-60">
                        <ArrowLeft size={14} /> Back to Sign In
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-[1000] text-gray-900 tracking-tighter leading-none mt-2 uppercase">
                        {step === 1 && "please enter your verification code"}
                        {step === 2 && "verify your identity"}
                        {step === 3 && "reset your password"}
                        <span className="text-[#A67B5B]">.</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px]">
                        {step === 1 && "Start the recovery process"}
                        {step === 2 && "Enter the code sent to your email"}
                        {step === 3 && "Choose a strong new password"}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(74,107,107,0.05)] border border-gray-100/50">

                    {step === 1 && (
                        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
                            <Controller
                                name="email"
                                control={emailForm.control}
                                rules={{ required: "Email is required" }}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-1">
                                        <FieldLabel htmlFor={field.name} className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e] ml-1">Email</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="email"
                                                className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                        {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                                    </Field>
                                )}
                            />
                            <Button
                                className="w-full md:w-auto px-16 py-6 text-sm font-black bg-[#4A6B6B] hover:bg-black text-white rounded-lg shadow-lg shadow-[#4A6B6B]/10 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest border border-gray-200"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "SENDING..." : "VERIFY"}
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-6">
                            <Controller
                                name="code"
                                control={codeForm.control}
                                rules={{ required: "Code is required" }}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-1">
                                        <FieldLabel htmlFor={field.name} className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e] ml-1">Reset Code</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            autoFocus
                                            className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                                            placeholder="Enter 6-digit code"
                                        />
                                        {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                                    </Field>
                                )}
                            />
                            <Button
                                className="w-full md:w-auto px-16 py-6 text-sm font-black bg-[#4A6B6B] hover:bg-black text-white rounded-lg shadow-lg shadow-[#4A6B6B]/10 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "VERIFYING..." : "CONFIRM CODE"}
                            </Button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                            <Controller
                                name="newPassword"
                                control={passwordForm.control}
                                rules={{ required: "New password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-1">
                                        <FieldLabel htmlFor={field.name} className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e] ml-1">New Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            autoFocus
                                            className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                                            placeholder="••••••••"
                                        />
                                        {fieldState.invalid && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{fieldState.error?.message}</p>}
                                    </Field>
                                )}
                            />
                            <Button
                                className="w-full md:w-auto px-16 py-6 text-sm font-black bg-[#4A6B6B] hover:bg-black text-white rounded-lg shadow-lg shadow-[#4A6B6B]/10 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "RESETTING..." : "RESET PASSWORD"}
                            </Button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    )
}
