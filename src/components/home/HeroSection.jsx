"use client"

import { Search, MapPin, Grid3X3, Grid3x3 } from "lucide-react"
import { Input } from "../ui/input"
import { useContext, useState } from "react"
import { AuthContext } from "@/app/context/page"
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HeroSection() {
  const { campaignData, categories } = useContext(AuthContext)

  const router = useRouter();
  const [filters, setFilters] = useState({
    category: "",
    city: "",
  });
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center py-28 md:py-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/img/banner-2.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-10">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Find Everything You Need For Your Dream
          Wedding
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totamrem
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            {/* Category Dropdown */}
            <div className="md:col-span-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Grid3x3 className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <Select onValueChange={(val) => setFilters({ ...filters, category: val })}>
                    <SelectTrigger className="w-full h-10 bg-transparent border-none outline-none text-gray-800">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>

                    <SelectContent className="max-h-60">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>

                        {categories?.map((cat) => (
                          <SelectItem key={cat._id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <Select onValueChange={(val) => setFilters({ ...filters, city: val })}>
                    <SelectTrigger className="w-full h-10 bg-transparent border-none outline-none text-gray-800">
                      <SelectValue placeholder="All Cities" />
                    </SelectTrigger>

                    <SelectContent className="max-h-60">
                      <SelectGroup>
                        <SelectLabel>Cities</SelectLabel>

                        {[...new Set(campaignData.map((c) => c.address))].map((city, i) => (
                          <SelectItem key={i} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                onClick={() => {
                  const formattedCity = filters.city.toLowerCase().replaceAll(" ", "-");
                  const formattedCategory = filters.category.toLowerCase().replaceAll(" ", "-");

                  router.push(`/vendors/${formattedCity}/${formattedCategory}`);
                }}
                className="w-full bg-primary hover:bg-orange-600 text-white p-2 rounded-lg flex items-center justify-center transition"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
