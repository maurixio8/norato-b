'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BookingModal from '@/components/BookingModal';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />

      <main>
        <Hero />
        <Services />

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-primary font-medium tracking-widest text-sm mb-3 uppercase">
                Visítanos
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 tracking-wide">
                CONTACTO
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Dirección</h3>
                    <p className="text-muted text-sm">
                      Carrera 79a #6-52 Sur<br />
                      Kennedy, Bogotá, Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Teléfono</h3>
                    <p className="text-muted text-sm">+57 312 345 6789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted text-sm">info@noratob.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Horario de Atención</h3>
                  <p className="text-muted text-sm">
                    Lunes a Sábado: 10:00 AM - 9:00 PM<br />
                    Domingo: Cerrado
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Facebook size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h3 className="font-sans text-xl tracking-[0.2em] font-medium text-foreground">
            NORATO<span className="text-primary mx-1">•</span>B
          </h3>
          <p className="text-xs text-muted">
            © 2024 Norato • B Peluquería. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Floating Booking Button */}
      <motion.button
        data-booking-trigger
        onClick={() => setIsBookingOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg z-30 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar size={24} />
      </motion.button>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}