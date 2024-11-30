import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated)
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (!token) {
     
      navigate('/login');
    }
  }, [navigate]);

  return { isAuthenticated };
};

export default useAuth;
