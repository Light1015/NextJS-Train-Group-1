'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaUser, FaEye } from 'react-icons/fa';

interface LoginPopupProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const LoginPopup = ({ onClose, onSwitchToRegister }: LoginPopupProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="fixed inset-0 z-[99999] bg-black/50 flex justify-center items-center">
            <div
                ref={popupRef}
                className="relative bg-white p-6 w-[400px] h-[641px] rounded-[20px] border border-[#0000001A] shadow-md"
                style={{ boxShadow: '0px 4px 16px 0px #00000014' }}
            >
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="font-family[Integral_CF] text-[32px] font-semibold text-center mb-1 mt-[33px]">Welcome Back</h2>
                <p className="font-family[Integral_CF] text-[16px] text-center text-gray-500 text-sm mb-4">
                    Sign in to your SHOP.CO account
                </p>

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
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none"
                        />
                        <FaEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <label>
                            <input type="checkbox" className="mr-1" /> Remember me
                        </label>
                        <a href="#" className="hover:underline">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800">
                        Sign In
                    </button>
                </form>

                <div className="text-center text-gray-500 text-sm mt-4">Or continue with</div>
                <div className="flex justify-center space-x-4 mt-3">
                    <button className="border rounded-lg px-4 py-2 text-sm">G</button>
                    <button className="border rounded-lg px-4 py-2 text-sm">f</button>
                </div>

                <p className="text-center text-sm mt-4 text-gray-600">
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
