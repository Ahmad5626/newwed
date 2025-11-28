"use client"

import {
  Star,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  Clock,
  Users,
  CheckCircle2,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import Footer from "@/components/Footer"
import { AuthContext } from "@/app/context/page"
import { useParams } from "next/navigation"
import { addCompaignMasseage } from "@/app/services/campaign"
import { toast, Toaster } from "sonner"
import { baseUrl } from "@/app/utils/Constant"
import { useContext, useEffect, useState } from "react"
import Navbar from "@/components/Hedaer"

export default function CampaignDetails() {
  const { campaignData } = useContext(AuthContext)
  const { id } = useParams()
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  })
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("images")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    message: "",
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${baseUrl}/v1/api/campaign/${id}/reviews`)
      const data = await res.json()
      if (data.success) {
        setReviews(data.reviews)
        setAverageRating(data.averageRating)
        setTotalReviews(data.totalReviews)
      }
    } catch (error) {
      // Silently fail - reviews will show empty state
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseUrl}/v1/api/campaign/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Review added successfully!")
        setReviewForm({ name: "", email: "", rating: 0, comment: "" })
        fetchReviews()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error submitting review")
    }
  }

  const campaign = campaignData?.find((c) => c._id === id)

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Campaign not found</h2>
          <p className="text-muted-foreground">Please go back and select a valid one.</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await addCompaignMasseage(id, formData)
    if (data.success) {
      toast.success(data.message)
      setFormData({ name: "", email: "", mobile: "", city: "", message: "" })
    } else {
      toast.error(data.message)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (campaign.image?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (campaign.image?.length || 1)) % (campaign.image?.length || 1))
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar fixed={true} />

      <main className="min-h-screen bg-background pt-5">
        {/* Hero Image Section */}
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden">
          <img
            src={campaign.image?.[currentImageIndex] || "/placeholder.svg"}
            alt={campaign.title}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-500"
            onClick={() => setLightboxOpen(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm hover:bg-card text-foreground p-3 rounded-full shadow-lg transition-all hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm hover:bg-card text-foreground p-3 rounded-full shadow-lg transition-all hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-foreground">
              {currentImageIndex + 1} / {campaign.image?.length || 1}
            </span>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {campaign.image?.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === i ? "border-primary scale-105" : "border-card/50 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaign Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{campaign.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{campaign.address}</span>
                    </div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground px-3 py-1.5 text-base font-semibold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {campaign.rating || 4.0}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Quick Response</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">500+ Events Done</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Now
                </Button>
                <Button variant="outline" className="border-border bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Get Best Quotes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`border-border ${isLiked ? "bg-destructive/10 border-destructive/30" : ""}`}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 transition-colors ${isLiked ? "fill-destructive text-destructive" : ""}`}
                  />
                  {isLiked ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" className="border-border bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Separator />

              {/* Tabs */}
              <div>
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
                  {["images", "videos", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === tab
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Images Tab */}
                {activeTab === "images" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {campaign.image?.map((img, i) => (
                      <div
                        key={i}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => {
                          setCurrentImageIndex(i)
                          setLightboxOpen(true)
                        }}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Videos Tab */}
                {activeTab === "videos" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {campaign.video?.length > 0 ? (
                      campaign.video.map((video, i) => (
                        <Card key={i} className="overflow-hidden border-border">
                          <div className="relative aspect-video bg-muted">
                            <video src={video} controls className="w-full h-full object-cover" />
                          </div>
                          <CardContent className="p-4">
                            <p className="text-sm font-medium text-foreground">Video {i + 1}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-2 py-12 text-center">
                        <Play className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No videos available</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="mt-6 space-y-6">
                    {/* Reviews Summary */}
                    <Card className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
                            <div className="flex gap-1 mt-2 justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 ${
                                    star <= Math.round(averageRating) ? "fill-chart-4 text-chart-4" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{totalReviews} reviews</p>
                          </div>
                          <Separator orientation="vertical" className="h-20" />
                          <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground w-3">{rating}</span>
                                <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-chart-4 rounded-full"
                                    style={{
                                      width: `${
                                        (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100 || 0
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {reviews.length > 0 ? (
                        reviews.map((r, i) => (
                          <Card key={i} className="border-border">
                            <CardContent className="p-5">
                              <div className="flex items-start gap-4">
                                <Avatar className="w-10 h-10">
                                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                    {r.name?.charAt(0)?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-foreground">{r.name}</h4>
                                    <div className="flex gap-0.5">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-4 h-4 ${
                                            star <= r.rating ? "fill-chart-4 text-chart-4" : "text-muted"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground leading-relaxed">{r.comment}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(r.date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="py-12 text-center">
                          <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* About Section */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                  <div
                    className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: campaign.description }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <Card className="border-border shadow-lg">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Starting Price</p>
                      <p className="text-4xl font-bold text-foreground">
                        {"₹"}
                        {campaign.price?.toLocaleString() || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">Approx Budget</p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        Send Message
                      </Button>
                      <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                        View Contact
                      </Button>
                    </div>

                    <Separator />

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="font-semibold text-foreground">Get in Touch</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <Input
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-input"
                        />
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground">
                            +91
                          </span>
                          <Input
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="rounded-l-none bg-background border-input"
                          />
                        </div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-background border-input"
                        />
                        <Input
                          name="city"
                          placeholder="City / Location"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-background border-input"
                        />
                        <Textarea
                          name="message"
                          placeholder="Your Message *"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          required
                          className="bg-background border-input resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Write Review Card */}
                <Card className="border-border">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <Input
                        name="name"
                        placeholder="Your Name *"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                        className="bg-background border-input"
                      />
                      <Input
                        name="email"
                        placeholder="Email (optional)"
                        value={reviewForm.email}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            email: e.target.value,
                          })
                        }
                        className="bg-background border-input"
                      />
                      {/* Rating Stars */}
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Your Rating</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                              className="p-1 transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-7 h-7 transition-colors ${
                                  num <= reviewForm.rating
                                    ? "fill-chart-4 text-chart-4"
                                    : "text-muted hover:text-chart-4"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        name="comment"
                        placeholder="Share your experience..."
                        value={reviewForm.comment}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            comment: e.target.value,
                          })
                        }
                        required
                        className="bg-background border-input resize-none"
                        rows={4}
                      />
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Submit Review
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-foreground/95 flex items-center justify-center z-50">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-background hover:text-background/80 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-background hover:text-background/80 p-3 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <img
            src={campaign.image?.[currentImageIndex] || "/placeholder.svg"}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-background hover:text-background/80 p-3 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          {/* Lightbox Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-background">
            <span className="text-lg font-medium">
              {currentImageIndex + 1} / {campaign.image?.length || 1}
            </span>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
