export interface DashboardOverview {
  totalPatients: number;
  totalAppointments: number;
  todayAppointments: number;
}

export interface DashboardAppointmentsByStatus {
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
}

export interface DashboardStatsResponse {
  overview: DashboardOverview;
  appointmentsByStatus: DashboardAppointmentsByStatus;
}

//Latest Appointments
export interface LatestAppointment {
  id: number;
  slotDate: string;
  slotTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  patient: {
    id: number;
    name: string;
    phone: string;
  };
  doctor: {
    id: number;
    name: string;
  };
}
