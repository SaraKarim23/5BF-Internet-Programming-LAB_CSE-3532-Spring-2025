import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const successStories = [
  {
    name: "Ananya Sharma",
    message: "I cleared my UPSC prelims with ease after using this platform!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Mehta",
    message: "Best LMS ever! Helped me get placed at Google.",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Sanya Kapoor",
    message: "The mock tests and personalized feedback were game-changers.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Aarav Jain",
    message: "I built my full-stack portfolio through the capstone projects.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Ishita Verma",
    message: "After completing the course, I launched my own startup!",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
];

export default function SuccessStories() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-screen max-w-3xl mx-auto my-16 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Success Stories
        </h2>
        <button className="bg-gradient-to-r from-[#184E68] to-[#57CA85] dark:from-[#0f2c3a] dark:to-[#3e9c6c] text-white px-4 py-2 rounded-full hover:opacity-90 text-sm">
          Share Yours
        </button>
      </div>

      {/* Testimonial Card */}
      <div className="h-60 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center flex flex-col items-center px-4"
          >
            <img
              src={successStories[index].image}
              alt={successStories[index].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-400 mb-4"
            />
            <p className="text-lg italic text-gray-700 dark:text-gray-300">
              “{successStories[index].message}”
            </p>
            <span className="mt-3 font-semibold text-[#184E68] dark:text-[#57CA85]">
              – {successStories[index].name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {successStories.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === index
                ? "bg-gradient-to-r from-[#184E68] to-[#57CA85] shadow-md scale-110"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></span>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIndex((prev) => (prev + 1) % successStories.length)}
          className="bg-gradient-to-r from-[#184E68] to-[#57CA85] dark:from-[#0f2c3a] dark:to-[#3e9c6c] text-white px-6 py-3 rounded-r-full hover:opacity-90 transition-colors duration-300"
        >
          Next Story →
        </button>
      </div>
    </div>
  );
}
