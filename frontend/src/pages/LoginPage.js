
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from "../context/AuthContext";

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5'
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '32px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '8px'
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px'
  },
  signupContainer: {
    marginTop: '24px',
    textAlign: 'center',
    color: '#666'
  },
  signupButton: {
    background: 'none',
    border: 'none',
    color: '#4A90E2',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '4px'
  }
};

// Add hover and focus styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  input:focus {
    border-color: #4A90E2;
  }
  button:hover {
    background-color: #357ABD;
  }
  .signup-btn:hover {
    color: #357ABD;
  }
`;
document.head.appendChild(styleSheet);

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login2 } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      login2(credentials);
      localStorage.setItem('username', credentials.username);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <h2 style={styles.title}>Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <div style={styles.signupContainer}>
          Don't have an account?
          <button
            onClick={navigateToSignup}
            style={styles.signupButton}
            className="signup-btn"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;