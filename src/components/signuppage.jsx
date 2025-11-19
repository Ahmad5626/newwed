"use client"

import { useState, useEffect, useContext } from "react"
import { User, Building2, Phone, Mail, Lock, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { AuthContext } from "@/app/context/page"

const vendorTypes = [
  "Wedding Photographer",
  "Wedding Planner",
  "Caterer",
  "Decorator",
  "Makeup Artist",
  "DJ/Music",
  "Venue",
  "Florist",
  "Transportation",
  "Other",
]

export default function SignupPage() {
  const {userType,setUserType,formData,setFormData,registerHandleSubmit,Toaster,categories,authenticatedUser}=useContext(AuthContext)
  


  
  // ✅ Whenever userType changes, update registeredType
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      registeredType: userType,
    }))
  }, [userType])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleVendorTypeChange = (value) => {
    setFormData({
      ...formData,
      vendorType: value,
    })
  }

  // const handleSignup = (e) => {
  //   e.preventDefault()
  //   console.log("Form Data Submitted:", formData)

    
  // }

  return (
   <>
      <Toaster position="top-center" />
     <div className="min-h-screen flex">
 
      {/* Left Side - Wedding Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="w-full bg-cover bg-center relative"
          style={{
            backgroundImage: "url('./assets/img/login.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Join India's Favourite</h1>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Wedding Planning Platform</h2>
              <p className="text-lg opacity-90">
                {userType === "vendor"
                  ? "Grow your wedding business with thousands of couples"
                  : "Plan your perfect wedding with trusted vendors"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                {userType === "vendor" ? (
                  <>
                    <Building2 className="w-6 h-6 text-blue-500" />
                    Vendor Sign Up
                  </>
                ) : (
                  <>
                    <User className="w-6 h-6 text-pink-500" />
                    User Sign Up
                  </>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">Create your {userType} account to get started</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={registerHandleSubmit} className="space-y-4">
                {/* Hidden Registered Type */}
                <input type="hidden" name="registeredType" value={formData.registeredType} />

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name*</Label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-12 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address*</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-12 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-12 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password*</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Vendor Extra Fields */}
                {userType === "vendor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="brandName">Brand Name*</Label>
                      <Input
                        id="brandName"
                        name="brandName"
                        type="text"
                        placeholder="Enter your Brand Name"
                        value={formData.brandName}
                        onChange={handleInputChange}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Brand City*</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Enter your City Name"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendorType">Vendor Type*</Label>
                      <Select value={formData.vendorType} onValueChange={handleVendorTypeChange}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your vendor type" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((type,i) => (
                            <SelectItem key={i} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className={`w-full h-12 ${
                    userType === "vendor"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-pink-600 hover:bg-pink-700"
                  }`}
                >
                  Create {userType === "vendor" ? "Vendor" : "User"} Account
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className={`font-medium ${
                      userType === "vendor"
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-pink-600 hover:text-pink-700"
                    }`}
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              {/* Switch User Type */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Want to sign up as {userType === "vendor" ? "user" : "vendor"}?{" "}
                  <button
                    type="button"
                    onClick={() => setUserType(userType === "vendor" ? "user" : "vendor")}
                    className={`font-medium ${
                      userType === "vendor"
                        ? "text-pink-600 hover:text-pink-700"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    Click here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
   </>
  )
}
