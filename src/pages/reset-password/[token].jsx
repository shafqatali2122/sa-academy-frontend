{/* --- 4. JSX (The Form) --- */}
import PublicLayout from '@/layouts/PublicLayout';
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
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700"
                            >
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
                            <label 
                                htmlFor="confirmPassword" 
                                className="block text-sm font-medium text-gray-700"
                            >
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
                        </div> {/* <--- THIS IS THE FIX. The dashes are replaced with </div> */}
                        
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