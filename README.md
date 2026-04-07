# Appointment Booking App — Technical Demonstration

A high-fidelity, production-ready React Native application for booking and managing appointments with service providers. This project is built to demonstrate architectural excellence, premium UI/UX design, and robust state management using the latest industry standards.

## 🎯 Project Objectives & Coverage

This application fully implements all requirements specified in the project objective:

- [x] **User Registration & Authentication**: Full implementation of login and registration flows with Zod validation. Session persistence is handled via modular Redux slices.
- [x] **Service Provider Listing**: Features a curated list of providers with ratings, categories, and high-fidelity shimmer loading states.
- [x] **Appointment Scheduling**: Users can select a provider, verify availability through a dynamic date/time picker, and confirm bookings instantly.
- [x] **Appointment Management**: A dedicated centralized dashboard for viewing all upcoming/previous appointments with a robust cancellation system.
- [x] **Technical Excellence**: Built with Expo (React Native), TypeScript, and Redux Toolkit. Follows modular architecture and responsive design patterns.

## 🚀 Key Features

### 1. Advanced Authentication
- **Validated Forms**: Uses `react-hook-form` and `zod` for real-time input validation.
- **Secure State**: Credentials and user profiles are managed through a protected auth slice.

### 2. Provider Ecosystem
- **Instant Search**: Debounced search functionality to filter providers by category or name.
- **Provider Details**: Detailed profiles including services, location (MapPin integration), and performance ratings.

### 3. Booking Engine
- **Dynamic Scheduling**: Generates available slots based on user-selected dates.
- **Booking Feedback**: Uses `react-native-toast-message` for premium success/error notifications.

### 4. Global State & Persistence
- **Modular Redux**: Clean separation of concerns with `auth`, `appointments`, and `ui` slices.
- **Session Continuity**: App state persists throughout the session, ensuring local bookings remain visible even after navigation changes.

## 🛠️ Technical Implementation

### Tech Stack
- **Framework**: Expo SDK 55
- **State Management**: Redux Toolkit (Slices & Async patterns)
- **Navigation**: React Navigation v7
- **UI Components**: Lucide Icons, Expo Linear Gradient
- **Styling**: Custom responsive scaling system for universal Android/iOS compatibility.

### Assumptions & Notes
- **Mock Integration**: The app uses an Axios singleton with a custom interceptor. This simulates a live backend API, allowing for a production-ready data flow while remaining functional as a standalone demo.
- **Persistence**: For this demonstration, data is stored in the modular Redux store. In a production environment, this would synchronize with a cloud database (Node.js/MongoDB).

## 🏃 Running the Project

### How to Run (Development)
1. Install dependencies: `npm install`
2. Start the project: `npx expo start`
3. Use `a` for Android or `i` for iOS (requires Expo Go or emulator).

### How to Build the APK
To generate a production APK for testing:
1. Install EAS CLI: `npm install -g eas-cli`
2. Create an Expo account if you don't have one.
3. Run the following command:
   ```bash
   eas build --platform android --profile preview
   ```
This will provide a download link for a functional Android APK once the build completes.

---
*Developed as a comprehensive, high-fidelity technical solution for appointment management.*
