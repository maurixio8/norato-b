'use client';

import { motion } from 'framer-motion';
import { Scissors, Brush, Sparkles, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    category: 'Nuestras Ofertas',
    subtitle: 'Cortes y Estilismo Diario',
    items: [
      { name: 'Corte Mujer & Styling', price: '$95K', description: 'Incluye lavado, masaje capilar y secado' },
      { name: 'Corte Caballero', price: '$55K', description: 'Estilo clásico o moderno a tijera' },
      { name: 'Peinado Evento', price: '$120K+', description: 'Recogidos y ondas para ocasiones' },
    ]
  },
  {
    icon: Brush,
    category: 'Color y Mechas',
    subtitle: 'Técnicas avanzadas de coloración',
    items: [
      { name: 'Tinte Completo', price: '$160K', description: '' },
      { name: 'Retoque de Raíz', price: '$90K', description: '' },
      { name: 'Balayage / Ombré', price: '$320K+', description: 'Técnica a mano alzada, incluye matiz' },
      { name: 'Babylights', price: '$280K+', description: '' },
    ]
  },
  {
    icon: Sparkles,
    category: 'Tratamientos',
    subtitle: 'Salud y brillo para tu cabello',
    items: [
      { name: 'Keratina Orgánica', price: '$420K', description: 'Alisado y reducción de frizz (3-4 meses)' },
      { name: 'Hidratación Profunda', price: '$70K', description: '' },
      { name: 'Botox Capilar', price: '$180K', description: 'Rejuvenecimiento de la fibra capilar' },
      { name: 'Tratamiento Scalp Detox', price: '$80K', description: '' },
    ]
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-medium tracking-widest text-sm mb-3 uppercase">
            Nuestros Servicios
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 tracking-wide">
            CARTA DE SERVICIOS
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="text-muted font-light text-sm md:text-base max-w-2xl mx-auto">
            Descubre nuestra exclusiva selección de servicios diseñados para realzar tu belleza natural
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-8 md:space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-background border border-border p-6 sm:p-8 shadow-lg relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Accent line animation */}
                <motion.div
                  className="absolute top-0 left-0 w-1 h-full bg-primary"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  style={{ transformOrigin: 'bottom' }}
                />

                {/* Service header */}
                <div className="flex items-center mb-8">
                  <motion.div
                    className="p-3 bg-primary/10 rounded-full mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-serif uppercase tracking-wider text-foreground">
                      {service.category}
                    </h3>
                    <p className="text-xs text-muted mt-1">{service.subtitle}</p>
                  </div>
                </div>

                {/* Service items */}
                <div className="space-y-4">
                  {service.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="flex items-end justify-between group/item py-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
                    >
                      <div className="flex-1 pr-4 relative">
                        <div className="flex items-center">
                          <span className="font-medium text-foreground relative z-10">
                            {item.name}
                          </span>
                          <ChevronRight
                            className="w-4 h-4 text-primary ml-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:translate-x-1"
                          />
                        </div>
                        <motion.div
                          className="absolute bottom-0 left-0 w-full border-b border-dotted border-border"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 + 0.2 }}
                        />
                        {item.description && (
                          <p className="text-xs text-muted mt-2">{item.description}</p>
                        )}
                      </div>
                      <span className="text-primary font-bold text-lg bg-background pl-4 relative z-10">
                        {item.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}