
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

interface LoginPopupProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
    onLoginSuccess?: (user: any) => void; // Callback khi đăng nhập thành công
}

interface LoginResponse {
    access?: string;
    refresh?: string;
    token?: string;
    user?: any;
    [key: string]: any; // Cho phép các thuộc tính khác
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
        expiresIn: 24 * 60 * 60 * 1000, // 24 hours
    };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
};
export const setupAxiosInterceptor = (token: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        const refreshResponse = await axios.post<any>(
                            `${apiUrl}/accounts/refresh/`,
                            { refresh: refreshToken }
                        );
                        const newAccessToken = refreshResponse.data.access;
                        localStorage.setItem('token', newAccessToken);
                        const sessionData = JSON.parse(localStorage.getItem('userSession') || '{}');
                        sessionData.accessToken = newAccessToken;
                        sessionData.loginTime = new Date().getTime();
                        localStorage.setItem('userSession', JSON.stringify(sessionData));
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    clearSession();
                    window.location.reload();
                }
            }
            return Promise.reject(error);
        }
    );
};

export const clearSession = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
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
            const response = await axios.post<any>('http://localhost:8000/api/accounts/login/', {
                email,
                password,
            });

            const data = response.data as LoginResponse;
            console.log('Login response:', data);

            const accessToken = data.access || data.token;
            const refreshToken = data.refresh || '';
            const user = data.user;

            if (accessToken) {
                const userInfo = user || {
                    id: Date.now(),
                    email: email,
                    name: email.split('@')[0]
                };

                saveSession(accessToken, refreshToken, userInfo);
                setupAxiosInterceptor(accessToken);

                if (onLoginSuccess) {
                    onLoginSuccess(userInfo);
                }

                Swal.fire({
                    title: 'Success!',
                    text: `Welcome back, ${userInfo.name || userInfo.email}!`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload(); // ✅ Reload ngay sau thông báo
                });

            } else {
                console.error('API Response structure:', data);
                throw new Error('No access token received from API');
            }

        } catch (error: any) {
            console.error('Login error:', error);
            let message = 'Login failed. Please try again.';

            if (error.response?.data?.detail) {
                message = error.response.data.detail;
            } else if (error.response?.data?.message) {
                message = error.response.data.message;
            } else if (error.response?.data?.non_field_errors) {
                message = error.response.data.non_field_errors[0];
            }

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
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-colors"
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
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-colors"
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
                        className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="text-center space-y-3">
                    <p className="text-gray-500 text-sm">Or continue with</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            G
                        </button>
                        <button
                            className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            f
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-black hover:underline disabled:opacity-50"
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

// Utility functions để sử dụng ở các component khác
export const getSession = () => {
    try {
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
            const session = JSON.parse(sessionData);
            const now = new Date().getTime();

            // Check if session expired
            if (now - session.loginTime > session.expiresIn) {
                clearSession();
                return null;
            }

            return session;
        }
    } catch (error) {
        console.error('Error getting session:', error);
        clearSession();
    }
    return null;
};

export const isAuthenticated = () => {
    const session = getSession();
    return session && session.accessToken;
};

export const getCurrentUser = () => {
    const session = getSession();
    return session ? session.user : null;
};

export const logout = () => {
    clearSession();
    window.location.href = '/'; // Redirect to home page
};
