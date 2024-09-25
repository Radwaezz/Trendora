

import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Address from '../../public/icons/adress-b49e9cef.svg';
import Phone from '../../public/icons/phone-13011fed.svg';
import Time from '../../public/icons/clock-852d044e (1).svg';
import './Contact.css';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(15, 'Name cannot be more than 15 characters long')
    .required('This field is required'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    )
    .required("Email is Required"),
  subject: Yup.string().required('This field is required'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

function Contact() {
  const [formValues, setFormValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Effect to hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3 seconds

      // Cleanup timer when the component is unmounted or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form values
      await validationSchema.validate(formValues, { abortEarly: false });

      // If validation passes
      console.log(formValues);
      setSuccessMessage('Form submitted successfully!'); // Set success message
      setFormValues({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
      setSuccessMessage(''); // Clear success message on error
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <div className="contact-title-container">
        <h1 className='contact-title'>Get In Touch With Us</h1>
      </div>
      <p className="description">
        For More Information About Our Products & Services, Please Feel Free To Drop Us 
        <p className='center'>An Email. Our Staff Will Be There To Help You Out.</p>
      </p>
    
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <img src={Address} className="icon" alt="Address Icon" />
            <p>
              <strong className="heading">Address</strong><br />
              298 5th St, Avenue, New <br />
              York 10001, United <br />
              States
            </p>
          </div>
          <div className="info-item">
            <img src={Phone} className="icon" alt="Phone Icon" />
            <p>
              <strong className="heading">Phone</strong><br />
              Mobile: (+84) 546-6789<br />
              Hotline: (+84) 456-6789
            </p>
          </div>
          <div className="info-item">
            <img src={Time} className="icon" alt="Time Icon" />
            <p>
              <strong className="heading">Working Time</strong><br />
              Monday-Friday: 9:00 - <br />
              22:00<br />
              Saturday-Sunday: 9:00 - <br /> 20:00
            </p>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className={errors.name ? 'error' : ''}>Your name</label>
            <input type="text" id="name" name="name" placeholder="Your name" value={formValues.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
            {errors.name && <div className="error-message">{errors.name}</div>}

            <label htmlFor="email" className={errors.email ? 'error' : ''}>Email address</label>
            <input type="email" id="email" name="email" placeholder="Email address" value={formValues.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
            {errors.email && <div className="error-message">{errors.email}</div>}

            <label htmlFor="subject" className={errors.subject ? 'error' : ''}>Subject</label>
            <input type="text" id="subject" name="subject" placeholder="This is optional" value={formValues.subject} onChange={handleChange} className={errors.subject ? 'error' : ''} />
            {errors.subject && <div className="error-message">{errors.subject}</div>}

            <label htmlFor="message" className={errors.message ? 'error' : ''}>Message</label>
            <textarea id="message" name="message" placeholder="Hi! I'd like to talk about" value={formValues.message} onChange={handleChange} className={errors.message ? 'error' : ''} />
            {errors.message && <div className="error-message">{errors.message}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {/* Success message box */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
