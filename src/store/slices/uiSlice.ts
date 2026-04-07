import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isModalOpen: boolean;
  modalContent: any;
  backgroundGradient: string[];
}

const initialState: UIState = {
  isModalOpen: false,
  modalContent: null,
  backgroundGradient: ['#E0F2FE', '#FFFFFF'], // Premium Light Blue to White
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<any>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
    setBackgroundGradient: (state, action: PayloadAction<string[]>) => {
      state.backgroundGradient = action.payload;
    },
  },
});

export const { openModal, closeModal, setBackgroundGradient } = uiSlice.actions;
export default uiSlice.reducer;
