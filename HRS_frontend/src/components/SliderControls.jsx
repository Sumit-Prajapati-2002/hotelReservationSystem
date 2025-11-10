import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderControls({ prevSlide, nextSlide }) {
  return (
    <>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg z-10"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg z-10"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>
    </>
  );
}
