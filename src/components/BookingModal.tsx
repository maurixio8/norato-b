'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, Check, MessageCircle } from 'lucide-react';

const services = [
  'Corte Mujer & Styling - $95K',
  'Corte Caballero - $55K',
  'Peinado Evento - $120K+',
  'Tinte Completo - $160K',
  'Retoque de Raíz - $90K',
  'Balayage / Ombré - $320K+',
  'Babylights - $280K+',
  'Keratina Orgánica - $420K',
  'Hidratación Profunda - $70K',
  'Botox Capilar - $180K',
  'Tratamiento Scalp Detox - $80K',
];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && selectedService) {
      setStep(2);
    } else if (step === 2 && selectedDate && selectedTime) {
      setStep(3);
    } else if (step === 3 && customerInfo.name && customerInfo.phone) {
      try {
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceId: selectedService,
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            customerEmail: customerInfo.email,
            date: selectedDate,
            time: selectedTime,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setAppointmentConfirmed(true);
        } else {
          alert(data.error || 'Error al agendar la cita');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al agendar la cita');
      }
    }
  };

  const handleWhatsAppConfirm = () => {
    const message = `¡Hola Norato B! Quiero confirmar mi cita:\n\n` +
      `• Servicio: ${selectedService}\n` +
      `• Fecha: ${selectedDate}\n` +
      `• Hora: ${selectedTime}\n` +
      `• Nombre: ${customerInfo.name}\n` +
      `• Teléfono: ${customerInfo.phone}\n` +
      `${customerInfo.email ? `• Email: ${customerInfo.email}` : ''}\n\n` +
      `Por favor, confirmen la disponibilidad. ¡Gracias!`;

    const phoneNumber = '573182745713'; // Número de WhatsApp de Norato B
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const resetModal = () => {
    setStep(1);
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setCustomerInfo({ name: '', phone: '', email: '' });
    setAppointmentConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="bg-background rounded-lg shadow-2xl w-full max-w-md relative overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-primary text-white p-6 relative">
                <button
                  onClick={resetModal}
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-serif text-center">Reservar Cita</h2>
                {/* Progress indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 w-12 rounded-full transition-colors ${
                        s <= step ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!appointmentConfirmed ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Service Selection */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex items-center mb-4">
                          <Calendar className="w-5 h-5 text-primary mr-2" />
                          <h3 className="text-lg font-medium">Selecciona un servicio</h3>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {services.map((service) => (
                            <label
                              key={service}
                              className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-surface/50 transition-colors"
                            >
                              <input
                                type="radio"
                                name="service"
                                value={service}
                                checked={selectedService === service}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-4 h-4 text-primary focus:ring-primary"
                              />
                              <span className="ml-3">{service}</span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex items-center mb-4">
                            <Calendar className="w-5 h-5 text-primary mr-2" />
                            <h3 className="text-lg font-medium">Selecciona fecha y hora</h3>
                          </div>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Horas disponibles</h4>
                          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`p-2 text-sm border rounded-lg transition-colors ${
                                  selectedTime === time
                                    ? 'bg-primary text-white border-primary'
                                    : 'border-border hover:bg-surface/50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Customer Info */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center mb-4">
                          <User className="w-5 h-5 text-primary mr-2" />
                          <h3 className="text-lg font-medium">Tus datos</h3>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Nombre completo *</label>
                          <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Teléfono *</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                              type="tel"
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                              className="w-full p-3 pl-10 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Número de contacto"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email (opcional)</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                            <input
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                              className="w-full p-3 pl-10 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="correo@ejemplo.com"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="px-6 py-2 border border-border rounded-lg hover:bg-surface/50 transition-colors"
                        >
                          Anterior
                        </button>
                      )}
                      <button
                        type="submit"
                        className="ml-auto bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {step === 3 ? 'Confirmar Cita' : 'Siguiente'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Confirmation screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">¡Cita Agendada!</h3>
                    <p className="text-muted mb-6">Tu cita ha sido registrada exitosamente</p>

                    <div className="bg-surface/50 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-medium mb-2">Resumen de tu cita:</h4>
                      <p className="text-sm"><strong>Servicio:</strong> {selectedService}</p>
                      <p className="text-sm"><strong>Fecha:</strong> {selectedDate}</p>
                      <p className="text-sm"><strong>Hora:</strong> {selectedTime}</p>
                      <p className="text-sm"><strong>Cliente:</strong> {customerInfo.name}</p>
                    </div>

                    <p className="text-sm text-muted mb-6">
                      Para confirmar tu cita, envía un mensaje por WhatsApp con los detalles:
                    </p>

                    <button
                      onClick={handleWhatsAppConfirm}
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Confirmar por WhatsApp
                    </button>

                    <button
                      onClick={resetModal}
                      className="w-full mt-3 border border-border py-3 rounded-lg hover:bg-surface/50 transition-colors"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}