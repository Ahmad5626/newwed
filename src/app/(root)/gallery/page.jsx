import Footer from '@/components/Footer'
import GalleryPage from '@/components/gallery/galleryHero'
import Navbar from '@/components/Hedaer'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar fixed={true}/>
      <GalleryPage/>
      <Footer/>
    </div>
  )
}

export default page
