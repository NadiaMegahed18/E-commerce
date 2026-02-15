'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className='min-h-[70vh] flex flex-col items-center justify-center px-4 text-center'>
            <div className="bg-red-50 p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className='text-3xl font-black text-gray-900 mb-2'>Oops! Something went wrong</h2>
            <p className='text-gray-500 max-w-md mb-8'>
                We encountered an error while loading this product. It might be temporarily unavailable or there could be a server issue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => reset()}
                    className='px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-all shadow-lg active:scale-95'
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className='px-8 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-full font-bold transition-all flex items-center justify-center gap-2'
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
