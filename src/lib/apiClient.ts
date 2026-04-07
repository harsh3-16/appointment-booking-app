import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';

// Standard error extraction utility (as per Rule A3)
const extractErrorMessage = (error: any): string => {
  return error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
};

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.mockbooking.com', // Mock base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Interceptor for Rule A5 Compliance — allows internal hooks to work with mock data
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Provider Details Lookup (/providers/:id)
    if (config.url?.match(/\/providers\/\w+/)) {
      const id = config.url.split('/').pop();
      const provider = MOCK_PROVIDERS.find(p => p.id === id);
      config.adapter = async () => ({
        data: {
          status: 'success',
          data: provider || MOCK_PROVIDERS[0],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    } 
    // 2. Provider List Lookup (/providers)
    else if (config.url === '/providers') {
      config.adapter = async () => ({
        data: {
          status: 'success',
          data: MOCK_PROVIDERS,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    } 
    // 3. Appointment Booking (POST /appointments/book)
    else if (config.url === '/appointments/book' && config.method === 'post') {
      config.adapter = async () => ({
        data: {
          status: 'success',
          data: { ...JSON.parse(config.data), id: Math.random().toString(36).substr(2, 9), status: 'upcoming' },
        },
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      });
    }
    // 4. Appointment List (/appointments)
    else if (config.url === '/appointments') {
      config.adapter = async () => ({
        data: {
          status: 'success',
          data: [], // Initially empty, will be updated via screens
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const MOCK_PROVIDERS = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    category: 'Healthcare',
    rating: 4.8,
    location: 'Downtown, NY',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536785?auto=format&fit=crop&q=80&w=400',
    about: "Dr. Sarah Wilson is a highly experienced professional with over 15 years in general healthcare. She specializes in preventative medicine and patient-centric care.",
    workingHours: "09:00 AM - 05:00 PM",
  },
  {
    id: '2',
    name: 'James Rodriguez',
    category: 'Fitness Trainer',
    rating: 4.9,
    location: 'West Side, NY',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d17a4d?auto=format&fit=crop&q=80&w=400',
    about: "James is a certified fitness trainer and nutritionist. His holistic approach to body transformation has helped hundreds of clients reach their peak physical performance.",
    workingHours: "06:00 AM - 09:00 PM",
  },
  {
    id: '3',
    name: 'Elena Gilbert',
    category: 'Yoga Instructor',
    rating: 4.7,
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    about: "Elena combines traditional yoga practices with modern mindfulness techniques. Her classes are designed to reduce stress and improve mental clarity.",
    workingHours: "08:00 AM - 06:00 PM",
  },
  {
    id: '4',
    name: 'Michael Chen',
    category: 'Tech Consultant',
    rating: 4.6,
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    about: "Michael provides expert guidance on digital transformation and system architecture. He has worked with Fortune 500 companies to modernize their tech stacks.",
    workingHours: "10:00 AM - 07:00 PM",
  },
];

// Response Interceptor (as per Rule A3)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const message = extractErrorMessage(error);

    // Global 401 handling
    if (error.response?.status === 401) {
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please login again.',
      });
    } else {
      if (!(error as any).isSilent) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });
      }
    }

    return Promise.reject(error);
  }
);


export default apiClient;
export { extractErrorMessage };
