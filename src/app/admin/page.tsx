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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-background border-r border-border z-40 transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } w-64 md:w-64`}
        initial={false}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-serif">
              NORATO<span className="text-primary">•</span>B
            </h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-surface rounded-lg transition-colors md:hidden"
            >
              <X size={20} />
            </button>
          </div>

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
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="md:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Mobile Header */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-background rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-serif mb-2">Dashboard Administrativo</h1>
            <p className="text-muted text-sm md:text-base">Gestiona tus citas y servicios</p>
          </motion.div>

          {/* Price Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background rounded-lg border border-border p-4 md:p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-lg md:text-xl font-medium">Gestión de Precios</h2>
              <button
                onClick={() => editingPrices ? setEditingPrices(false) : setEditingPrices(true)}
                className={`flex items-center px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                  editingPrices
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {editingPrices ? <X size={16} className="mr-2" /> : <Edit2 size={16} className="mr-2" />}
                {editingPrices ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((service) => (
                <div key={service} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-surface/50 rounded-lg gap-2">
                  <span className="text-xs md:text-sm font-medium">{service}</span>
                  {editingPrices ? (
                    <input
                      type="text"
                      value={prices[service] || ''}
                      onChange={(e) => setPrices({ ...prices, [service]: e.target.value })}
                      className="w-full sm:w-20 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="$0K"
                    />
                  ) : (
                    <span className="text-primary font-medium text-sm">{prices[service] || '$0K'}</span>
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
            className="bg-background rounded-lg border border-border p-4 md:p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-lg md:text-xl font-medium">Citas del Día</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-auto px-3 md:px-4 py-2 text-sm md:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
              />
            </div>

            {loading ? (
              <div className="text-center py-8 text-muted">Cargando citas...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted">No hay citas para esta fecha</div>
            ) : (
              <div className="space-y-3">
                {filteredAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-surface/50 rounded-lg p-3 md:p-4"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          {getStatusIcon(appointment.status)}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm md:text-base truncate">{appointment.customerName}</p>
                            <p className="text-xs md:text-sm text-primary font-semibold truncate">{appointment.serviceName || 'Servicio'}</p>
                          </div>
                        </div>
                        <span className="text-muted text-xs md:text-sm whitespace-nowrap">{appointment.time}</span>
                      </div>

                      <div className="space-y-1 text-xs md:text-sm text-muted">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="flex-shrink-0" />
                          <span className="truncate">{appointment.customerPhone}</span>
                        </div>
                        {appointment.customerEmail && (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="flex-shrink-0" />
                            <span className="truncate">{appointment.customerEmail}</span>
                          </div>
                        )}
                      </div>

                      {/* Status Actions */}
                      <div className="flex flex-wrap gap-2">
                        {appointment.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                              className="flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                              className="flex-1 sm:flex-none px-3 py-1.5 text-xs md:text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                        {appointment.status === 'CONFIRMED' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'COMPLETED')}
                            className="px-3 py-1.5 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          >
                            Completar
                          </button>
                        )}
                      </div>
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