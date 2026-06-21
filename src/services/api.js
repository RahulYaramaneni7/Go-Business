import { mockApiService } from './mockApi';

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
