
import './LogIn.css';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logIn from '/images/home-hero-bg-887bfdde.png';

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    )
    .required("Email is Required"),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function LogIn() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Add any authentication logic here
    console.log('Form data:', values);
    navigate('/signin'); // Redirect to the signin page after form submission
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h1 className="login-title">Login</h1>

          {/* Formik form setup */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="sign-in-form">
                <div className="login-input-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Type your email"
                    className="login-input"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div className="login-input-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    className="login-input"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <div className="login-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="login-forgot-password">Forgot password?</a>
                </div>
                <button type="submit" className="login-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Log in'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="login-signup-link">
            <p className="login-paragraph">
              Don’t have an account? <Link to="/signup">Signup</Link> 
            </p>
          </div>
        </div>
      </div>
      <div className="login-image-section">
        {/* Uncomment the image if needed */}
        <img src={logIn} alt="Decorative Image" />
      </div>
    </div>
  );
}

export default LogIn;
