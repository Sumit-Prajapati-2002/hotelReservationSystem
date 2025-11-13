export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-24 px-4 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold mb-8 drop-shadow-lg">
          About Serenity Hotel
        </h2>
        <div className="space-y-6">
          <p className="text-xl leading-relaxed opacity-95 drop-shadow-md">
            Established in 2005, Serenity Hotel has been a beacon of luxury and
            hospitality for travelers from around the world. Nestled in the
            heart of the city, our hotel combines timeless elegance with modern
            comfort to create unforgettable experiences.
          </p>
          <p className="text-xl leading-relaxed opacity-95 drop-shadow-md">
            Our dedicated team of hospitality professionals is committed to
            providing personalized service that exceeds expectations. Whether
            you are here for business or leisure, we ensure every moment of your
            stay is exceptional.
          </p>
        </div>
        <div className="mt-12 inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-white/30">
          <p className="text-2xl font-bold">20+ Years of Excellence</p>
        </div>
      </div>
    </section>
  );
}
