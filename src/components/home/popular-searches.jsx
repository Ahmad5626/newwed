
"use client"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import Link from "next/link"

const searchData = [
  {
    id: 1,
    title: "Bridal Wear",
    image: "./assets/img/Popular-Searches-1.avif",
    link: "./assets/img/Popular-Searches-1.avif",
  },
  {
    id: 2,
    title: "Bridal Makeup",
    image: "./assets/img/Popular-Searches-2.avif",
    link: "/search/bridal-makeup",
  },
  {
    id: 3,
    title: "Photographers",
    image: "./assets/img/Popular-Searches-3.avif",
    link: "/search/photographers",
  },
  {
    id: 4,
    title: "Invitations",
    image: "./assets/img/Popular-Searches-4.avif",
    link: "/search/invitations",
  },
  {
    id: 5,
    title: "Catering Services",
    image: "./assets/img/Popular-Searches-5.avif",
    link: "/search/catering",
  },
  {
    id: 6,
    title: "Decorators",
    image: "./assets/img/Popular-Searches-1.avif",
    link: "/search/decorators",
  },
  {
    id: 7,
    title: "Mehendi Artists",
    image: "./assets/img/Popular-Searches-2.avif",
    link: "/search/mehendi",
  },
]

export default function PopularSearches() {
  return (
    <section className="py-8 md:py-12 bg-slate-50 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Popular Searches</h2>

        <Splide
          options={{
            type: "loop",
            perPage: 5,
            perMove: 1,
            gap: "1rem",
            pagination: false,
            arrows: true,
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
          }}
          className="popular-searches-slider"
        >
          {searchData.map((item) => (
            <SplideSlide key={item.id}>
              <Link href={`/product-listing?category=${item.title}`} className="block group">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white text-lg leading-tight">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  )
}
