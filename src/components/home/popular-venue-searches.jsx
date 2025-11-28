'use client'

import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import Link from "next/link"

const venueData = [
  {
    id: 1,
    title: "Banquet Halls",
    image: "./assets/img/Popular-Venue-Searches-1.avif",
    locations: ["Mumbai", "Bangalore", "Pune", "Delhi"],
  },
  {
    id: 2,
    title: "Marriage Garden / Lawns",
    image: "./assets/img/Popular-Venue-Searches-2.avif",
    locations: ["Mumbai", "Bangalore", "Pune", "Goa"],
  },
  {
    id: 3,
    title: "3 Star Hotels with Banquets",
    image: "./assets/img/Popular-Venue-Searches-3.avif",
    locations: ["Mumbai", "Bangalore", "Pune", "Chennai"],
  },
  {
    id: 4,
    title: "Beach Resorts",
    image: "./assets/img/Popular-Venue-Searches-1.avif",
    locations: ["Goa", "Kerala", "Mumbai", "Chennai"],
  },
  {
    id: 5,
    title: "Heritage Venues",
    image: "./assets/img/Popular-Venue-Searches-2.avif",
    locations: ["Rajasthan", "Delhi", "Agra", "Jaipur"],
  },
]

export default function PopularVenueSearches() {
  return (
    <section className="py-8 md:py-12 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Popular Venue Searches</h2>

        <Splide
          options={{
            type: "loop",
            perPage: 4,
            perMove: 1,
            gap: "1rem",
            pagination: false,
            arrows: true,
            breakpoints: {
              1024: {
                perPage: 2,
              },
              640: {
                perPage: 1,
              },
            },
          }}
          className="venue-slider"
        >
          {venueData.map((venue) => (
            <SplideSlide key={venue.id}>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                <Link href={`/product-listing?cities=${venue.locations}`}>

                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 text-lg">{venue.title}</h3>
                  <div className="flex flex-wrap gap-1 text-sm">
                    {venue.locations.map((location, index) => (
                      <span key={location}>
                        <Link
                          href={`/venues/${location.toLowerCase()}`}
                          className="text-rose-600 hover:text-rose-700 transition-colors"
                        >
                          {location}
                        </Link>
                        {index < venue.locations.length - 1 && <span className="text-slate-400 mx-1">|</span>}
                      </span>
                    ))}
                    <span className="text-slate-400 mx-1">|</span>
                    <Link href="/venues" className="text-rose-600 hover:text-rose-700 transition-colors">
                      More
                    </Link>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  )
}
