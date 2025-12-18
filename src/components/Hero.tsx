'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBookingModal = () => {
    const bookingButton = document.querySelector('[data-booking-trigger]');
    (bookingButton as HTMLElement)?.click();
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background con parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-primary font-medium tracking-widest text-sm mb-6 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Peluquería & Estilismo Premium
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-serif text-foreground mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            NORATO<span className="text-primary">•</span>B
          </motion.h1>

          <motion.div
            className="w-24 h-0.5 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          <motion.p
            className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Transformamos tu estilo con la técnica artesanal y la mejor calidad en productos
          </motion.p>
        </motion.div>

        {/* Info cards con animación stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="bg-surface/80 backdrop-blur-sm p-6 rounded-lg border border-border"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium uppercase tracking-wider">Kennedy, Bogotá</p>
            <p className="text-xs text-muted mt-1">Carrera 79a #6-52 Sur</p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm p-6 rounded-lg border border-border"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium uppercase tracking-wider">Lunes a Sábado</p>
            <p className="text-xs text-muted mt-1">10:00 AM - 9:00 PM</p>
          </motion.div>

          <motion.div
            className="bg-surface/80 backdrop-blur-sm p-6 rounded-lg border border-border"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium uppercase tracking-wider">Agenda tu Cita</p>
            <p className="text-xs text-muted mt-1">Rápido y fácil</p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={openBookingModal}
          className="bg-primary text-white font-medium uppercase tracking-wider py-4 px-12 shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reservar Cita Ahora
        </motion.button>
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-30"
        animate={{
          background: [
            "linear-gradient(to top, var(--background) 0%, transparent 50%, transparent 100%)",
            "linear-gradient(to top, var(--background) 30%, transparent 70%, transparent 100%)",
            "linear-gradient(to top, var(--background) 0%, transparent 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}