'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = () => {
    setIsLoading(true);
    // Simulate loading animation
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2600&auto=format&fit=crop"
            alt="Woman with beautiful hair"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-widest mb-4">
            NORATO <span className="text-primary">•</span> B
          </h1>
          <p className="text-gray-300 text-sm md:text-base tracking-[0.3em] uppercase mb-12">
            PELUQUERÍA PREMIUM
          </p>

          <motion.button
            onClick={handleEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block bg-primary text-white px-12 py-4 rounded-sm text-sm uppercase tracking-widest transition-all duration-300 border border-primary shadow-[0_0_15px_rgba(197,94,70,0.5)] overflow-hidden group"
            disabled={isLoading}
          >
            <span className={`relative z-10 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              INGRESAR
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/3 right-[15%] w-2 h-2 bg-primary rounded-full hidden md:block animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[20%] w-3 h-3 bg-primary/50 rounded-full hidden md:block animate-ping"></div>
      </div>

      {/* Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-xs tracking-widest uppercase">
          Bogotá, Colombia
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Carrera 79a #6-52 Sur • Kennedy
        </p>
      </div>
    </div>
  );
}