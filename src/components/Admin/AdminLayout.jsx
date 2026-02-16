import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import IconRenderer from '../UI/IconRenderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', icon: 'FaTachometerAlt', label: 'Dashboard' },
        { path: '/admin/profile', icon: 'FaUserTie', label: 'Profile' },
        { path: '/admin/projects', icon: 'FaProjectDiagram', label: 'Projects' },
        { path: '/admin/skills', icon: 'FaLaptopCode', label: 'Technical Skills' },
        { path: '/admin/education', icon: 'FaGraduationCap', label: 'Education' },
        { path: '/admin/internships', icon: 'FaBriefcase', label: 'Internships' },
        { path: '/admin/experience', icon: 'FaBriefcase', label: 'Experience' },
        { path: '/admin/certificates', icon: 'FaCertificate', label: 'Certifications' },
        { path: '/admin/awards', icon: 'FaTrophy', label: 'Awards & Honors' },
        { path: '/admin/volunteering', icon: 'FaHandHoldingHeart', label: 'Volunteering' },
        { path: '/admin/interests', icon: 'FaHeart', label: 'Interests' },
        { path: '/admin/languages', icon: 'FaLanguage', label: 'Languages' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl hidden md:flex flex-col">
                <div className="p-6 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <IconRenderer icon={item.icon} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t dark:border-gray-700 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <IconRenderer icon="FaHome" />
                        <span>View Site</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <IconRenderer icon="FaSignOutAlt" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:hidden flex justify-between items-center px-6">
                    <h1 className="text-xl font-bold text-blue-600">Admin</h1>
                    <button onClick={handleLogout} className="text-red-600"><IconRenderer icon="FaSignOutAlt" /></button>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default AdminLayout;
