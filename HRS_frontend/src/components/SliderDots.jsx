export default function SliderDots({
  totalSlides,
  currentIndex,
  setCurrentIndex,
}) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalSlides }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`h-2 rounded-full transition-all ${
            idx === currentIndex
              ? "w-8 bg-amber-600"
              : "w-2 bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
