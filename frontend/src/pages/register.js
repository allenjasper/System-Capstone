import React from 'react';
import Register from '../components/Auth/Register';

const RegisterPage = (props) => {
  // Accept onRegister from props or ignore if not provided
  return <Register {...props} />;
};

export default RegisterPage;