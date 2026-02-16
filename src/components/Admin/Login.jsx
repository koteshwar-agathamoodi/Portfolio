import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconRenderer from '../UI/IconRenderer';

const Login = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Secure hashing using SHA-256
    const hashPassword = async (string) => {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const inputHash = await hashPassword(password);
        const SECURE_HASHES = [
            'c4603edc20442182bd886111171233f02e9b32a630adc4e25cd313fa6316dd95',
            '88fa0d759f845b47c044c2cd44e29082cf6fea665c30c146374ec7c8f3d699e3'
        ];

        if (SECURE_HASHES.includes(inputHash)) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Invalid administrative credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                        <IconRenderer icon="FaLock" size={30} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        Secure access to your portfolio dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="relative group">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="appearance-none rounded-xl relative block w-full px-4 py-4 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm pr-12"
                            placeholder="Enter administrative password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IconRenderer icon="FaEyeSlash" size={20} /> : <IconRenderer icon="FaEye" size={20} />}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                        >
                            Authorize Access
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
