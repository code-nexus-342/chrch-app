import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AdminLogin({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // In a real app, you would verify this against your backend
    // For now, we'll just pass it through
    setTimeout(() => {
      onLogin(email);
      setLoading(false);
      setEmail('');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="login-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="login-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
            .login-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10001;
              padding: 1rem;
            }

            .login-modal {
              background: white;
              border-radius: 20px;
              width: 100%;
              max-width: 450px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              overflow: hidden;
            }

            .login-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 2rem;
              text-align: center;
            }

            .login-header h2 {
              margin: 0 0 0.5rem 0;
              font-size: 1.8rem;
            }

            .login-header p {
              margin: 0;
              opacity: 0.9;
              font-size: 0.95rem;
            }

            .login-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }

            .login-body {
              padding: 2rem;
            }

            .login-form {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }

            .form-group-login {
              display: flex;
              flex-direction: column;
            }

            .form-group-login label {
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: #333;
            }

            .form-group-login input {
              padding: 1rem;
              border: 2px solid #e0e0e0;
              border-radius: 10px;
              font-size: 1rem;
              transition: all 0.3s ease;
            }

            .form-group-login input:focus {
              outline: none;
              border-color: #667eea;
              box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .error-message {
              background: #ffebee;
              color: #c62828;
              padding: 0.8rem;
              border-radius: 10px;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              font-size: 0.9rem;
            }

            .login-actions {
              display: flex;
              gap: 1rem;
              margin-top: 1rem;
            }

            .btn-login {
              flex: 1;
              padding: 1rem;
              border: none;
              border-radius: 10px;
              font-weight: 600;
              font-size: 1rem;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .btn-login-primary {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }

            .btn-login-primary:hover:not(:disabled) {
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
              transform: translateY(-2px);
            }

            .btn-login-primary:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            .btn-login-secondary {
              background: #f0f0f0;
              color: #333;
            }

            .btn-login-secondary:hover {
              background: #e0e0e0;
            }

            .info-box {
              background: #e3f2fd;
              color: #1976d2;
              padding: 1rem;
              border-radius: 10px;
              font-size: 0.9rem;
              margin-top: 1rem;
            }

            @media (max-width: 768px) {
              .login-modal {
                max-width: 95%;
              }

              .login-header {
                padding: 1.5rem;
              }

              .login-body {
                padding: 1.5rem;
              }
            }
          `}</style>

          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h2>Admin Access</h2>
            <p>Enter your admin email to continue</p>
          </div>

          <div className="login-body">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group-login">
                <label htmlFor="admin-email">Admin Email</label>
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@atgchapel.org"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <div className="error-message">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              <div className="login-actions">
                <button 
                  type="button" 
                  className="btn-login btn-login-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-login btn-login-primary"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Continue'}
                </button>
              </div>
            </form>

            <div className="info-box">
              <strong>ℹ️ Note:</strong> Only authorized admin emails can access the events dashboard. Your email must be registered in the admin_users table.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AdminLogin;
