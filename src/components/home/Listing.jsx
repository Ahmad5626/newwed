"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Heart, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthContext } from "@/app/context/page"
import { Card, CardContent } from "@/components/ui/card"
const listings = [
  {
    id: 1,
    title: "Saddle & Sip Saloon",
    category: "salon1",
    categoryColor: "bg-primary",
    owner: {
      name: "superbusiness47",
      avatar: "https://i.pravatar.cc/300",
    },
    image:
      "https://image.wedmegood.com/resized/450X/uploads/images/93d9aa860dcf4d0dacfeda4b17f64b1frealwedding/PTN_RUHI+KARTIK_DAY02-5452-3.jpg?crop=224,349,1626,914",
    rating: 4.5,
    reviewCount: 2,
    location: "Melbourne, Victoria, Australia",
    priceRange: "$40 - $999",
    isFavorited: false,
  },

  {
    id: 2,
    title: "Another Saloon",
    category: "salon2",
    categoryColor: "bg-blue-500",
    owner: {
      name: "anotherbusiness",
      avatar: "https://i.pravatar.cc/300",
    },
    image: "https://image.wedmegood.com/resized/450X/uploads/images/76286e68431a4c929007f48f19e380bbrealwedding/SRI01051.jpg?crop=285,1154,1630,917",
    rating: 4.0,
    reviewCount: 5,
    location: "Sydney, New South Wales, Australia",
    priceRange: "$50 - $1500",
    isFavorited: false,
  },
  {
    id: 3,
    title: "Third Saloon",
    category: "salon3",
    categoryColor: "bg-green-500",
    owner: {
      name: "thirdbusiness",
      avatar: "https://i.pravatar.cc/300",
    },
    image: "https://image.wedmegood.com/resized/450X/uploads/images/46f88aa94224455fbc3940697615a453realwedding/NT6_5075-EditLarge.jpeg?crop=145,253,1013,569",
    rating: 3.8,
    reviewCount: 8,
    location: "Brisbane, Queensland, Australia",
    priceRange: "$60 - $1200",
    isFavorited: false,
  },
  {
    id: 4,
    title: "Fourth Saloon",
    category: "salon4",
    categoryColor: "bg-purple-500",
    owner: {
      name: "fourthbusiness",
      avatar: "https://i.pravatar.cc/300",
    },
    image: "https://image.wedmegood.com/resized/450X/uploads/images/4bfb1109e25948b89a7c0fb3fd93adfdrealwedding/ABHI5060Large.jpeg?crop=140,218,1013,569",
    rating: 4.2,
    reviewCount: 10,
    location: "Adelaide, South Australia, Australia",
    priceRange: "$70 - $1300",
    isFavorited: false,
  },
]

const StarRating = ({ rating, reviewCount }) => {


  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        ({rating > 0 ? rating.toFixed(1) : "0"}) {reviewCount} Reviews
      </span>
    </div>
  )
}

const ListingCard = ({ listing, index }) => {
  const [isFavorited, setIsFavorited] = useState(listing.isFavorited)
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))

  const getAverageRating = (reviews) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0
    const total = reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0)
    return (total / reviews.length).toFixed(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >

      <Link href={`/product-details/${listing._id}`} key={listing.id} className="overflow-hidden  transition- !py-0">
        <div className="relative">
          <motion.img
            src={listing.image?.[0]}
            alt={listing.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          />
          {/* <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-48 object-cover" /> */}
        </div>
        <CardContent className="p-4 ">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight py-2">{listing.title}</h3>
            {/* <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-500 capitalize">
                          {listing.category}
                        </span> */}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {renderStars(listing.reviews.length > 0 ? getAverageRating(listing.reviews) : listing.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {listing.reviews.length > 0 ? getAverageRating(listing.reviews) : listing.rating} ({listing.reviewCount} reviews)
            </span>
          </div>



          <div className="flex items-center gap-1 mb-3">
            <MapPin className="-4 h-4 text-primary" />
            <span className="text-sm text-gray-600">
              {listing.location}
              {listing.country ? `, ${listing.country}` : ""}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg text-gray-900">
              ₹{listing.price}
            </span>
            <div size="sm">
              <Link href={`/product-details/${listing._id}`}>View Details</Link>
            </div>
          </div>
        </CardContent>
      </Link>
    </motion.div>
  )
}

export default function Listing() {
  const splideRef = useRef(null)
  const { campaignData } = useContext(AuthContext)

useEffect(() => {
  let slider;

  if (typeof window !== "undefined" && campaignData.length > 0) {
    import("@splidejs/splide").then(({ Splide }) => {
      if (splideRef.current) {
        setTimeout(() => {
          slider = new Splide(splideRef.current, {
            type: "loop",
            perPage: 4,
            perMove: 1,
            gap: "1.5rem",
            pagination: true,
            arrows: true,
            drag: true,
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              640: { perPage: 1 },
            },
          });
          slider.mount();
        }, 100); // ⬅️ 100ms delay fixes first render layout shift
      }
    });
  }

  return () => slider && slider.destroy();
}, [campaignData]);

  return (
    <section className="py-16 bg-gray-50  max-w-7xl mx-auto">
      <div className="container  px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative inline-block">
            Featured Listings
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-0 left-0 h-1 bg-primary rounded-full"
            />
          </h2>
        </motion.div>

        {/* Listings Slider */}
        <div ref={splideRef} className="splide splide--ltr splide--slide">
          <div className="splide__track">
            <ul className="splide__list">
              {campaignData.map((listing, index) => (
                <li key={index} className="splide__slide">
                  <ListingCard listing={listing} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            href="/product-listing"
            size="lg"
            className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            View All Listings
          </Link>
        </motion.div>
      </div>

      {/* Splide CSS */}
      <style jsx>{`
        .splide__arrow {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .splide__arrow:hover {
          background: white;
        }
        .splide__arrow svg {
          fill: #374151;
        }
        .splide__pagination__page {
          background: #d1d5db;
        }
        .splide__pagination__page.is-active {
          background: #f97316;
        }
      `}</style>
    </section>
  )
}
