"use client";

import React, { useEffect, useMemo, useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, MapPin, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Hedaer";
import { AuthContext } from "@/app/context/page";
import Link from "next/link";

export default function BusinessDirectory() {
  const router = useRouter();
  const params = useParams();
  const { campaignData = [], categories = [] } = useContext(AuthContext);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [openOnly, setOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // initialize filters from URL params (if present)
  useEffect(() => {
    if (!params) return;
    if (params.city) {
      const city = String(params.city).replaceAll("-", " ").trim();
      if (city) setSelectedCity(city);
    }
    if (params.category) {
      const cat = String(params.category).replaceAll("-", " ").trim();
      if (cat) setSelectedCategory(cat);
    }
  }, [params]);

  // helpers to parse address -> city/country
  const getCityFromAddress = (addr) => {
    if (!addr || typeof addr !== "string") return "";
    const parts = addr.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) return parts[parts.length - 2];
    return parts[0] || "";
  };
  const getCountryFromAddress = (addr) => {
    if (!addr || typeof addr !== "string") return "";
    const parts = addr.split(",").map((s) => s.trim()).filter(Boolean);
    return parts[parts.length - 1] || "";
  };

  // normalized data from campaignData (memoized)
  const normalized = useMemo(() => {
    if (!Array.isArray(campaignData)) return [];
    return campaignData.map((c) => {
      const city = getCityFromAddress(c.address || "");
      const country = getCountryFromAddress(c.address || "");
      return {
        id: c._id || c.id,
        title: c.title || "Untitled",
        category: (c.category || c.vendorType || "General").toString(),
        image: Array.isArray(c.image) && c.image.length ? c.image[0] : "",
        rating: Number(c.rating ?? 0),
        reviews: Number(c.reviews ?? 0),
        location: city || "",
        country,
        priceRange: [String(c.price ?? 0), String(c.price ?? 0)],
        isOpen: c.isOpen ?? true,
        amenities: Array.isArray(c.amenities) ? c.amenities : [],
        description: c.description || "",
        raw: c,
      };
    });
  }, [campaignData]);

  // unique cities list (from campaignData)
  const uniqueCities = useMemo(() => {
    const cities = campaignData
      .map((c) => (c && c.address ? c.address : ""))
      .filter(Boolean);
    return [...new Set(cities)];
  }, [campaignData]);

  // filter & sort
  const filteredBusinesses = useMemo(() => {
    const filtered = normalized.filter((b) => {
      // Category filter (case-insensitive). "All" means no filter
      if (selectedCategory && selectedCategory !== "All") {
        if (!b.category || b.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // City filter (case-insensitive). "All Cities" means no filter
      if (selectedCity && selectedCity !== "All Cities") {
        if (!b.location || b.location.toLowerCase() !== selectedCity.toLowerCase()) return false;
      }

      // price range check
      if (b.priceRange[0] > priceRange[1] || b.priceRange[1] < priceRange[0]) return false;

      // rating
      if ((b.rating || 0) < minRating) return false;

      // open only
      if (openOnly && !b.isOpen) return false;

      // amenities (all selected must exist in business)
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((a) => b.amenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    });

    // sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "price-low":
          return a.priceRange[0] - b.priceRange[0];
        case "price-high":
          return b.priceRange[1] - a.priceRange[1];
        case "reviews":
          return (b.reviews || 0) - (a.reviews || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [normalized, selectedCategory, selectedCity, selectedAmenities, priceRange, minRating, openOnly, sortBy]);

  // small UI helpers
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedCity("All Cities");
    setSelectedAmenities([]);
    setPriceRange([0, 100000]);
    setMinRating(0);
    setOpenOnly(false);
    setSortBy("rating");
    // optionally navigate back to /vendors (clear URL)
    // router.push("/vendors");
  };

  // handle search navigation (if you want to navigate using filters)
  const goToVendorsUrl = (cityVal = selectedCity, catVal = selectedCategory) => {
    const citySlug = (cityVal || "").toString().trim().toLowerCase().replaceAll(/\s+/g, "-");
    const catSlug = (catVal || "").toString().trim().toLowerCase().replaceAll(/\s+/g, "-");
    router.push(`/vendors/${citySlug || "all"}/${catSlug || "all"}`);
  };

  const FilterSidebar = () => (
    <div className="w-full lg:w-72 bg-white border-r border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === "All" ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-gray-600 hover:bg-gray-50"}`}
          >
            All
          </button>

          {Array.isArray(categories) && categories.map((cat) => (
            <button
              key={cat._id || cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                (selectedCategory || "").toLowerCase() === (cat.name || "").toLowerCase()
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">City</h3>
        <Select value={selectedCity} onValueChange={(val) => setSelectedCity(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Cities">All Cities</SelectItem>
            {uniqueCities.map((city, i) => (
              <SelectItem key={i} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Open Location */}
      <div className="flex items-center space-x-2">
        <Checkbox id="open-only" checked={openOnly} onCheckedChange={(c) => setOpenOnly(Boolean(c))} />
        <label htmlFor="open-only" className="text-sm text-gray-600">
          Open Location
        </label>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Pricing Filter (₹)</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <Slider value={priceRange} onValueChange={(v) => setPriceRange(v)} max={100000} min={0} step={500} className="w-full" />
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
              className={`flex items-center space-x-2 w-full text-left px-2 py-1 rounded transition-colors ${minRating === rating ? "bg-blue-50" : "hover:bg-gray-50"}`}
            >
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-sm text-gray-600">{rating === 0 ? "All" : `${rating}+ stars`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar fixed={true} />
      <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto my-6">
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
          {/* Sidebar (desktop) */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Main */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Header + Search-ish controls */}
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

                {/* quick city/category navigator — optional */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="All Cities">All Cities</option>
                    {uniqueCities.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="All">All</option>
                    {Array.isArray(categories) && categories.map((cat) => (
                      <option key={cat._id || cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <Button onClick={() => goToVendorsUrl(selectedCity, selectedCategory)} size="sm">
                    Go
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBusinesses.map((b) => (
                <Card key={b.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden" >
                    <img src={b.image || "/placeholder.svg"} alt={b.title} className="w-full " />
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">{b.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{b.category}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(b.rating)}</div>
                      <span className="text-sm text-gray-600">
                        {b.rating} ({b.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
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
                        <Link href={`/product-details/${b.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
    </>
  );
}
