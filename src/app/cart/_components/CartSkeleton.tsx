import React from 'react';

export default function CartSkeleton() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 animate-pulse">
            <div className="max-w-6xl mx-auto">
                <div className="h-10 bg-gray-300 w-1/4 rounded mb-8"></div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Products List Skeleton */}
                    <div className="lg:w-2/3 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                                <div className="flex-1 space-y-2 w-full">
                                    <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                                    <div className="h-5 bg-gray-200 w-1/3 rounded"></div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Skeleton */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-xl h-96">
                            <div className="h-8 bg-gray-200 w-1/2 rounded mb-6"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 w-full rounded"></div>
                                <div className="h-4 bg-gray-200 w-full rounded"></div>
                                <div className="h-4 bg-gray-200 w-full rounded"></div>
                            </div>
                            <div className="mt-8 h-12 bg-gray-300 w-full rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
