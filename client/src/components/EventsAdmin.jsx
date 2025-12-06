import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/api';

function EventsAdmin({ isOpen, onClose, adminEmail }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path, prepend the API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 
      (window.location.hostname.includes('localhost') 
        ? 'http://localhost:5000' 
        : 'https://atgchapelmks-0dm8.onrender.com');
    
    return `${API_BASE_URL}${imagePath}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    type: 'Crusade',
    date: '',
    event_datetime: '',
    venue: '',
    host: 'ATG Chapel Mks',
    contact: '0714888066',
    description: '',
    images: [],
    featured: false,
  });

  const eventTypes = [
    'Crusade',
    'Conference',
    'Fellowship',
    'Special Service',
    'Workshop',
    'Prayer Meeting',
    'Youth Event',
    'Community Outreach'
  ];

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
    }
  }, [isOpen]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await apiService.getEvents();
      setEvents(data);
    } catch (error) {
      showMessage('error', 'Failed to fetch events: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      showMessage('error', 'Only JPEG, PNG, GIF, and WebP images are allowed');
      return;
    }
    
    // Validate file sizes (5MB max per file)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      showMessage('error', 'Each image must be less than 5MB');
      return;
    }
    
    setSelectedFiles(files);
    
    // Auto-upload images
    setUploadingImages(true);
    try {
      let uploadedPaths = [];
      
      if (files.length === 1) {
        // Single file upload
        const result = await apiService.uploadImage(files[0], adminEmail);
        uploadedPaths = [result.path];
        showMessage('success', 'Image uploaded successfully!');
      } else {
        // Multiple files upload
        const result = await apiService.uploadMultipleImages(files, adminEmail);
        uploadedPaths = result.paths;
        showMessage('success', `${files.length} images uploaded successfully!`);
      }
      
      // Add uploaded paths to form data
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedPaths]
      }));
      
      // Clear file input
      e.target.value = '';
      setSelectedFiles([]);
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedEvent) {
        // Update existing event
        await apiService.updateEvent(selectedEvent.id, formData, adminEmail);
        showMessage('success', 'Event updated successfully!');
      } else {
        // Create new event
        await apiService.createEvent(formData, adminEmail);
        showMessage('success', 'Event created successfully!');
      }
      
      resetForm();
      fetchEvents();
      setShowForm(false);
      window.dispatchEvent(new Event('events-updated'));
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: event.date,
      event_datetime: event.event_datetime.substring(0, 16), // Format for datetime-local
      venue: event.venue,
      host: event.host,
      contact: event.contact,
      description: event.description,
      images: event.images || [],
      featured: event.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    setLoading(true);
    try {
      await apiService.deleteEvent(eventId, adminEmail);
      showMessage('success', 'Event deleted successfully!');
      fetchEvents();
      window.dispatchEvent(new Event('events-updated'));
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setSelectedFiles([]);
    setFormData({
      title: '',
      type: 'Crusade',
      date: '',
      event_datetime: '',
      venue: '',
      host: 'ATG Chapel Mks',
      contact: '0714888066',
      description: '',
      images: [],
      featured: false,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-dark-deep/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-dark-lighter w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-center shrink-0">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              🎯 Events Admin Dashboard
            </h2>
            <button 
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-all hover:rotate-90"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {message.text && (
              <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <i className={`bi bi-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            <div className="flex gap-4 mb-8">
              <button 
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 ${
                  showForm 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-sm hover:shadow-glow-md'
                }`}
                onClick={() => {
                  resetForm();
                  setShowForm(!showForm);
                }}
              >
                <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-circle'}`}></i>
                {showForm ? 'Cancel' : 'Add New Event'}
              </button>
              <button 
                className="px-6 py-2.5 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all flex items-center gap-2"
                onClick={fetchEvents}
              >
                <i className="bi bi-arrow-clockwise"></i>
                Refresh
              </button>
            </div>

            {showForm ? (
              <form className="bg-gray-50 dark:bg-dark-deep rounded-2xl p-6 border border-gray-100 dark:border-white/5" onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold mb-6 text-dark dark:text-white flex items-center gap-2">
                  {selectedEvent ? '✏️ Edit Event' : '➕ Create New Event'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Event Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Youth Conference 2026"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="type" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Event Type *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Display Date *</label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 15 March"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                    <span className="text-xs text-gray-500">Human-readable format</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="event_datetime" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Actual Date & Time *</label>
                    <input
                      type="datetime-local"
                      id="event_datetime"
                      name="event_datetime"
                      value={formData.event_datetime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="venue" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Venue *</label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ATG Chapel Hall"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="host" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Host/Organizer *</label>
                    <input
                      type="text"
                      id="host"
                      name="host"
                      value={formData.host}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ATG Youth Ministry"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Contact Number *</label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      placeholder="0714888066"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="description" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the event in detail..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-lighter focus:ring-2 focus:ring-primary outline-none transition-all min-h-[120px]"
                  />
                </div>

                {/* Image Upload Section */}
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="images" className="font-semibold text-sm text-gray-700 dark:text-gray-300">Event Images</label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    uploadingImages 
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                      : 'border-primary/50 hover:border-primary/100 hover:bg-primary/5 cursor-pointer bg-white dark:bg-dark-lighter'
                  }`}>
                    <input
                      type="file"
                      id="images"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      multiple
                      onChange={handleFileSelect}
                      disabled={uploadingImages}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2">
                      <i className={`bi ${uploadingImages ? 'bi-hourglass-split animate-spin' : 'bi-cloud-upload'} text-3xl text-primary`}></i>
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        {uploadingImages ? 'Uploading...' : 'Click to select images'}
                      </span>
                      <span className="text-xs text-gray-500">Max 5MB per image (JPEG, PNG, WebP)</span>
                    </label>
                  </div>
                </div>

                {/* Display uploaded images */}
                {formData.images.length > 0 && (
                  <div className="mb-6">
                    <label className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3 block">Uploaded Images ({formData.images.length})</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {formData.images.map((imagePath, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                          <img 
                            src={getImageUrl(imagePath)} 
                            alt={`Event ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                   <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2.5 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-glow-sm hover:shadow-glow-md hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading && <i className="bi bi-arrow-repeat animate-spin"></i>}
                    {selectedEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid gap-4">
                {loading && (
                   <div className="text-center py-12">
                      <i className="bi bi-arrow-repeat animate-spin text-4xl text-primary"></i>
                      <p className="mt-4 text-gray-500">Loading events...</p>
                   </div>
                )}

                {!loading && events.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 dark:bg-dark-deep rounded-2xl border border-dashed border-gray-300">
                    <i className="bi bi-calendar-x text-4xl text-gray-400"></i>
                    <p className="mt-2 text-gray-500">No events found</p>
                  </div>
                )}

                {events.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-dark-lighter p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-dark dark:text-white">{event.title}</h3>
                        {event.featured && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm">
                            Featured
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <i className="bi bi-calendar-event"></i>
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="bi bi-geo-alt"></i>
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="bi bi-clock"></i>
                          {new Date(event.event_datetime).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleEdit(event)}
                        className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition-all"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition-all"
                        title="Delete"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventsAdmin;
