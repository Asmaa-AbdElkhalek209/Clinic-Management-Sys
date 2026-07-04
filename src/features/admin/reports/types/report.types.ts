export interface PatientReport {
  totalPatients: number;
  newRegistrations: number;
  genderBreakdown: {
    male: number;
    female: number;
    other: number;
  };
}

export interface AppointmentReport {
  total: number;
  byStatus: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  cancellationRate: number;
}
