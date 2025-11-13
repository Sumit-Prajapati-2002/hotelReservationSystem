import { ChevronDown } from "lucide-react";
export default function Hero({ scrollToSection }) {
  return (
    <section
      id="home"
      className="pt-16 h-screen relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>

      <div className="relative text-center px-4 max-w-5xl mx-auto z-10">
        <div className="animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Experience Luxury
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
              & Comfort
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 drop-shadow-lg font-light">
            Your perfect escape awaits at Serenity Hotel
          </p>
          <button
            onClick={() => scrollToSection("rooms")}
            className="group bg-white text-amber-600 px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl relative overflow-hidden"
          >
            <span className="relative z-10">Explore Our Rooms</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
              Explore Our Rooms
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={40} className="text-white/80" />
      </div>
    </section>
  );
}
