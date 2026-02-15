import React from 'react';
import { getProduct } from '@/app/_services/products.service';
import { Star, ShieldCheck, Truck, RefreshCw, ChevronLeft } from 'lucide-react';
import AddToCartBtn from '@/app/_components/ProductCard/AddToCartBtn';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type ProductDetailsPropsType = {
  params: Promise<{ id: string }>
}

export default async function ProductPage(props: ProductDetailsPropsType) {
  const { id } = await props.params;
  const productData = await getProduct(id);

  if (productData == null) {
    throw new Error(`We couldn't load the product with ID: ${id}. The server returned an error.`);
  }

  // Calculate discount percentage if applicable
  const discount = productData.priceAfterDiscount
    ? Math.round(((productData.price - productData.priceAfterDiscount) / productData.price) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs / Back button */}
      <div className="container mx-auto px-8 md:px-12 max-w-6xl py-8">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors font-medium">
          <ChevronLeft size={20} />
          <span>Back to Collections</span>
        </Link>
      </div>

      <div className="container mx-auto px-8 md:px-12 lg:px-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column: Image Section */}
          <div className="relative">
            <div className="sticky top-24 space-y-4">
              <div className="bg-gray-50 rounded-[40px] overflow-hidden p-8 md:p-12 aspect-square flex items-center justify-center group shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img
                  className="max-h-full w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                  src={productData.imageCover}
                  alt={productData.title}
                />
                {discount && (
                  <div className="absolute top-8 left-8 bg-red-500 text-white px-4 py-1.5 rounded-full font-black text-sm shadow-lg">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails placeholder or extra images if available */}
              <div className="grid grid-cols-4 gap-4">
                {productData.images?.slice(0, 4).map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square bg-gray-50 rounded-2xl p-2 cursor-pointer hover:ring-2 hover:ring-emerald-500/20 transition-all overflow-hidden border border-gray-100">
                    <img src={img} alt={`${productData.title} view ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Content Section */}
          <div className="space-y-8 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
                  {productData.category?.name}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <span className="text-gray-400 text-sm font-medium">{productData.brand?.name}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                {productData.title}
              </h1>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(productData.ratingsAverage) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-900">{productData.ratingsAverage}</span>
                  <span className="text-gray-400 text-sm font-medium">({productData.ratingsQuantity} Reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-4 py-6 border-y border-gray-100">
              {productData.priceAfterDiscount ? (
                <>
                  <span className="text-4xl font-black text-emerald-600">${productData.priceAfterDiscount}</span>
                  <span className="text-xl text-gray-400 line-through font-medium">${productData.price}</span>
                </>
              ) : (
                <span className="text-4xl font-black text-gray-900">${productData.price}</span>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Product Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                {productData.description}
              </p>
            </div>

            <div className="pt-8 space-y-6">
              <AddToCartBtn productId={productData.id} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                  <Truck className="text-emerald-600" size={24} />
                  <span className="text-xs font-bold text-gray-900 uppercase">Free Delivery</span>
                  <p className="text-[10px] text-gray-500 font-medium">On orders above $200</p>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 border-x border-gray-100 px-4">
                  <RefreshCw className="text-emerald-600" size={24} />
                  <span className="text-xs font-bold text-gray-900 uppercase">30 Days Return</span>
                  <p className="text-[10px] text-gray-500 font-medium">Hassle-free exchange</p>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                  <ShieldCheck className="text-emerald-600" size={24} />
                  <span className="text-xs font-bold text-gray-900 uppercase">2 Year Warranty</span>
                  <p className="text-[10px] text-gray-500 font-medium">100% Assurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}