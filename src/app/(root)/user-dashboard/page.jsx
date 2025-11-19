"use client"

import { useState } from "react"
import { User, Heart, Calendar, MessageSquare, Star, Search, Settings, Bell, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Navbar from "@/components/Hedaer"

const favoriteVendors = [
  {
    id: 1,
    name: "Royal Wedding Photography",
    category: "Photography",
    rating: 4.8,
    reviews: 124,
    image: "/modern-gym-interior.png",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Elegant Decorations",
    category: "Decoration",
    rating: 4.6,
    reviews: 89,
    image: "/luxury-spa-interior.png",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Dream Wedding Planners",
    category: "Planning",
    rating: 4.9,
    reviews: 156,
    image: "/modern-barber-shop.png",
    location: "Bangalore",
  },
]

const upcomingBookings = [
  {
    id: 1,
    vendor: "Royal Wedding Photography",
    service: "Pre-wedding Shoot",
    date: "2024-03-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    vendor: "Elegant Decorations",
    service: "Venue Decoration",
    date: "2024-04-20",
    time: "8:00 AM",
    status: "pending",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Reviewed",
    vendor: "Royal Wedding Photography",
    date: "2024-01-20",
  },
  {
    id: 2,
    action: "Booked",
    vendor: "Dream Wedding Planners",
    date: "2024-01-18",
  },
  {
    id: 3,
    action: "Added to favorites",
    vendor: "Elegant Decorations",
    date: "2024-01-15",
  },
]

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar  fixed={true}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <div className="flex items-center gap-4 my-4 shadow-md p-4">
              <User className="w-8 h-8 text-pink-600" />
              <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
            </div> */}
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Plan your perfect wedding with our trusted vendors.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Vendors</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Saved for later</p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 upcoming</p>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Help others decide</p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Unread conversations</p>
            </CardContent>
          </Card> */}
        </div>


        {/* Recent Activity */}
        

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700">
                <Search className="w-6 h-6" />
                Find Vendors
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent">
                <Calendar className="w-6 h-6" />
                Plan Wedding
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent">
                <MessageSquare className="w-6 h-6" />
                Get Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Links */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-pink-600 hover:text-pink-700 font-medium">
            ← Back to Business Directory
          </Link>
        </div>
      </div>
    </div>
  )
}
