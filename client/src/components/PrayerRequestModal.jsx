import { useState } from 'react';
import apiService from '../services/api';

function PrayerRequestModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    isPublic: false
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.request) {
      alert('Please share your prayer request');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.submitPrayerRequest(formData);
      alert('Your prayer request has been received. Our prayer team will be praying for you.');
      setFormData({ name: '', email: '', request: '', isPublic: false });
      // Close modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('prayerRequestModal'));
      if (modal) modal.hide();
    } catch (error) {
      alert(error.message || 'Failed to submit prayer request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fade" id="prayerRequestModal" tabIndex="-1" aria-labelledby="prayerRequestModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="prayerRequestModalLabel">Share Your Prayer Request</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="scripture mb-4">
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." <span className="scripture-reference">Philippians 4:6</span>
            </p>
            
            <form id="prayerRequestForm" className="php-email-form">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  placeholder="Anonymous is okay"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email (Optional)</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="To receive follow-up"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="request" className="form-label">Prayer Request</label>
                <textarea 
                  className="form-control" 
                  id="request" 
                  rows="5" 
                  placeholder="Share your request, and our prayer team will lift it up to God" 
                  required
                  value={formData.request}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label className="form-check-label" htmlFor="isPublic">
                  Share this request anonymously on our prayer wall
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-divine" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrayerRequestModal;
