'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaEye, FaEnvelope } from 'react-icons/fa';

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
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            Swal.fire('Oops!', 'Please fill in all fields.', 'warning');
            return;
        }
        if (password !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match.', 'error');
            return;
        }
        if (!agree) {
            Swal.fire('Warning', 'You must agree to the terms.', 'warning');
            return;
        }

        Swal.fire('Success', 'Account created successfully!', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[99999] bg-black/50 flex justify-center items-center">
            <div
                ref={popupRef}
                className="relative bg-white p-6 w-[400px] rounded-[20px] border border-[#0000001A] shadow-md"
            >
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
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-1/2 px-4 py-2 bg-gray-100 border rounded-lg outline-none"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-1/2 px-4 py-2 bg-gray-100 border rounded-lg outline-none"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="john.doe@example.com"
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaEnvelope className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Create a strong password"
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 pr-10 bg-gray-100 border rounded-lg outline-none"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FaEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="text-[12px] text-gray-400">
                        <ul className="list-disc ml-5">
                            <li>At least 8 characters</li>
                            <li>Upper & lowercase letters</li>
                            <li>At least one number</li>
                        </ul>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={() => setAgree(!agree)}
                            className="mr-2"
                        />
                        <span>
                            I agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 mt-2"
                    >
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
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-black hover:underline"
                    >
                        Sign in
                    </button>
                </p>

            </div>
        </div>
    );
};

export default RegisterPopup;
