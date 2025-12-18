import { NextRequest, NextResponse } from 'next/server';
import { mockAppointments, MockAppointment } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, customerName, customerPhone, customerEmail, date, time } = body;

    // Validate required fields
    if (!serviceId || !customerName || !customerPhone || !date || !time) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Extract service name from serviceId (format: "Service Name - $Price")
    const serviceName = serviceId.split(' - ')[0];

    // Check if appointment already exists
    const existingAppointment = mockAppointments.find(apt =>
      apt.date === date && apt.time === time && apt.status !== 'CANCELLED'
    );

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'Ya existe una cita agendada para esta fecha y hora' },
        { status: 409 }
      );
    }

    // Create appointment
    const appointment: MockAppointment = {
      id: Date.now().toString(),
      serviceId: 'demo-service',
      serviceName,
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
      date,
      time,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockAppointments.push(appointment);

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        service: serviceName,
        price: serviceId.split(' - ')[1],
        customerName,
        date,
        time,
        status: appointment.status,
      },
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Error al crear la cita' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Sort by date and time
    const appointments = mockAppointments.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Error al obtener las citas', appointments: [] },
      { status: 500 }
    );
  }
}