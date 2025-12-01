import BusinessDirectory from '@/components/product-listing/BusinessDirectory'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>

      <BusinessDirectory/>
    </Suspense>
    </div>
  )
}

export default page
