import React from 'react';

export default function Loading() {
    return (
        <div className='min-h-[80vh] flex flex-col items-center justify-center space-y-4'>
            <div className="w-12 h-12 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Fetching product details...</p>
        </div>
    );
}
