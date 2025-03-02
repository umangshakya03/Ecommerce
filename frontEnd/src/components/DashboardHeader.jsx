import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sliderImages } from "../assets/sliderData";

export default function DashboardHeader() {
  const banners = sliderImages.map((slide) => ({
    type: "banner",
    image: slide.url,
    title: slide.title,
    description: slide.description,
    bgColor: "bg-gray-900",
    link: "/sales",
    buttonText: "Shop Now",
  }));

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Simple auto-rotation
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentBannerIndex((prev) =>
          prev === banners.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const bannerVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const renderBannerContent = (banner) => {
    return (
      <div className="relative w-full h-full">
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
          <p className="text-xl mb-6">{banner.description}</p>
          <Link to={banner.link}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              {banner.buttonText}
            </motion.button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <header>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBannerIndex}
            variants={bannerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className={`w-full ${banners[currentBannerIndex].bgColor} h-[300px] md:h-[400px]`}
          >
            {renderBannerContent(banners[currentBannerIndex])}
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentBannerIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
