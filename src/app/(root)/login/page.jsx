"use client"

import { useContext, useState } from "react"
import { User, Building2, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { AuthContext } from "@/app/context/page"

export default function LoginPage() {
  const {loginFormData,setLoginFormData,loginHandleSubmit,Toaster,handleInputChange} = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("user")
 

 

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   // Handle login logic here
  //   console.log("Login attempt:", { ...loginFormData, userType: activeTab })
  // }

  return (
  <>
  <Toaster position="top-center"  />
      <div className="min-h-screen flex">
      {/* Left Side - Wedding Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('./assets/img/login.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">India's Favourite</h1>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Wedding Planning Platform</h2>
              <p className="text-lg opacity-90">Connect with the best wedding vendors and plan your perfect day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">Sign In/Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Type Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User
                  </TabsTrigger>
                  <TabsTrigger value="vendor" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Vendor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="space-y-4 mt-6">
                  <form onSubmit={loginHandleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-pink-500" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter email or mobile*"
                        value={loginFormData.email}
                        onChange={handleInputChange}
                        className="pl-12 h-12 border-gray-300"
                        required
                      />
                    </div>

                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter password*"
                      value={loginFormData.password}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300"
                      required
                    />

                    <Button type="submit" className="w-full h-12 bg-pink-600 hover:bg-pink-700">
                      Sign In as User
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="vendor" className="space-y-4 mt-6">
                  <form onSubmit={loginHandleSubmit} className="space-y-4">
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-blue-500" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter business email or mobile*"
                        value={loginFormData.email}
                        onChange={handleInputChange}
                        className="pl-12 h-12 border-gray-300"
                        required
                      />
                    </div>

                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter password*"
                      value={loginFormData.password}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300"
                      required
                    />

                    <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                      Sign In as Vendor
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <h3 className="text-center text-gray-600 font-medium">Continue With</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 flex items-center justify-center gap-2 bg-transparent">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="h-12 flex items-center justify-center gap-2 bg-transparent">
                    <Mail className="w-5 h-5 text-red-500" />
                    Google
                  </Button>
                </div>
              </div>

              {/* Sign Up Links */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Don't have an account?</p>
                <div className="flex gap-2 justify-center">
                  <Link href="/signup?type=user">
                    <Button variant="link" className="text-pink-600 hover:text-pink-700 p-0">
                      Sign up as User
                    </Button>
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link href="/signup?type=vendor">
                    <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0">
                      Sign up as Vendor
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </>
  )
}
