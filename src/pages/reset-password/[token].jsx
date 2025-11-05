// frontend/src/pages/reset-password/[token].jsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query'; // Makes 'useMutation' available
import axios from 'axios';
import { toast } from 'react-toastify';
import PublicLayout from '@/layouts/PublicLayout'; // The import we fixed last time
import Link from 'next/link';

// Define the API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const ResetPasswordPage = () => {
    // --- 1. HOOKS & STATE ---
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    // Get the token from the URL query parameters
    const { token } = router.query;

    // --- 2. API MUTATION (This is the missing part!) ---
    // This line defines the 'mutation' variable
    const mutation = useMutation({
        mutationFn: (passwords) => {
            if (!token) {
                throw new Error('No reset token found.');
            }
            return axios.patch(`${API_URL}/users/reset-password/${token}`, passwords);
        },
        onSuccess: () => {
            toast.success('Password has been reset successfully! Please log in.');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(message);
        },
    });

    // --- 3. FORM SUBMIT HANDLER ---
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        mutation.mutate({ password, confirmPassword });
    };

    // --- 4. JSX (The Form) ---
    return (
        <PublicLayout title="Reset Your Password - Shafqat Ali Academy">
            <div className="flex justify-center items-center py-12 px-4">
                <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-lg">

                    {mutation.isSuccess ? (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-green-600 mb-4">
                                Password Reset!
                            </h2>
                            <p className="text-gray-700 mb-6">
                                You can now log in with your new password.
                            </p>
                            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Go to Login &rarr;
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                                Set a New Password
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div> {/* This is the div that was broken before */}

                                <div>
                                    <button
                                        type="submit"
                                        disabled={mutation.isLoading || !token}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                                    >
                                        {mutation.isLoading ? 'Resetting...' : 'Set New Password'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
};

export default ResetPasswordPage;