import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import appointmentsReducer from './slices/appointmentsSlice';

// Create the root reducer
const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  appointments: appointmentsReducer,
});

// Root reducer that handles a global "CLEAR_STATE" action for logout (Rule RN13)
const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    // We clear the state by passing undefined to the appReducer
    // This resets all slices to their initialState
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// Re-export actions for convenience
export * from './slices/authSlice';
export * from './slices/uiSlice';
export * from './slices/appointmentsSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
