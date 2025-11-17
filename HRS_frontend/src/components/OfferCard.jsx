"use client";

import { Tag, Clock, TrendingUp } from "lucide-react";

export default function OfferCard({ category }) {
  const hasDiscount = category.offer?.discountPercent > 0;
  const finalPrice = category.offer?.finalPrice || category.price_per_night;
  const originalPrice = category.price_per_night;

  return (
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col border border-gray-100">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            category.category_images?.[0] ||
            "https://via.placeholder.com/400x300"
          }
          alt={category.category_name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-3 rounded-full shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300 flex items-center gap-2">
              <Tag size={18} />
              <div className="flex flex-col items-center leading-none">
                <span className="text-2xl font-bold">
                  {category.offer.discountPercent}%
                </span>
                <span className="text-xs font-semibold uppercase">OFF</span>
              </div>
            </div>
          </div>
        )}

        {/* Urgent Badge */}
        <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
          <Clock size={16} />
          <span className="text-sm font-bold">Limited Offer</span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {category.category_name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 mb-4 flex-1">
          {category.category_description ||
            "Enjoy a luxurious stay with exclusive amenities."}
        </p>

        {/* Price Section */}
        <div className="flex items-baseline gap-3 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-amber-600">
              Rs. {finalPrice}
            </span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          {hasDiscount && (
            <div className="flex flex-col">
              <span className="text-lg text-gray-400 line-through">
                Rs. {originalPrice}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                Save Rs. {originalPrice - finalPrice}
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
          Book This Offer{" "}
          <TrendingUp
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
