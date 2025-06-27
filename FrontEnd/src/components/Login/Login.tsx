'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginPopupProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const LoginPopup = ({ onClose, onSwitchToRegister }: LoginPopupProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            Swal.fire('Oops!', 'Please enter both email and password.', 'warning');
            return;
        }
        Swal.fire('Success', 'You have signed in successfully!', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[99999] bg-black/50 flex items-center justify-center p-4">
            <div
                ref={popupRef}
                className="relative bg-white p-8 w-full max-w-[400px] rounded-[20px] border border-[#0000001A] shadow-lg space-y-6"
            >
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                    onClick={onClose}
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
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none"
                        />
                        <FaUser className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <label>
                            <input type="checkbox" className="mr-1" /> Remember me
                        </label>
                        <a href="#" className="hover:underline">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
                        Sign In
                    </button>
                </form>

                <div className="text-center space-y-3">
                    <p className="text-gray-500 text-sm">Or continue with</p>
                    <div className="flex justify-center space-x-4">
                        <button className="border rounded-lg px-4 py-2 text-sm">G</button>
                        <button className="border rounded-lg px-4 py-2 text-sm">f</button>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <button onClick={onSwitchToRegister} className="text-black hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPopup;
