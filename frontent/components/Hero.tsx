"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import hero from "../images/Hero.jpg"

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero}
          alt="Gym Background"
          fill
          priority
          quality={90}
          className="object-cover brightness-75"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 -z-10" />

      {/* Content */}
      <div className="flex flex-col justify-center items-center h-full px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Transform Your Body
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 max-w-xl text-lg md:text-xl text-gray-300"
        >
          Join our fitness family today and unlock your full potential with expert trainers and world-class facilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold shadow-lg transition">
            Get Started
          </button>
          <button className="px-6 py-3 border-2 border-white hover:bg-white hover:text-black rounded-full font-semibold transition">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
