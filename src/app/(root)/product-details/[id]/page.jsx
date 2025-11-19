"use client";


import {
  Star,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Hedaer";
import Footer from "@/components/Footer";
import { AuthContext } from "@/app/context/page";
import { useParams } from "next/navigation";
import { addCompaignMasseage } from "@/app/services/campaign";
import { toast , Toaster} from "sonner";
import { baseUrl } from "@/app/utils/Constant";
import { useContext, useEffect, useState } from "react";
export default function CampaignDetails() {
const { campaignData } = useContext(AuthContext);
  const { id } = useParams();
  const [reviewForm, setReviewForm] = useState({
  name: "",
  email: "",
  rating: 0,
  comment: "",
});
const [reviews, setReviews] = useState([]);
const [averageRating, setAverageRating] = useState(0);
const [totalReviews, setTotalReviews] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [whatsappNotify, setWhatsappNotify] = useState(false);
  const [activeTab, setActiveTab] = useState("images");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    message: "",
  });


useEffect(() => {
  fetchReviews();
}, []);

const fetchReviews = async () => {
  try {
    const res = await fetch(`${baseUrl}/v1/api/campaign/${id}/reviews`);
    const data = await res.json();
    if (data.success) {
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
      setTotalReviews(data.totalReviews);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${baseUrl}/v1/api/campaign/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewForm),
    });
    const data = await res.json();
    if (data.success) {
      alert("Review added successfully!");
      setReviewForm({ name: "", email: "", rating: 0, comment: "" });
      fetchReviews();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting review");
  }
};

// end review


  

  // Find the selected campaign by id
  const campaign = campaignData?.find((c) => c._id === id);

  // Fallback if not found
  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700">
          Campaign not found
        </h2>
        <p className="text-gray-500">Please go back and select a valid one.</p>
      </div>
    );
  }


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const data =await addCompaignMasseage(id,formData)
    if(data.success){
      toast.success(data.message);
      setFormData({ name: "", email: "", mobile: "", city: "", message: "" });
    }else{
      toast.error(data.message);
    }
  };



  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      (prev + 1) % (campaign.image?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      (prev - 1 + (campaign.image?.length || 1)) %
      (campaign.image?.length || 1)
    );
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar fixed={true} />
    
      <div className="min-h-screen bg-gray-50 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="relative mb-6">
                <img
                  src={
                    campaign.image?.[currentImageIndex] ||
                    "/placeholder.svg"
                  }
                  alt={campaign.title}
                  className="w-full h-[500px] object-cover rounded-lg cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Campaign Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{campaign.title}</h1>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    {campaign.rating || 4.0}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{campaign.address}</span>
                </div>

              
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="sm">
                  Get Best Quotes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  Shortlist
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="flex items-center gap-8 mb-6 border-b">
                  <button
                    onClick={() => setActiveTab("images")}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === "images"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Images
                  </button>
                  <button
                    onClick={() => setActiveTab("Videos")}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === "Videos"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Videos
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === "reviews"
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Reviews
                  </button>
                </div>

                {/* images Images */}
                {activeTab === "images" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {campaign.image?.map((img, i) => (
                      <div key={i} className="aspect-square">
                        <img
                          src={img}
                          alt={`images ${i}`}
                          className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {
                            setCurrentImageIndex(i);
                            setLightboxOpen(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {activeTab === "Videos" && (
                  <div className="text-gray-700 leading-relaxed">
                    {campaign.video?.map((video, i) => (
                      <div key={i} className="mb-4">
                        <h4 className="font-medium mb-2 text-gray-700">
                          Video {i + 1}
                        </h4>
                        <video
                          src={video}
                          controls
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>  
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-gray-700">
                    Starting Price
                  </h4>
                  <p className="text-2xl font-bold text-primary">
                    ₹{campaign.price?.toLocaleString() || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">Approx Budget</p>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button className="flex-1 bg-primary text-white">
                    Send Message
                  </Button>
                  <Button className="flex-1 bg-green-600 text-white">
                    View Contact
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm bg-gray-100 border border-r-0 rounded-l-md">
                        🇮🇳 +91
                      </span>
                      <Input
                        name="mobile"
                        placeholder=""
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="rounded-l-none text-sm"
                      />
                    </div>
                  </div>
                  
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-sm"
                  />
                  <Input
                    name="city"
                    placeholder="Function city/location"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="text-sm"
                  />
                  <Textarea
                    name="message"
                    placeholder="Message*"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="text-sm resize-none"
                  />

                  {/* <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-700">
                      Notify me via WhatsApp
                    </span>
                    <button
                      type="button"
                      onClick={() => setWhatsappNotify(!whatsappNotify)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        whatsappNotify ? "bg-primary" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          whatsappNotify ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div> */}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm my-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: campaign.description }}>
              
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox / Image Preview */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={campaign.image?.[currentImageIndex]}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      
<div className="bg-white rounded-lg p-6 shadow-sm my-6 max-w-7xl mx-auto">
  <h2 className="text-2xl font-bold mb-2">Reviews</h2>
  <p className="text-gray-500 mb-4">
    ⭐ {averageRating.toFixed(1)} / 5 ({totalReviews} reviews)
  </p>

  {/* Existing Reviews */}
  <div className="space-y-4 mb-8">
    {reviews.length > 0 ? (
      reviews.map((r, i) => (
        <div key={i} className="border-b pb-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{r.name}</h4>
            <span className="text-yellow-500">
              {"⭐".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </span>
          </div>
          <p className="text-gray-700 mt-1">{r.comment}</p>
          <p className="text-xs text-gray-400">
            {new Date(r.date).toLocaleDateString()}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No reviews yet.</p>
    )}
  </div>

  {/* Add Review Form */}
  <form onSubmit={handleReviewSubmit} className="space-y-4 border-t pt-4">
    <h3 className="text-lg font-semibold text-gray-800">Leave a Review</h3>
    <div className="grid grid-cols-2 gap-3">
      <Input
        name="name"
        placeholder="Name*"
        value={reviewForm.name}
        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
        required
      />
      <Input
        name="email"
        placeholder="Email"
        value={reviewForm.email}
        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
      />
    </div>

    {/* Rating Stars */}
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => setReviewForm({ ...reviewForm, rating: num })}
          className={`cursor-pointer text-2xl ${
            num <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>

    <Textarea
      name="comment"
      placeholder="Write your review..."
      value={reviewForm.comment}
      onChange={(e) =>
        setReviewForm({ ...reviewForm, comment: e.target.value })
      }
      required
    />

    <Button type="submit" className="bg-primary text-white hover:bg-primary/80">
      Submit Review
    </Button>
  </form>
</div>

      <Footer />
    </>
  );
}
