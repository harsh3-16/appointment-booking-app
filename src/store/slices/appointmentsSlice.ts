import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'cancelled' | 'completed';
}

interface AppointmentState {
  list: Appointment[];
}

const initialState: AppointmentState = {
  list: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.list = action.payload;
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.list.push(action.payload);
    },
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const appointment = state.list.find((a) => a.id === action.payload);
      if (appointment) {
        appointment.status = 'cancelled';
      }
    },
    clearAppointments: (state) => {
      state.list = [];
    },
  },
});

export const { setAppointments, addAppointment, cancelAppointment, clearAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
