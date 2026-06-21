import axios from 'axios';
import { mockApiService } from './mockApi';

const API_BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com';

// Always use mock API for reliable deployment
const USE_MOCK_API = true;

console.log('API Configuration:', {
  useMockApi: USE_MOCK_API,
  environment: process.env.NODE_ENV
});

// Export API Service (using mock API)
export const apiService = mockApiService;

export const isMockApiEnabled = () => USE_MOCK_API;

export default apiService;
