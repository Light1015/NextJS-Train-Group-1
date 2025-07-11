'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '@/hooks/axiosInstance';

interface LoginPopupProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess?: (user: any) => void;
}

interface LoginResponse {
  access?: string;
  refresh?: string;
  token?: string;
  user?: any;
  [key: string]: any;
}

interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

export const saveSession = (accessToken: string, refreshToken: string, user: User) => {
  const sessionData = {
    accessToken,
    refreshToken,
    user,
    loginTime: new Date().getTime(),
    expiresIn: 24 * 60 * 60 * 1000,
  };
  localStorage.setItem('userSession', JSON.stringify(sessionData));
  localStorage.setItem('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem('userSession');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
};

export const setupAxiosInterceptor = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const res = await api.post('/accounts/refresh/', { refresh: refreshToken });
            const data = res.data as LoginResponse;
            const newAccess = data.access;
            if (typeof newAccess === 'string') {
              localStorage.setItem('token', newAccess);
              const sessionData = JSON.parse(localStorage.getItem('userSession') || '{}');
              sessionData.accessToken = newAccess;
              sessionData.loginTime = new Date().getTime();
              localStorage.setItem('userSession', JSON.stringify(sessionData));
              api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
              originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
              return api(originalRequest);
            } else {
              throw new Error('No access token received from refresh endpoint');
            }
          }
        } catch (err) {
          clearSession();
          window.location.reload();
        }
      }
      return Promise.reject(error);
    }
  );
};

const LoginPopup = ({ onClose, onSwitchToRegister, onLoginSuccess }: LoginPopupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire('Oops!', 'Please enter both email and password.', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post<LoginResponse>('/accounts/login/', { email, password });
      const data = res.data;

      const accessToken = data.access || data.token;
      const refreshToken = data.refresh || '';
      const user = data.user || {
        id: Date.now(),
        email,
        name: email.split('@')[0],
      };

      if (accessToken) {
        saveSession(accessToken, refreshToken, user);
        setupAxiosInterceptor(accessToken);
        onLoginSuccess?.(user);

        Swal.fire({
          title: 'Success!',
          text: `Welcome back, ${user.name || user.email}!`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => window.location.reload());
      } else {
        throw new Error('No access token received');
      }
    } catch (error: any) {
      let message = 'Login failed. Please try again.';
      if (error.response?.data?.detail) message = error.response.data.detail;
      else if (error.response?.data?.message) message = error.response.data.message;
      else if (error.response?.data?.non_field_errors) message = error.response.data.non_field_errors[0];

      Swal.fire('Error', message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
      <div
        ref={popupRef}
        className="relative bg-white p-8 w-full max-w-[400px] rounded-[20px] border border-[#0000001A] shadow-lg space-y-6"
      >
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
          disabled={isLoading}
        >
          &times;
        </button>

        <div className="text-center space-y-2 mt-6">
          <h2 className="text-[32px] font-semibold font-[Integral_CF]">Welcome Back</h2>
          <p className="text-[16px] text-gray-500">Sign in to your SHOP.CO account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none focus:border-blue-500 focus:bg-white"
              disabled={isLoading}
              required
            />
            <FaUser className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none focus:border-blue-500 focus:bg-white"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
              disabled={isLoading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" disabled={isLoading} />
              Remember me
            </label>
            <a href="#" className="hover:underline text-blue-600">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center space-y-3">
          <p className="text-gray-500 text-sm">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button className="border rounded-lg px-4 py-2 text-sm" disabled={isLoading}>G</button>
            <button className="border rounded-lg px-4 py-2 text-sm" disabled={isLoading}>f</button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-black hover:underline"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;

// 🔹 Utils
export const getSession = () => {
  try {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      const now = new Date().getTime();
      if (now - session.loginTime > session.expiresIn) {
        clearSession();
        return null;
      }
      return session;
    }
  } catch (err) {
    clearSession();
  }
  return null;
};

export const isAuthenticated = () => {
  const session = getSession();
  return !!session?.accessToken;
};

export const getCurrentUser = () => {
  const session = getSession();
  return session?.user || null;
};

export const logout = () => {
  clearSession();
  window.location.href = '/';
};
