"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import Link from 'next/link'
import { CreditCard, MapPin, Phone, Info, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const checkoutSchema = z.object({
    details: z.string().min(5, "Details are required (min 5 chars)"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    city: z.string().min(3, "City is required"),
})

type CheckoutType = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutType>({
        resolver: zodResolver(checkoutSchema)
    })

    async function handleCheckout(values: CheckoutType) {
        console.log("Processing payment with:", values)
        toast.success("Redirecting to payment gateway...", { position: "top-center" })
        // In a real app, you'd call an API here to get the checkout session URL
        // For now, let's just simulate it
        setTimeout(() => {
            toast.info("Payment simulation: Order placed!")
            router.push("/")
        }, 2000)
    }

    return (
        <div className="min-h-screen h-screen flex items-center justify-center p-4 bg-[#fcfcfb] overflow-hidden">
            <div className="w-full max-w-5xl space-y-3 animate-in fade-in zoom-in-95 duration-700">

                {/* Header Section - Wide & Visible */}
                <div className="text-center space-y-1">
                    <Link href="/cart" className="inline-flex items-center gap-2 text-[#4A6B6B] hover:text-[#A67B5B] transition-all font-bold text-xs uppercase tracking-widest opacity-60">
                        <ArrowLeft size={14} /> Back to selection
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-[1000] text-gray-900 tracking-tighter leading-none">
                        Checkout<span className="text-[#A67B5B]">.</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px]">Shipping & Delivery Information</p>
                </div>

                {/* Form Card - Wide Vertical Stack */}
                <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(74,107,107,0.05)] border border-gray-100/50">
                    <form onSubmit={handleSubmit(handleCheckout)} className="space-y-4">

                        <div className="grid grid-cols-1 gap-4 border-b border-gray-50 pb-6">

                            <Field className="space-y-1">
                                <div className="flex items-center gap-1.5 ml-1">
                                    <Info size={12} className="text-[#4A6B6B]" />
                                    <FieldLabel className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e]">Delivery Details</FieldLabel>
                                </div>
                                <Input
                                    {...register("details")}
                                    placeholder="Enter your full delivery address"
                                    className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                                />
                                {errors.details && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.details.message}</p>}
                            </Field>

                            <Field className="space-y-1">
                                <div className="flex items-center gap-1.5 ml-1">
                                    <Phone size={12} className="text-[#4A6B6B]" />
                                    <FieldLabel className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e]">Phone Number</FieldLabel>
                                </div>
                                <Input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="Enter your active phone number"
                                    className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                                />
                                {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.phone.message}</p>}
                            </Field>

                            <Field className="space-y-1">
                                <div className="flex items-center gap-1.5 ml-1">
                                    <MapPin size={12} className="text-[#4A6B6B]" />
                                    <FieldLabel className="font-black text-[13px] uppercase tracking-wider text-[#1a2e2e]">City</FieldLabel>
                                </div>
                                <Input
                                    {...register("city")}
                                    placeholder="Enter your city name"
                                    className="h-11 md:h-12 rounded-lg border-gray-100 focus:border-[#4A6B6B] focus:ring-2 focus:ring-[#4A6B6B]/5 bg-gray-50/20 transition-all font-medium text-base px-5"
                                />
                                {errors.city && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.city.message}</p>}
                            </Field>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                            <div className="flex items-center gap-3 pl-1">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <CreditCard size={18} className="text-emerald-700" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-none">Secure Payment</p>
                                    <p className="text-emerald-600/60 text-[9px] font-bold uppercase tracking-thinner">SSL Encrypted Checkout</p>
                                </div>
                            </div>

                            <Button
                                className="w-full md:w-auto px-16 py-6 text-sm font-black bg-[#4A6B6B] hover:bg-black text-white rounded-lg shadow-lg shadow-[#4A6B6B]/10 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest"
                                type="submit"
                            >
                                Pay Now <CreditCard className="ml-2 w-4 h-4" />
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
