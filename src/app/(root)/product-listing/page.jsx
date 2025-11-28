"use client"
import { Suspense } from "react";
import { useState, useMemo, useContext } from "react"
import { useSearchParams } from "next/navigation"
import { Star, MapPin, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Footer from "@/components/Footer"
import Navbar from "@/components/Hedaer"
import { AuthContext } from "@/app/context/page"
import Link from "next/link"
import { motion } from "framer-motion"
const cities = [
  "All Cities",
  "New York",
  "Los Angeles",
  "Miami",
  "Chicago",
  "Boston",
  "Seattle",
  "San Francisco",
  "Las Vegas",
  "Denver",
  "Phoenix",
  "Portland",
  "Austin",
]
const amenities = ["Free Wifi", "Parking", "Air Conditioning", "Swimming Pool", "Pet Friendly"]

export default function BusinessDirectory() {
  const { campaignData } = useContext(AuthContext)
  const searchParams = useSearchParams()

  const urlCategory = searchParams.get("category") || "All"
  const urlCities = searchParams.get("cities") || "" 


  const newurlCategory=urlCategory.replaceAll("-"," ").trim()

  const urlCitiesArray = useMemo(() => {
    if (!urlCities) return []
    return urlCities
      .split(",")
      .map((city) => city.trim())
      .filter((city) => city.length > 0)
  }, [urlCities])


  const categories = useMemo(() => {
    if (!Array.isArray(campaignData)) return ["All"]
    const vendorTypes = campaignData.map((c) => c.vendorType).filter((v) => v && typeof v === "string")
    const uniqueTypes = [...new Set(vendorTypes)]
    return ["All", ...uniqueTypes]
  }, [campaignData])

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (newurlCategory === "All") return "All"
    // Case-insensitive match for URL parameter
    const matchedCategory = categories.find((cat) => cat.toLowerCase() === newurlCategory.toLowerCase())
    return matchedCategory || "All"
  })

    const allAvailableCities = useMemo(() => {
    if (!Array.isArray(campaignData)) return []
    const allCities = campaignData
      .flatMap((c) => (Array.isArray(c.cities) ? c.cities : []))
      .filter((city) => city && typeof city === "string")
    return [...new Set(allCities)]
  }, [campaignData])

  const [selectedCity, setSelectedCity] = useState("All Cities")
   const [selectedCities, setSelectedCities] = useState([]) 
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [minRating, setMinRating] = useState(0)
  const [openOnly, setOpenOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useMemo(() => {
    if (newurlCategory !== "All" && categories.length > 1) {
      const matchedCategory = categories.find((cat) => cat.toLowerCase() === newurlCategory.toLowerCase())
      if (matchedCategory && matchedCategory !== selectedCategory) {
        setSelectedCategory(matchedCategory)
      }
    }

        if (urlCitiesArray.length > 0) {
      const matchedCities = urlCitiesArray
        .filter((urlCity) => allAvailableCities.some((city) => city.toLowerCase() === urlCity.toLowerCase()))
        .map((urlCity) => allAvailableCities.find((city) => city.toLowerCase() === urlCity.toLowerCase()) || urlCity)
      if (matchedCities.length > 0) {
        setSelectedCities(matchedCities)
      }
    }
  }, [newurlCategory,urlCitiesArray, categories])

  const getCityFromAddress = (addr) => {
    if (!addr) return ""
    const parts = addr.split(",").map((s) => s.trim())
    if (parts.length >= 2) return parts[parts.length - 2]
    return parts[0] || ""
  }
  const getCountryFromAddress = (addr) => {
    if (!addr) return ""
    const parts = addr.split(",").map((s) => s.trim())
    return parts[parts.length - 1] || ""
  }

  const normalized = useMemo(() => {
    if (!Array.isArray(campaignData)) return []
    return campaignData.map((c) => {
      const city = getCityFromAddress(c.address)
      const country = getCountryFromAddress(c.address)
      return {
        id: c._id || c.id,
        title: c.title || "Untitled",
        category: c.vendorType || "General",
        image: Array.isArray(c.image) && c.image.length ? c.image[0] : "",
        rating: Number(c.rating ?? 0),
        reviews: Array.isArray(c.reviews) ? c.reviews : [],
        reviewCount: Array.isArray(c.reviews) ? c.reviews.length : 0,
        location: city,
        cities: Array.isArray(c.cities) ? c.cities : [],
        country,
        priceRange: [Number(c.price ?? 0), Number(c.price ?? 0)],
        isOpen: c.isOpen ?? true,
        amenities: Array.isArray(c.amenities) ? c.amenities : [],
        description: c.description || "",
        raw: c,
      }
    })
  }, [campaignData])

  const filteredBusinesses = useMemo(() => {
    const filtered = normalized.filter((b) => {
      if (selectedCategory !== "All" && b.category.toLowerCase() !== selectedCategory.toLowerCase()) return false
      if (selectedCity !== "All Cities" && !(b.location || "").toLowerCase().includes(selectedCity.toLowerCase()))
        return false

         if (selectedCities.length > 0) {
        const hasCityMatch = b.cities.some((businessCity) =>
          selectedCities.some((selectedCity) => businessCity.toLowerCase() === selectedCity.toLowerCase()),
        )
        if (!hasCityMatch) return false
      }
      if (b.priceRange[0] > priceRange[1] || b.priceRange[1] < priceRange[0]) return false
      if ((b.rating || 0) < minRating) return false
      if (openOnly && !b.isOpen) return false
      if (selectedAmenities.length > 0 && b.amenities?.length) {
        const hasAll = selectedAmenities.every((a) => b.amenities.includes(a))
        if (!hasAll) return false
      }
      return true
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "price-low":
          return a.priceRange[0] - b.priceRange[0]
        case "price-high":
          return b.priceRange[1] - a.priceRange[1]
        case "reviews":
          return (b.reviewCount || 0) - (a.reviewCount || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [normalized, selectedCategory, selectedCity,selectedCities, selectedAmenities, priceRange, minRating, openOnly, sortBy])

  const handleAmenityChange = (amenity, checked) => {
    setSelectedAmenities((prev) => (checked ? [...prev, amenity] : prev.filter((a) => a !== amenity)))
  }

    const handleCityChange = (city, checked) => {
    setSelectedCities((prev) => (checked ? [...prev, city] : prev.filter((c) => c !== city)))
  }
  const clearAllFilters = () => {
    setSelectedCategory("All")
    setSelectedCity("All Cities")
     setSelectedCities([])
    setSelectedAmenities([])
    setPriceRange([0, 100000])
    setMinRating(0)
    setOpenOnly(false)
  }


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

  const FilterSidebar = () => (
    <div className="w-full lg:w-66 bg-white border-r border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
          Clear All
        </Button>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${selectedCategory.toLowerCase() === category.toLowerCase()
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
          <div>
        <h3 className="font-medium text-gray-900 mb-3">
          Cities {selectedCities.length > 0 && <span className="text-blue-600">({selectedCities.length})</span>}
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allAvailableCities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city}`}
                checked={selectedCities.some((sc) => sc.toLowerCase() === city.toLowerCase())}
                onCheckedChange={(checked) => handleCityChange(city, Boolean(checked))}
              />
              <label htmlFor={`city-${city}`} className="text-sm text-gray-600 capitalize cursor-pointer">
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Open Location */}
      <div className="flex items-center space-x-2">
        <Checkbox id="open-only" checked={openOnly} onCheckedChange={(c) => setOpenOnly(Boolean(c))} />
        <label htmlFor="open-only" className="text-sm text-gray-600">
          Open Location
        </label>
      </div>

 

      {/* Price Filter (INR) */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Pricing Filter (₹)</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={(v) => setPriceRange(v)}
            max={100000}
            min={0}
            step={500}
            className="w-full"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1, 0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex items-center space-x-2 w-full text-left px-2 py-1 rounded transition-colors ${minRating === rating ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
            >
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-sm text-gray-600">{rating === 0 ? "All" : `${rating}+ stars`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar fixed={true} />
      <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto my-4">
        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Business Directory</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{filteredBusinesses.length} results</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBusinesses.map((b, index) => (
                <motion.div
                  key={index}
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

                  <Link href={`/product-details/${b.id}`} key={b._id} className="overflow-hidden  transition- !py-0">
                    <div className="relative">
                      <motion.img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.05 }}
                      />
                      {/* <img src={b.image || "/placeholder.svg"} alt={b.title} className="w-full h-48 object-cover" /> */}
                    </div>
                    <CardContent className="p-4 ">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight py-2">{b.title}</h3>
                        {/* <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-500 capitalize">
                          {b.category}
                        </span> */}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {renderStars(b.reviews.length > 0 ? getAverageRating(b.reviews) : b.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {b.reviews.length > 0 ? getAverageRating(b.reviews) : b.rating} ({b.reviewCount} reviews)
                        </span>
                      </div>



                      <div className="flex items-center gap-1 mb-3">
                        <MapPin className="-4 h-4 text-primary" />
                        <span className="text-sm text-gray-600">
                          {b.location}
                          {b.country ? `, ${b.country}` : ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg text-gray-900">
                          ₹{b.priceRange[0].toLocaleString()}
                          {b.priceRange[1] !== b.priceRange[0] ? ` - ₹${b.priceRange[1].toLocaleString()}` : ""}
                        </span>
                        <Button size="sm">
                          <div >View Details</div>
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </motion.div>

              ))}
            </div>

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      </Suspense>
    </>
  )
}
