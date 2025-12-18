import { NextRequest, NextResponse } from 'next/server';
import { mockAppointments } from '@/lib/mockData';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Find and update appointment
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);

    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      );
    }

    mockAppointments[appointmentIndex].status = status;
    mockAppointments[appointmentIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      appointment: mockAppointments[appointmentIndex]
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la cita' },
      { status: 500 }
    );
  }
}