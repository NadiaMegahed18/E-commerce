"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from "@/images/freshcart-logo.svg"
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, Menu, X, User, LogOut, Home, Tag, Heart } from 'lucide-react'
import { cn } from '@/lib/utils' // You might need to create this or just use template literals if utils doesn't exist. I'll assume standard shadcn setup or use utility classes directly.

export default function Navbar() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/login" })
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/wishlist", label: "Wish List", icon: Heart },
    { href: "/products", label: "Products", icon: Tag },
    { href: "/categories", label: "Categories", icon: Menu },
    { href: "/brands", label: "Brands", icon: Tag },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-32 h-10 transition-transform duration-300 group-hover:scale-105">
                {/* Ensure logo path is correct or use a text fallback if image fails */}
                <Image src={logo} alt='FreshCart' fill className="object-contain" priority />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-emerald-600 font-bold transition-colors flex items-center gap-2 text-sm uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors hover:bg-emerald-50 rounded-full group">
                <ShoppingCart size={22} />
                {/* Badge could go here */}
              </Link>

              {session ? (
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      {session.user?.name?.[0]?.toUpperCase() || <User size={16} />}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                      {session.user?.name?.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-gray-700 font-semibold hover:text-emerald-600 transition-colors">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg shadow-emerald-200 hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-fade-in-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon size={20} className="text-emerald-500" />
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2"></div>
            {session ? (
              <>
                <Link href="/cart" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium">
                  <ShoppingCart size={20} className="text-emerald-500" /> Cart
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 font-medium w-full text-left"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full text-center py-3 font-bold text-gray-700 border border-gray-200 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full text-center py-3 font-bold text-white bg-emerald-600 rounded-xl shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}