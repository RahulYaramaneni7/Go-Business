// Mock data for development and testing
const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);

const mockMetrics = [
  { id: '1', label: 'Total Earnings', value: '$9,568.00' },
  { id: '2', label: 'Discount Percentage', value: '60%' },
  { id: '3', label: 'Total Referral', value: '50' },
  { id: '4', label: 'Discount Amount', value: '$300' }
];

const mockServiceSummary = {
  service: 'some service',
  yourReferrals: '0 + 0',
  activeReferrals: '0 + 0',
  totalRefEarnings: '$0.00'
};

const mockReferral = {
  link: 'https://gobusiness.com/referral/ABCXYZ',
  code: 'ABCXYZ'
};

const mockReferrals = [
  { id: 1, name: 'Geeta', serviceName: 'Frontend', date: '2023/07/09', profit: 258900 },
  { id: 2, name: 'Vinad', serviceName: 'Graphics', date: '2023/05/16', profit: 178900 },
  { id: 3, name: 'Rekha', serviceName: 'HR', date: '2023/05/08', profit: 88400 },
  { id: 4, name: 'Ashok', serviceName: 'B2B', date: '2023/04/22', profit: 147900 },
  { id: 5, name: 'Sonal', serviceName: 'PM', date: '2023/03/11', profit: 302900 },
  { id: 6, name: 'Mohit', serviceName: 'QA', date: '2023/02/28', profit: 119900 },
  { id: 7, name: 'Aryat', serviceName: 'DevOps', date: '2023/07/02', profit: 198700 },
  { id: 8, name: 'Shrivav', serviceName: 'Frontend', date: '2023/01/03', profit: 272900 },
  { id: 9, name: 'Harish', serviceName: 'Frontend', date: '2023/11/05', profit: 321200 },
  { id: 10, name: 'Munendra', serviceName: 'HR', date: '2023/10/19', profit: 132000 },
  { id: 11, name: 'Priya', serviceName: 'Marketing', date: '2023/09/15', profit: 95600 },
  { id: 12, name: 'Ravi', serviceName: 'Backend', date: '2023/08/20', profit: 215400 }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  login: async (email, password) => {
    await delay(800);
    
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        data: {
          success: true,
          data: {
            token: mockToken
          }
        }
      };
    }
    
    const error = new Error('Invalid email or password');
    error.response = {
      status: 401,
      data: {
        message: 'Invalid email or password'
      }
    };
    throw error;
  },

  getReferrals: async (params = {}) => {
    await delay(600);
    
    let filteredReferrals = [...mockReferrals];
    
    // Apply search filter
    if (params.search || params.q) {
      const searchTerm = (params.search || params.q).toLowerCase();
      filteredReferrals = filteredReferrals.filter(ref =>
        ref.name.toLowerCase().includes(searchTerm) ||
        ref.serviceName.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (params.sort === 'asc') {
      filteredReferrals.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      // Default: newest first (desc)
      filteredReferrals.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return {
      data: {
        success: true,
        data: {
          metrics: mockMetrics,
          serviceSummary: mockServiceSummary,
          referral: mockReferral,
          referrals: filteredReferrals
        }
      }
    };
  },

  getReferral: async (id) => {
    await delay(500);
    
    const referral = mockReferrals.find(r => r.id === parseInt(id));
    
    if (!referral) {
      const error = new Error('Referral not found');
      error.response = {
        status: 404,
        data: {
          message: 'Referral not found'
        }
      };
      throw error;
    }
    
    return {
      data: {
        success: true,
        data: referral
      }
    };
  }
};

export default mockApiService;
