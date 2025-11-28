"use client";

import { useContext, useState, useMemo } from "react";
import { AuthContext } from "@/app/context/page";

export default function GalleryPage() {
  const { campaignData } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("all");

  // 🔹 Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flatImages, setFlatImages] = useState([]);
  const [selectedCity, setSelectedCity] = useState("all");

  // 🔹 Flatten all images into a single array for modal navigation
  const allImages = useMemo(() => {
    let arr = [];
    campaignData.forEach((item) => {
      item.image?.forEach((img) => {
        arr.push({ img, title: item.title });
      });
    });
    return arr;
  }, [campaignData]);

  // 🔹 Extract unique vendor types for filter
  const vendorTypes = useMemo(() => {
    const types = campaignData.map((item) => item.vendorType);
    return ["all", ...new Set(types)];
  }, [campaignData]);

  // 🔹 Apply filtering logic
  const filteredData = campaignData.filter((item) => {
    const matchesVendor =
      selectedVendor === "all" || item.vendorType === selectedVendor;

    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCity =
      selectedCity === "all" || item.cities?.includes(selectedCity);

    return matchesVendor && matchesSearch && matchesCity;
  });

  // 🔹 Open modal with selected image index
  const openModal = (globalIndex) => {
    setFlatImages(allImages);
    setCurrentIndex(globalIndex);
    setModalOpen(true);
  };

  // 🔹 Navigation
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev + 1 < flatImages.length ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : flatImages.length - 1
    );
  };





  const cityList = useMemo(() => {
    let arr = [];
    campaignData.forEach((item) => {
      item.cities?.forEach((c) => arr.push(c));
    });
    return ["all", ...new Set(arr)];
  }, [campaignData]);


  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* ---------------- TOP FILTER BAR ---------------- */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          {/* Vendor Type Filter */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {vendorTypes.map((type, i) => (
              <button
                key={i}
                onClick={() => setSelectedVendor(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition 
                  ${selectedVendor === type
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 border"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search titles..."
            className="px-4 py-2 border rounded-md w-64 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div className="flex gap-2 overflow-x-auto py-4">
          {cityList.map((city, i) => (
            <button
              key={i}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap transition 
        ${selectedCity === city
                  ? "bg-primary text-white"
                  : "bg- text-gray-600 border"
                }`}
            >
              {city}
            </button>
          ))}
        </div>


        {/* ---------------- MASONRY GALLERY ---------------- */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredData &&
            filteredData.map((item, itemIndex) =>
              item.image?.map((img, imgIndex) => {

                const globalIndex = allImages.findIndex((x) => x.img === img);

                return (
                  <div
                    key={`${itemIndex}-${imgIndex}`}
                    className="break-inside-avoid overflow-hidden rounded-lg shadow-md bg-white cursor-pointer"
                    onClick={() => openModal(globalIndex)}
                  >
                    <img
                      src={img}
                      alt={item.title}
                      className="w-full object-cover rounded-lg"
                    />

                    <div className="p-3">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.vendorType}</p>
                    </div>
                  </div>
                );
              })
            )}
        </div>

        {/* ---------------- NO RESULTS ---------------- */}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No results found.
          </p>
        )}
      </div>

      {/* ---------------- FULLSCREEN MODAL ---------------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          {/* Close Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          {/* Main Image */}
          <img
            src={flatImages[currentIndex]?.img}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            alt="fullscreen"
          />

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-4xl px-4 py-2"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-4xl px-4 py-2"
          >
            ❯
          </button>
        </div>
      )}
    </section>
  );
}
