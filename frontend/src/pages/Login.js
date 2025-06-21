import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConf, setRegPasswordConf] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/login', { email, password });
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        if (onLogin) onLogin(res.data.user);
        navigate('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegLoading(true);
    try {
      const res = await axios.post('/api/register', {
        name: regName,
        email: regEmail,
        password: regPassword,
        password_confirmation: regPasswordConf,
      });
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        if (onLogin) onLogin(res.data.user);
        navigate('/');
      } else {
        setRegError('Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        // Show first error message from Laravel validation
        const firstError = Object.values(err.response.data.errors)[0][0];
        setRegError(firstError);
      } else {
        setRegError('Registration failed. Please check your details.');
      }
    } finally {
      setRegLoading(false);
    }
  };

  if (showRegister) {
    return (
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h1>Customer Registration</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={regName}
              onChange={e => setRegName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={regPasswordConf}
              onChange={e => setRegPasswordConf(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {regError && <div style={{ color: 'red' }}>{regError}</div>}
          <button type="submit" disabled={regLoading}>
            {regLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <button className="btn btn-link" onClick={() => setShowRegister(false)}>
          Already have an account? Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button className="btn btn-link" onClick={() => setShowRegister(true)}>
        Don't have an account? Register as Customer
      </button>
    </div>
  );
};

export default Login;