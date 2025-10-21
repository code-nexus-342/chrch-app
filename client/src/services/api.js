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

  // Events API
  // Get all events (public)
  getEvents: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.featured !== undefined) params.append('featured', filters.featured);
      
      const url = `/api/events${params.toString() ? '?' + params.toString() : ''}`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  },

  // Get single event by ID (public)
  getEvent: async (id) => {
    try {
      const response = await apiClient.get(`/api/events/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event');
    }
  },

  // Create event (admin only)
  createEvent: async (eventData, adminEmail) => {
    try {
      const response = await apiClient.post('/api/events', {
        ...eventData,
        adminEmail,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create event');
    }
  },

  // Update event (admin only)
  updateEvent: async (id, eventData, adminEmail) => {
    try {
      const response = await apiClient.put(`/api/events/${id}`, {
        ...eventData,
        adminEmail,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update event');
    }
  },

  // Delete event (admin only)
  deleteEvent: async (id, adminEmail) => {
    try {
      const response = await apiClient.delete(`/api/events/${id}`, {
        data: { adminEmail },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete event');
    }
  },

  // Upload single image (admin only)
  uploadImage: async (file, adminEmail) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('adminEmail', adminEmail);
      
      const response = await axios.post(`${API_BASE_URL}/api/upload/single`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
  },

  // Upload multiple images (admin only)
  uploadMultipleImages: async (files, adminEmail) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });
      formData.append('adminEmail', adminEmail);
      
      const response = await axios.post(`${API_BASE_URL}/api/upload/multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload images');
    }
  },

  // Delete uploaded image (admin only)
  deleteImage: async (filename, adminEmail) => {
    try {
      const response = await apiClient.delete('/api/upload/delete', {
        data: { filename, adminEmail },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete image');
    }
  },
};

export default apiService;
