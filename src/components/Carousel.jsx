import { useState, useEffect } from "react";

export default function Carousel({ images = [], autoPlay = true, interval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(id);
  }, [currentIndex]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg mt-0">

      {/* TRACK */}
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, i) => (
            <div key={i} className="relative w-full min-w-full h-48 md:h-72">

                {/* Imagen */}
                <img
                src={img.src}
                className="w-full h-full object-cover"
                alt={`slide-${i}`}
                />

                {/* Overlay oscuro suave */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Botón Ver Más */}
                {img.link && (
                <a
                    href={img.link}
                    className="absolute right-3 bottom-4 -translate-x-1/2 bg-white/90 hover:bg-white text-gray-800 px-5 py-2 rounded-full shadow-lg font-semibold transition"
                >
                    Ver más
                </a>
                )}
                </div>

        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow text-gray-700"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow text-gray-700"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === currentIndex ? "bg-blue-600" : "bg-white border"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
