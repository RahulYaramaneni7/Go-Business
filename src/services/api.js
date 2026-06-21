import axios from 'axios';
import { mockApiService } from './mockApi';

const API_BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com';

// Use mock API in development if REACT_APP_USE_MOCK_API is set
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true' || 
                      (process.env.NODE_ENV === 'development' && localStorage.getItem('useMockApi') === 'true');

console.log('API Configuration:', {
  useMockApi: USE_MOCK_API,
  environment: process.env.NODE_ENV,
  baseUrl: API_BASE_URL
});

// If using real API, create axios instance
let axiosInstance = null;

if (!USE_MOCK_API) {
  axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: false
  });

  // Add request interceptor to include token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        timeout: config.timeout
      });
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor for error handling
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('API Response:', response.status, response.data);
      return response;
    },
    (error) => {
      console.log('API Error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt_token');
      }
      return Promise.reject(error);
    }
  );
}

// API Service (switches between real and mock)
export const apiService = USE_MOCK_API ? mockApiService : {
  testConnection: () => {
    return axiosInstance.get('/api/referrals', {
      params: { test: true },
      timeout: 5000
    });
  },

  login: (email, password) => {
    return axiosInstance.post('/api/login', { email, password });
  },

  getReferrals: (params = {}) => {
    return axiosInstance.get('/api/referrals', { params });
  },

  getReferral: (id) => {
    return axiosInstance.get('/api/referrals', { params: { id } });
  }
};

export const toggleMockApi = (enable) => {
  if (enable) {
    localStorage.setItem('useMockApi', 'true');
  } else {
    localStorage.removeItem('useMockApi');
  }
  window.location.reload();
};

export const isMockApiEnabled = () => USE_MOCK_API;

export default axiosInstance;
