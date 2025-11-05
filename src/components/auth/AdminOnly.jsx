// frontend/src/components/auth/AdminOnly.jsx

import { useAuth } from '@/utils/context/AuthContext';
import { useRouter } from 'next/router';
import AdminLayout from '@/layouts/AdminLayout'; // Import your main AdminLayout

const AdminOnly = ({ children }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    // 1. If auth is still loading, show a loader
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>Loading authentication...</div>
            </div>
        );
    }

    // 2. If user is logged in AND is an admin
    if (user && user.role === 'admin') {
        // 3. Render the page content inside the AdminLayout
        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        );
    }

    // 4. If user is NOT an admin, redirect them to the login page
    // We check for 'window' to make sure this only runs in the browser
    if (typeof window !== 'undefined') {
        router.replace('/login'); 
    }

    // Show nothing while redirecting
    return null;
};

export default AdminOnly;