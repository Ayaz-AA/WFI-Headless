'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, CloseIcon } from '@/components/icons';

export function SignupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="signup-modal-close" onClick={onClose} aria-label="Close modal">
          <CloseIcon className="signup-modal-close-icon" />
        </button>
        <div className="signup-modal-header">
          <h2 className="signup-modal-title">Register Now</h2>
          <p className="signup-modal-subtitle">Fill out the form below to get started</p>
        </div>
        <form className="signup-modal-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="name" className="signup-form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="signup-form-input"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="email" className="signup-form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="signup-form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="phone" className="signup-form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="signup-form-input"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <button type="submit" className="signup-form-submit">
            Submit Registration
            <ArrowRight className="signup-form-submit-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

