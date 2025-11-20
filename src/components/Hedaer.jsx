"use client"

import { useState, useEffect, useContext } from "react"
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Camera,
  Palette,
  Flower,
  Monitor,
  Paintbrush,
  Music,
  Gift,
  UtensilsCrossed,
  Shirt,
  Crown,
  Diamond,
  Church,
  Sparkles,
  Car,
  Building,
} from "lucide-react"
import Link from "next/link"
import { AuthContext } from "@/app/context/page"
import { Router } from "next/router"

export default function Navbar({ fixed }) {
  const { authenticatedUser } = useContext(AuthContext)


  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVendorsOpen, setIsVendorsOpen] = useState(false)
  const [isCustomerOpen, setIsCustomerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
 const [fix,setFix]=useState(false)


  useEffect(() => {
  

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    Router.push("/login");
  }

  const vendorCategories = [
    {
      title: "Photography & Videography",
      icon: Camera,
      items: [
        "Wedding Photographers",
        "Candid Photographers",
        "Pre-Wedding Shoots",
        "Drone Photography & Cinematography",
        "Traditional Videography",
        "Live Streaming Services",
      ],
    },
    {
      title: "Makeup & Styling",
      icon: Palette,
      items: [
        "Bridal Makeup Artists",
        "Family / Guest Makeup",
        "Hair Stylists",
        "Nail Art & Extensions",
        "Spa & Skincare Packages",
        "Groom Styling Services",
      ],
    },
    {
      title: "Planning & Décor",
      icon: Flower,
      items: [
        "Wedding Planners",
        "Venue Decorators",
        "Floral Designers",
        "Stage & Mandap Décor",
        "Destination Wedding Planners",
        "Theme Weddings",
      ],
    },
    {
      title: "Virtual & Digital Services",
      icon: Monitor,
      items: [
        "Virtual Wedding Planning",
        "Wedding Websites & Apps",
        "Digital Invitations / E-Cards",
        "Wedding Hashtags & Social Media Management",
        "Online Guest Management",
      ],
    },
    {
      title: "Mehndi & Body Art",
      icon: Paintbrush,
      items: ["Bridal Mehndi Artists", "Family & Guest Mehndi", "Tattoo & Henna Art", "Nail & Hand Accessories"],
    },
    {
      title: "Entertainment & Music",
      icon: Music,
      items: [
        "DJs & Bands",
        "Sangeet Choreographers",
        "Wedding Anchors/MCs",
        "Folk Performers (Dhol, Shehnai, Bhangra, etc.)",
        "Celebrity Performers",
        "Sound & Lighting Setup",
      ],
    },
    {
      title: "Invitations & Gifting",
      icon: Gift,
      items: [
        "Designer Invitations",
        "Digital & Eco-Friendly Invites",
        "Wedding Favors & Hampers",
        "Trousseau Packers",
        "Customized Gifts (engraved items, photo frames)",
        "Return Gifts for Guests",
      ],
    },
    {
      title: "Food & Beverages",
      icon: UtensilsCrossed,
      items: [
        "Catering Services",
        "Multi-Cuisine Buffets",
        "Live Counters & Food Stalls",
        "Wedding Cakes",
        "Bartenders & Mixologists",
        "Mocktail & Juice Bars",
        "Sweet Shops & Mithai Vendors",
      ],
    },
    {
      title: "Bridal Wear",
      icon: Shirt,
      items: [
        "Bridal Lehengas",
        "Designer Sarees (Kanjeevaram, Banarasi, etc.)",
        "Cocktail & Reception Gowns",
        "Pre-Wedding Outfits",
        "Lehenga & Saree Rentals",
        "Trousseau Shopping Assistance",
      ],
    },
    {
      title: "Groom Wear",
      icon: Crown,
      items: [
        "Sherwanis & Indo-Western Wear",
        "Wedding Suits & Tuxedos",
        "Kurta-Pajama Sets",
        "Safa / Pagdi Services",
        "Rental Options",
      ],
    },
    {
      title: "Jewellery & Accessories",
      icon: Diamond,
      items: [
        "Bridal Jewellery (Gold/Diamond/Polki)",
        "Artificial Jewellery",
        "Floral & Contemporary Jewellery",
        "Jewellery on Rent",
        "Clutches, Handbags, & Accessories",
      ],
    },
    {
      title: "Rituals & Traditions",
      icon: Church,
      items: [
        "Wedding Pandits / Priests",
        "Astrologers",
        "Ritual Accessories (Kalash, Pooja Samagri, etc.)",
        "Destination-Specific Ritual Arrangements",
      ],
    },
    {
      title: "Beauty & Grooming",
      icon: Sparkles,
      items: [
        "Pre-Bridal Beauty Packages",
        "Grooming Packages for Grooms",
        "Spa & Salon Services",
        "Skin & Hair Treatments",
      ],
    },
    {
      title: "Hospitality & Logistics",
      icon: Building,
      items: [
        "Venue Selection & Bookings",
        "Hotels & Guest Accommodation",
        "Travel & Transport (cars, luxury buses)",
        "Airport Pickup & Drop",
        "Wedding Concierge Services",
      ],
    },
    {
      title: "Other Services",
      icon: Car,
      items: [
        "Fireworks & Cold Pyros",
        "Photo Booths & Props",
        "Wedding Favours Kiosks",
        "Kids Entertainment Zone",
        "Pet Services for Weddings",
      ],
    },
  ]
useEffect(()=>{
     const token = localStorage.getItem("token");
    if(token){
      setFix(token);
    }
},[])
  return (
    <nav
      className={`w-full z-50 ${!fixed ? "fixed  text-white" : "bg-white shadow-lg text-gray-900"} top-0 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg text-gray-900" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="bg-white px-4 py-2 rounded">
              <span className="text-pink-500 text-xl font-bold italic">wedding planet</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Venues

              </Link>

              {/* <a
                href="#"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Pricing
              </a> */}

              {/* Vendors Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsVendorsOpen(!isVendorsOpen)}
                  className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                    }`}
                >
                  Vendors
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isVendorsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-screen max-w-6xl bg-white rounded-md shadow-xl py-6 z-50 -ml-96 h-screen overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-6">
                      {vendorCategories.map((category, index) => {
                        const IconComponent = category.icon
                        return (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center space-x-2 text-coral-500 font-semibold ">
                              <IconComponent className="h-5 w-5 text-primary" />
                              <span className="text-[10px] text-primary">{category.title}</span>
                            </div>
                            <div className="space-y-1">
                              {category.items.map((item, itemIndex) => (
                                <a
                                  key={itemIndex}
                                  href="#"
                                  className="block px-2 py-1 text-[10px] text-gray-700 hover:bg-coral-50 hover:text-coral-600 rounded transition-colors"
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Gallery


              </Link>

               <Link
                href="/"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
              E-invites

              </Link>
               <Link
                href="/"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
              Planner

              </Link>

               <Link
                href="/blog"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Blog
                {/* <span className="ml-1 text-lg">+</span> */}
              </Link>
              <Link
                href="/about"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Our Story

              </Link>
              <Link
                href="/"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium flex items-center transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Mojo


              </Link>


             
              <Link
                href="/contact"
                className={`hover:text-coral-500 px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900" : ""
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">

            {/* <div className={`flex items-center space-x-1 text-sm ${isScrolled ? "text-gray-900" : "text-white"}`}>
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div> */}

            {/* Customer Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCustomerOpen(!isCustomerOpen)}
                className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded text-sm flex items-center"
              >
                Customer
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isCustomerOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-2 z-50">

                  {fix ? (
                    <div>
                      <Link href={authenticatedUser.registeredType === "vendor" ? "/vendor-dashboard" : "/user-dashboard"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600">
                        My Account
                      </Link>
                      <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  )
                    : <>
                      <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600">
                        Login
                      </Link>
                      <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600">
                        Sign Up
                      </Link>
                    </>}




                </div>
              )}
            </div>

            {/* Vendor Button */}
            {/* <button className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded text-sm flex items-center">
              Vendor
              <ChevronDown className="ml-1 h-4 w-4" />
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`hover:text-coral-500 transition-colors ${isScrolled ? "text-gray-900" : ""}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
              <Link href="/" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Venues

              </Link>
               {/* Mobile Vendors Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsVendorsOpen(!isVendorsOpen)}
                  className="w-full text-left hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900 flex items-center justify-between"
                >
                  Vendors
                  <ChevronDown className={`h-4 w-4 transition-transform ${isVendorsOpen ? "rotate-180" : ""}`} />
                </button>
                {isVendorsOpen && (
                  <div className="pl-6 space-y-2 max-h-96 overflow-y-auto">
                    {vendorCategories.map((category, index) => {
                      const IconComponent = category.icon
                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center space-x-2 text-coral-500 font-medium text-sm py-1">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <span className="text-primary">{category.title}</span>
                          </div>
                          <div className="pl-6 space-y-1">
                            {category.items.slice(0, 3).map((item, itemIndex) => (
                              <a
                                key={itemIndex}
                                href="#"
                                className="block text-sm text-gray-600 hover:text-coral-600 py-1"
                              >
                                {item}
                              </a>
                            ))}
                            {category.items.length > 3 && (
                              <span className="text-xs text-gray-400">+{category.items.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <Link href="/product-listing" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Gallery
              </Link>
              <Link href="/product-listing" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                E-invites

              </Link>
              <Link href="/product-listing" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Planner

              </Link>
            
            
             

             

              <Link href="/about" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Our Story
              </Link>
              <Link href="/blog" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Blog
              </Link>
                <Link href="/product-listing" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Mojo

              </Link>
              <Link href="/contact" className="block hover:text-coral-500 px-3 py-2 text-base font-medium text-gray-900">
                Contact
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsCustomerOpen(!isCustomerOpen)}
                  className={`border px-3 py-1 rounded text-sm flex items-center transition-colors ${isScrolled
                    ? "border-primary text-primary hover:bg-coral-50"
                    : "border-primary text-primary"
                    }`}
                >
                  Customer
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isCustomerOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600">
                      Login
                    </Link>
                    <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600">
                      Sign Up
                    </Link>
                    <Link href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600">
                      My Account
                    </Link>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button className="w-full bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded text-sm flex items-center">
                  Vendor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
