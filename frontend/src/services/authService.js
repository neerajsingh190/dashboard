import api from './api';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  localStorage.setItem('token', data.token);
  
};

export const signup = async (credentials) => {
  await api.post('/auth/signup', credentials);
};

export const logout = () => {
  localStorage.removeItem('token');
};
