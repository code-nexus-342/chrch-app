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
        className="admin-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="admin-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
            .admin-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              padding: 1rem;
              overflow-y: auto;
            }

            .admin-modal {
              background: white;
              border-radius: 20px;
              width: 100%;
              max-width: 1200px;
              max-height: 90vh;
              overflow-y: auto;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }

            .admin-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 2rem;
              border-radius: 20px 20px 0 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .admin-header h2 {
              margin: 0;
              font-size: 1.8rem;
            }

            .admin-close {
              background: rgba(255,255,255,0.2);
              border: none;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              color: white;
              font-size: 1.5rem;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .admin-close:hover {
              background: rgba(255,255,255,0.3);
              transform: rotate(90deg);
            }

            .admin-content {
              padding: 2rem;
            }

            .admin-actions {
              display: flex;
              gap: 1rem;
              margin-bottom: 2rem;
            }

            .btn-admin {
              padding: 0.8rem 1.5rem;
              border: none;
              border-radius: 10px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            }

            .btn-admin-primary {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }

            .btn-admin-primary:hover {
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
              transform: translateY(-2px);
            }

            .btn-admin-secondary {
              background: #f0f0f0;
              color: #333;
            }

            .btn-admin-secondary:hover {
              background: #e0e0e0;
            }

            .message-box {
              padding: 1rem;
              border-radius: 10px;
              margin-bottom: 1rem;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .message-success {
              background: #d4edda;
              color: #155724;
              border: 1px solid #c3e6cb;
            }

            .message-error {
              background: #f8d7da;
              color: #721c24;
              border: 1px solid #f5c6cb;
            }

            .admin-form {
              background: #f8f9fa;
              padding: 2rem;
              border-radius: 15px;
              margin-bottom: 2rem;
            }

            .form-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .form-group {
              display: flex;
              flex-direction: column;
            }

            .form-group label {
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: #333;
              font-size: 0.9rem;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
              padding: 0.8rem;
              border: 2px solid #e0e0e0;
              border-radius: 10px;
              font-size: 1rem;
              transition: all 0.3s ease;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
              outline: none;
              border-color: #667eea;
              box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .form-group textarea {
              min-height: 120px;
              resize: vertical;
              font-family: inherit;
            }

            .checkbox-group {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .checkbox-group input[type="checkbox"] {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }

            .form-actions {
              display: flex;
              gap: 1rem;
              justify-content: flex-end;
              margin-top: 1.5rem;
            }

            .events-list {
              display: grid;
              gap: 1rem;
            }

            .event-item {
              background: #f8f9fa;
              padding: 1.5rem;
              border-radius: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: all 0.3s ease;
            }

            .event-item:hover {
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }

            .event-info h3 {
              margin: 0 0 0.5rem 0;
              color: #333;
            }

            .event-meta {
              display: flex;
              gap: 1rem;
              font-size: 0.9rem;
              color: #666;
            }

            .event-badge {
              display: inline-block;
              padding: 0.3rem 0.8rem;
              border-radius: 20px;
              font-size: 0.8rem;
              font-weight: 600;
              margin-right: 0.5rem;
            }

            .badge-featured {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
            }

            .badge-type {
              background: #e3f2fd;
              color: #1976d2;
            }

            .event-actions {
              display: flex;
              gap: 0.5rem;
            }

            .btn-icon {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              font-size: 1.1rem;
            }

            .btn-edit {
              background: #e3f2fd;
              color: #1976d2;
            }

            .btn-edit:hover {
              background: #1976d2;
              color: white;
            }

            .btn-delete {
              background: #ffebee;
              color: #c62828;
            }

            .btn-delete:hover {
              background: #c62828;
              color: white;
            }

            .loading-spinner {
              text-align: center;
              padding: 2rem;
              color: #667eea;
            }

            .help-text {
              font-size: 0.85rem;
              color: #666;
              margin-top: 0.3rem;
            }

            .uploaded-images {
              margin-top: 1rem;
            }

            .uploaded-images label {
              display: block;
              font-weight: 600;
              margin-bottom: 0.8rem;
              color: #333;
            }

            .image-preview-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
              gap: 1rem;
            }

            .image-preview-item {
              position: relative;
              width: 100%;
              aspect-ratio: 1;
              border-radius: 10px;
              overflow: hidden;
              border: 2px solid #e0e0e0;
              transition: all 0.3s ease;
            }

            .image-preview-item:hover {
              border-color: #667eea;
              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
            }

            .image-preview-item img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .remove-image-btn {
              position: absolute;
              top: 5px;
              right: 5px;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: rgba(198, 40, 40, 0.9);
              color: white;
              border: none;
              font-size: 1.2rem;
              font-weight: bold;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              line-height: 1;
              padding: 0;
            }

            .remove-image-btn:hover {
              background: #c62828;
              transform: scale(1.1);
            }

            @media (max-width: 768px) {
              .admin-modal {
                max-width: 100%;
                max-height: 100vh;
                border-radius: 0;
              }

              .admin-header {
                border-radius: 0;
              }

              .form-grid {
                grid-template-columns: 1fr;
              }

              .event-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
              }
            }
          `}</style>

          <div className="admin-header">
            <h2>🎯 Events Admin Dashboard</h2>
            <button className="admin-close" onClick={onClose}>×</button>
          </div>

          <div className="admin-content">
            {message.text && (
              <div className={`message-box message-${message.type}`}>
                <i className={`bi bi-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                <span>{message.text}</span>
              </div>
            )}

            <div className="admin-actions">
              <button 
                className="btn-admin btn-admin-primary"
                onClick={() => {
                  resetForm();
                  setShowForm(!showForm);
                }}
              >
                <i className="bi bi-plus-circle"></i>
                {showForm ? 'Cancel' : 'Add New Event'}
              </button>
              <button 
                className="btn-admin btn-admin-secondary"
                onClick={fetchEvents}
              >
                <i className="bi bi-arrow-clockwise"></i>
                Refresh
              </button>
            </div>

            {showForm && (
              <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{selectedEvent ? '✏️ Edit Event' : '➕ Create New Event'}</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="title">Event Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Youth Conference 2026"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">Event Type *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date">Display Date *</label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 15 March, 2026 or 15-17 March"
                    />
                    <span className="help-text">Human-readable format</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="event_datetime">Actual Date & Time *</label>
                    <input
                      type="datetime-local"
                      id="event_datetime"
                      name="event_datetime"
                      value={formData.event_datetime}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="help-text">Event auto-deletes after this time</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="venue">Venue *</label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ATG Chapel Hall"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="host">Host/Organizer *</label>
                    <input
                      type="text"
                      id="host"
                      name="host"
                      value={formData.host}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ATG Youth Ministry"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact">Contact Number *</label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      placeholder="0714888066"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the event in detail..."
                  />
                </div>

                {/* Image Upload Section */}
                <div className="form-group">
                  <label htmlFor="images">Event Images</label>
                  <input
                    type="file"
                    id="images"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploadingImages}
                    style={{ 
                      padding: '0.8rem',
                      border: '2px dashed #667eea',
                      borderRadius: '10px',
                      cursor: uploadingImages ? 'not-allowed' : 'pointer',
                      backgroundColor: uploadingImages ? '#f0f0f0' : 'white'
                    }}
                  />
                  <span className="help-text">
                    {uploadingImages 
                      ? '⏳ Uploading images...' 
                      : 'Select up to 5 images (JPEG, PNG, GIF, WebP). Max 5MB per image.'}
                  </span>
                </div>

                {/* Display uploaded images */}
                {formData.images.length > 0 && (
                  <div className="uploaded-images">
                    <label>Uploaded Images ({formData.images.length}):</label>
                    <div className="image-preview-grid">
                      {formData.images.map((imagePath, index) => (
                        <div key={index} className="image-preview-item">
                          <img 
                            src={getImageUrl(imagePath)} 
                            alt={`Event ${index + 1}`}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                          />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => handleRemoveImage(index)}
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="featured">⭐ Featured Event</label>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-admin btn-admin-secondary"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-admin btn-admin-primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : selectedEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            )}

            <div className="events-list">
              <h3>📅 All Events ({events.length})</h3>
              {loading && !showForm ? (
                <div className="loading-spinner">
                  <i className="bi bi-hourglass-split" style={{ fontSize: '2rem' }}></i>
                  <p>Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  No events yet. Create your first event!
                </p>
              ) : (
                events.map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-info">
                      <div>
                        {event.featured && <span className="event-badge badge-featured">⭐ Featured</span>}
                        <span className="event-badge badge-type">{event.type}</span>
                      </div>
                      <h3>{event.title}</h3>
                      <div className="event-meta">
                        <span><i className="bi bi-calendar"></i> {event.date}</span>
                        <span><i className="bi bi-geo-alt"></i> {event.venue}</span>
                        <span><i className="bi bi-telephone"></i> {event.contact}</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <button 
                        className="btn-icon btn-edit"
                        onClick={() => handleEdit(event)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(event.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventsAdmin;
