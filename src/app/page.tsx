import Image from "next/image";
import { getAllproducts } from "./_services/products.service";
import ProductCard from "./_components/ProductCard/ProductCard";
import { Suspense } from "react";
import imageSlide1 from "@/images/slider-image-1.jpeg"
import imageSlide2 from "@/images/slider-image-2.jpeg"
import imageSlide3 from "@/images/slider-image-3.jpeg"
import HeroSlider from "./_components/HeroSection/HeroSlider";
import { lazy } from "react";
import ProductsContainer from "./_components/ProductsContainer/ProductsContainer";

// Lazy load slider
let CategoriesSlider = lazy(() => import("./_components/categoriesSlider/CategoriesSlider"));

export default async function Home() {
  const allProducts = await getAllproducts();
  let imagesList = [imageSlide1.src, imageSlide2.src, imageSlide3.src];

  if (allProducts === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Error loading products. Please try again later.
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-12">

      {/* Hero Slider */}
      <HeroSlider imagesList={imagesList} />

      {/* Categories Slider */}
      <Suspense fallback={<h1 className="text-center p-10 text-xl text-gray-400">Loading Categories...</h1>}>
        <CategoriesSlider />
      </Suspense>

      {/* Interactive Products Section */}
      <ProductsContainer allProducts={allProducts} />

    </div>
  );
}




