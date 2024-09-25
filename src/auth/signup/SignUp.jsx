
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css'; 
// import './Signup.css';
// import { Link } from 'react-router-dom';

// function Signup () {
  
//   // Yup validation schema
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .matches(
//         /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//         "Invalid email address"
//       )
//       .required("Email is Required"),
//     password: Yup.string()
//       .min(8, 'Password must be at least 8 characters')
//       .required('Password is required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Please confirm your password'),
//   });

//   return (
//     <div className="auth-container">
//       <div className="auth-content">
//         <div className="auth-image">
//           {/* Background image is handled via CSS */}
//         </div>
//         <div className="auth-form-section">
//           <div className="auth-form-wrapper">
//             <h2 className="auth-heading">Sign Up</h2>

//             <Formik
//               initialValues={{ email: '', password: '', confirmPassword: '' }}
//               validationSchema={validationSchema}
//               onSubmit={(values) => {
//                 // Handle form submission
//                 console.log('Form submitted:', values);
//                 toast.success('Registration successful!', {
//                   position: "top-right", // Position of the toast
//                   autoClose: 3000, // Duration before auto-close (3 seconds)
//                   hideProgressBar: true, // Hide the progress bar
//                   closeOnClick: true, // Close on click
//                   pauseOnHover: false, // Do not pause on hover
//                   draggable: false, // Disable dragging
//                   progress: undefined,
//                 });
//               }}
//             >
//               {({ errors, touched }) => (
//                 <Form className="signup-form">
//                   <label htmlFor="email" className="auth-label">Email</label>
//                   <Field
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Type your email"
//                     className={`auth-input ${errors.email && touched.email ? 'error' : ''}`}
//                     required
//                   />
//                   <ErrorMessage name="email" component="div" className="error-message" />

//                   <label htmlFor="password" className="auth-label">Password</label>
//                   <Field
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Type your password"
//                     className={`auth-input ${errors.password && touched.password ? 'error' : ''}`}
//                     required
//                   />
//                   <ErrorMessage name="password" component="div" className="error-message" />

//                   <label htmlFor="confirm-password" className="auth-label">Confirm Password</label>
//                   <Field
//                     type="password"
//                     id="confirm-password"
//                     name="confirmPassword"
//                     placeholder="Confirm your password"
//                     className={`auth-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
//                     required
//                   />
//                   <ErrorMessage name="confirmPassword" component="div" className="error-message" />

//                   <button className="auth-button" type="submit">Sign Up</button>
//                 </Form>
//               )}
//             </Formik>

//             <p className="auth-login-link">
//               Already have an account? <Link to="/login" className="auth-link">Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       <ToastContainer /> {/* Add ToastContainer here */}
//     </div>
//   );
// }

// export default Signup;
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        'Invalid email address'
      )
      .required('Email is Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-image">
          {/* Background image is handled via CSS */}
        </div>
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <h2 className="auth-heading">Sign Up</h2>

            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                // Handle form submission
                console.log('Form submitted:', values);
                toast.success('Registration successful!', {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                });
              }}
            >
              {({ errors, touched }) => (
                <Form className="signup-form">
                  <label htmlFor="email" className="auth-label">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Type your email"
                    className={`auth-input ${errors.email && touched.email ? 'error' : ''}`}
                    required
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />

                  <label htmlFor="password" className="auth-label">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    className={`auth-input ${errors.password && touched.password ? 'error' : ''}`}
                    required
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />

                  <label htmlFor="confirm-password" className="auth-label">Confirm Password</label>
                  <Field
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`auth-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                    required
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />

                  <button className="auth-button" type="submit">Sign Up</button>
                </Form>
              )}
            </Formik>

            <p className="auth-login-link">
              Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Signup;
