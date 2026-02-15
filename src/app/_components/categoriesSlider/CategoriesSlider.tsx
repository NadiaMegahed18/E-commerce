'use client'

import { useEffect, useState } from 'react'
import MySlider from '../MySlider/MySlider'
import { getAllCategories } from '@/app/_services/categoris.service'

interface Category {
  image: string
}

export default function CategoriesSlider() {
  const [categoriesImages, setCategoriesImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getAllCategories()

      if (!categoriesData) {
        setLoading(false)
        return
      }

      const images = categoriesData.map(
        (category: Category) => category.image
      )

      setCategoriesImages(images)
      setLoading(false)
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <h1>loading..............</h1>
  }

  return (
    <div className="space-y-8 py-10 bg-gray-50/50">
      <div className="w-full">
        <MySlider
          imagesList={categoriesImages}
          slidesPerView={6}
          spaceBetween={0}
        />
      </div>

      {/* Search Bar moved to Products Section */}
    </div>
  )
}
