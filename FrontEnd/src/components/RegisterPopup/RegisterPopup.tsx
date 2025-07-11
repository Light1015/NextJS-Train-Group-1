'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaEye, FaEnvelope } from 'react-icons/fa';
import api from '@/hooks/axiosInstance';
import { saveSession, setupAxiosInterceptor } from '@components/Login/Login';

interface LoginResponse {
  access?: string;
  refresh?: string;
  token?: string;
  user?: any;
  [key: string]: any;
}

interface RegisterPopupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPopup = ({ onClose, onSwitchToLogin }: RegisterPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: ''
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const showAlert = (type: 'success' | 'error' | 'warning', title: string, text: string) => {
    Swal.fire({
      title,
      text,
      icon: type,
      confirmButtonText: 'OK',
      customClass: { container: 'swal2-container-high-z' },
      didOpen: () => {
        const swalContainer = document.querySelector('.swal2-container-high-z') as HTMLElement;
        if (swalContainer) swalContainer.style.zIndex = '999999';
      }
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: ''
    };
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase letters and numbers';
      isValid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    if (!agree) {
      newErrors.agree = 'You must agree to the terms';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // ✅ 1. Gọi API đăng ký
      await api.post('/accounts/register/', {
        email: email.trim().toLowerCase(),
        full_name: `${firstName.trim()} ${lastName.trim()}`,
        password,
        confirm_password: confirmPassword,
      });

      // ✅ 2. Tự động đăng nhập sau khi đăng ký
      const loginRes = await api.post<LoginResponse>('/accounts/login/', {
        email: email.trim().toLowerCase(),
        password,
      });

      const { access, refresh, user } = loginRes.data;
      const accessToken = access || loginRes.data.token;
      const refreshToken = refresh || '';

      if (accessToken) {
        const userInfo = user || {
          id: Date.now(),
          email: email.trim().toLowerCase(),
          name: email.split('@')[0]
        };

        saveSession(accessToken, refreshToken, userInfo);
        setupAxiosInterceptor(accessToken);

        Swal.fire({
          title: 'Success!',
          text: `Welcome, ${userInfo.name || userInfo.email}!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        onClose();
      }
    } catch (err: any) {
      if (err.response?.data) {
        const data = err.response.data;
        if (data.email?.[0]) setErrors(prev => ({ ...prev, email: data.email[0] }));
        if (data.confirm_password?.[0]) setErrors(prev => ({ ...prev, confirmPassword: data.confirm_password[0] }));
        if (data.full_name?.[0]) setErrors(prev => ({ ...prev, firstName: data.full_name[0] }));

        const msg = data.message || data.detail;
        if (msg) showAlert('error', 'Registration Failed', msg);
      } else {
        showAlert('error', 'Error', 'Could not connect to the server.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
      <div ref={popupRef} className="relative bg-white p-6 w-[400px] rounded-[20px] border shadow-md">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-[28px] font-semibold text-center mt-8 mb-1">Create Account</h2>
        <p className="text-center text-gray-500 mb-5 text-sm">Join SHOP.CO and start shopping</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                className={`w-full px-4 py-2 bg-gray-100 border rounded-lg outline-none ${errors.firstName ? 'border-red-500 bg-red-50' : ''}`}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearFieldError('firstName');
                }}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full px-4 py-2 bg-gray-100 border rounded-lg outline-none ${errors.lastName ? 'border-red-500 bg-red-50' : ''}`}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearFieldError('lastName');
                }}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="john.doe@example.com"
              className={`w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
            />
            <FaEnvelope className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Create a strong password"
              className={`w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError('password');
                clearFieldError('confirmPassword');
              }}
            />
            <FaEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none ${errors.confirmPassword ? 'border-red-500 bg-red-50' : ''}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearFieldError('confirmPassword');
              }}
            />
            <FaEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="text-[12px] text-gray-400">
            <ul className="list-disc ml-5">
              <li>At least 8 characters</li>
              <li>Upper & lowercase letters</li>
              <li>At least one number</li>
            </ul>
          </div>

          <div className="flex items-start text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                clearFieldError('agree');
              }}
              className={`mr-2 mt-1 ${errors.agree ? 'accent-red-500' : ''}`}
            />
            <div className="flex-1">
              <span>
                I agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
              </span>
              {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 mt-2">
            Create Account
          </button>
        </form>

        <div className="text-center text-gray-500 text-sm mt-5">Or sign up with</div>
        <div className="flex justify-center gap-4 mt-3">
          <button className="border rounded-lg px-6 py-2 text-sm font-medium">G</button>
          <button className="border rounded-lg px-6 py-2 text-sm font-medium">f</button>
        </div>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-black hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPopup;
