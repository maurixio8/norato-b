'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Edit2, Save, X, Menu, LogOut, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  service: string;
  serviceName?: string;
}

const services = [
  'Corte Mujer & Styling',
  'Corte Caballero',
  'Peinado Evento',
  'Tinte Completo',
  'Retoque de Raíz',
  'Balayage / Ombré',
  'Babylights',
  'Keratina Orgánica',
  'Hidratación Profunda',
  'Botox Capilar',
  'Tratamiento Scalp Detox',
];

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPrices, setEditingPrices] = useState(false);
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAppointments();
    loadPrices();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const loadPrices = () => {
    const savedPrices = localStorage.getItem('norato_prices');
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices));
    } else {
      // Default prices
      const defaultPrices = services.reduce((acc, service) => {
        acc[service] = '$0K';
        return acc;
      }, {} as { [key: string]: string });
      setPrices(defaultPrices);
    }
  };

  const savePrices = () => {
    localStorage.setItem('norato_prices', JSON.stringify(prices));
    setEditingPrices(false);
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setAppointments(apps =>
          apps.map(app =>
            app.id === id ? { ...app, status } : app
          )
        );
      } else {
        console.error('Failed to update appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED': return 'Confirmada';
      case 'CANCELLED': return 'Cancelada';
      case 'COMPLETED': return 'Completada';
      default: return 'Pendiente';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date).toISOString().split('T')[0];
    return aptDate === selectedDate;
  });

  return (
    <div className="min-h-screen bg-surface text-foreground">
      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-background border-r border-border z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 64 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <h2 className="text-xl font-serif">
                NORATO<span className="text-primary">•</span>B
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>

          {sidebarOpen && (
            <nav className="space-y-2">
              <a
                href="/admin"
                className="flex items-center p-3 bg-primary text-white rounded-lg"
              >
                <Calendar size={20} className="mr-3" />
                Citas
              </a>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center p-3 hover:bg-surface rounded-lg transition-colors text-left"
              >
                <LogOut size={20} className="mr-3" />
                Salir
              </button>
            </nav>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-serif mb-2">Dashboard Administrativo</h1>
            <p className="text-muted">Gestiona tus citas y servicios</p>
          </motion.div>

          {/* Price Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background rounded-lg border border-border p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Gestión de Precios</h2>
              <button
                onClick={() => editingPrices ? setEditingPrices(false) : setEditingPrices(true)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  editingPrices
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {editingPrices ? <X size={18} className="mr-2" /> : <Edit2 size={18} className="mr-2" />}
                {editingPrices ? 'Cancelar' : 'Editar Precios'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <span className="text-sm">{service}</span>
                  {editingPrices ? (
                    <input
                      type="text"
                      value={prices[service] || ''}
                      onChange={(e) => setPrices({ ...prices, [service]: e.target.value })}
                      className="w-20 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="$0K"
                    />
                  ) : (
                    <span className="text-primary font-medium">{prices[service] || '$0K'}</span>
                  )}
                </div>
              ))}
            </div>

            {editingPrices && (
              <button
                onClick={savePrices}
                className="mt-4 flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save size={18} className="mr-2" />
                Guardar Precios
              </button>
            )}
          </motion.div>

          {/* Appointments Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background rounded-lg border border-border p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Citas del Día</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {loading ? (
              <div className="text-center py-8 text-muted">Cargando citas...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted">No hay citas para esta fecha</div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-surface/50 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {getStatusIcon(appointment.status)}
                          <div className="flex-1">
                            <p className="font-medium">{appointment.customerName}</p>
                            <p className="text-sm text-primary font-semibold">{appointment.serviceName || 'Servicio'}</p>
                          </div>
                          <span className="text-muted">{appointment.time}</span>
                        </div>
                        <div className="space-y-1 text-sm text-muted">
                          <div className="flex items-center">
                            <Phone size={14} className="mr-2" />
                            {appointment.customerPhone}
                          </div>
                          {appointment.customerEmail && (
                            <div className="flex items-center">
                              <Mail size={14} className="mr-2" />
                              {appointment.customerEmail}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="flex gap-2 mt-3">
                      {appointment.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      {appointment.status === 'CONFIRMED' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'COMPLETED')}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Completar
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}