import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import PublicLayout from '@/layouts/PublicLayout';

// Define the API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const ForgotPasswordPage = () => {
    // --- 1. HOOKS & STATE ---
    const [email, setEmail] = useState('');

    // --- 2. API MUTATION (using React Query) ---
    const mutation = useMutation({
        mutationFn: (emailAddress) => {
            // This function makes the API call
            return axios.post(`${API_URL}/users/forgot-password`, { email: emailAddress });
        },
        onSuccess: (response) => {
            // This runs if the API call is successful
            // We show the toast, and the 'isSuccess' state will hide the form
            toast.success(response.data.message);
        },
        onError: (error) => {
            // This runs if the API call fails
            const message = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(message);
        },
    });

    // --- 3. FORM SUBMIT HANDLER ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        // Call the mutation to send the email
        mutation.mutate(email);
    };

    // --- 4. JSX (The Form) ---
    return (
        <PublicLayout title="Forgot Password - Shafqat Ali Academy">
            <div className="flex justify-center items-center py-12 px-4">
                <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-lg">
                    
                    {/* This is a great UX feature:
                      If the mutation is successful, we hide the form 
                      and show the success message.
                    */}
                    {mutation.isSuccess ? (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Check Your Email
                            </h2>
                            <p className="text-gray-700 mb-6">
                                {mutation.data.data.message}
                            </p>
                            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                &larr; Back to Login
                            </Link>
                        </div>
                    ) : (
                        // If we haven't submitted yet, show the form
                        <>
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                                Forgot Your Password?
                            </h2>
                            <p className="text-center text-gray-600 mb-4">
                                No problem. Enter your email address below and we'll send you a link to reset it.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label 
                                        htmlFor="email" 
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={mutation.isLoading}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                                    >
                                        {mutation.isLoading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-600">
                                    Remember your password?{' '}
                                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
};

export default ForgotPasswordPage;