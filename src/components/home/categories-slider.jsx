"use client"

import { useEffect, useRef } from "react"
import { Heart, Building2, Plane, Hotel, Utensils, Car } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Venues",
    count: 3,
    icon: Heart,
  },
  {
    id: 2,
    name: "bartender",
   
    icon: Building2,
  },
  {
    id: 3,
    name: "Bridal Makeup",
    
    icon: Plane,
  },
  {
    id: 4,
    name: "Bridal Wears",
    count: 1,
    icon: Hotel,
  },
  {
    id: 5,
    name: "Mehndi Artists",
    count: 3,
    icon: Utensils,
  },
  {
    id: 6,
    name: "Caterers",
    count: 1,
    icon: Car,
  },
]

export default function CategoriesSlider() {
  const splideRef = useRef(null)

  useEffect(() => {
    const loadSplide = async () => {
      const { Splide } = await import("@splidejs/splide")
      await import("@splidejs/splide/css")

      if (splideRef.current) {
        new Splide(splideRef.current, {
          type: "loop",
          perPage: 6,
          perMove: 1,
          gap: "0rem",
          pagination: true,
          arrows: true,
          autoplay: false,
          pauseOnHover: true,
          breakpoints: {
            1280: {
              perPage: 4,
            },
            1024: {
              perPage: 3,
            },
            768: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }).mount()
      }
    }

    loadSplide()
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="text-left mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Most Popular Categories</h2>
      </div>

      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <li key={category.id} className="splide__slide">
                  <div className="text-center py-8 px-4 bg-white shadow-sm border border-gray-200 rounded-lg mx-2">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Link href={`/product-listing?category=${category.name}`}>
                        <IconComponent className="h-10 w-10 text-red-500" />
                      </Link>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>

                 
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .splide__arrow {
          background: rgba(156, 163, 175, 0.3);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          opacity: 0.7;
        }
        
        .splide__arrow svg {
          fill: #6b7280;
        }
        
        .splide__arrow:hover {
          background: rgba(156, 163, 175, 0.5);
          opacity: 1;
        }
        
        .splide__pagination {
          bottom: -40px;
        }
        
        .splide__pagination__page {
          background: #d1d5db;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 4px;
        }
        
        .splide__pagination__page.is-active {
          background: #ef4444;
        }
      `}</style>
    </div>
  )
}
