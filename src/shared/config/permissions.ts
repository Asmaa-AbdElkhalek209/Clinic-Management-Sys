export const permissions = {
  users: {
    view: ["admin"],
    create: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },

  patients: {
    view: ["admin", "receptionist", "doctor"],
    create: ["admin", "receptionist"],
    update: ["admin", "receptionist"],
    delete: ["admin"],
  },

  appointments: {
    view: ["admin", "receptionist", "doctor"],
    create: ["admin", "receptionist"],
    update: ["admin", "receptionist"],
    delete: ["admin"],
    changeStatus: ["admin", "receptionist", "doctor"],
    filterDoctor:["admin", "receptionist",]
  },

  reports: {
    appointments: ["admin"],
    patients: ["admin"],
  },
} as const;
