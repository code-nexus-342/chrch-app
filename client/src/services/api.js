import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname.includes('localhost') 
    ? 'http://localhost:5000' 
    : 'https://atgchapelmks-0dm8.onrender.com');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  // Newsletter subscription
  subscribeNewsletter: async (email) => {
    try {
      const response = await apiClient.post('/api/newsletter', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Subscription failed');
    }
  },

  // Prayer request
  submitPrayerRequest: async (data) => {
    try {
      const response = await apiClient.post('/api/prayer-request', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit prayer request');
    }
  },

  // Contact form
  submitContactForm: async (data) => {
    try {
      const response = await apiClient.post('/api/contact', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },
};

export default apiService;
