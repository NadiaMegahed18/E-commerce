import React from 'react'
import PremiumLoader from './_components/PremiumLoader/PremiumLoader'

export default function loading() {
  return (
    <div className='h-screen bg-[#fcfcfb] flex justify-center items-center'>
      <PremiumLoader />
    </div>
  )
}
