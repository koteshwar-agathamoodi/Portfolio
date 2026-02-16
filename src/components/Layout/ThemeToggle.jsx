import { useState, useEffect } from 'react';
import IconRenderer from '../UI/IconRenderer';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check local storage or system preference
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-colors duration-200 
                 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
                 text-gray-800 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Dark Mode"
        >
            {darkMode ? <IconRenderer icon="FaSun" size={20} /> : <IconRenderer icon="FaMoon" size={20} />}
        </button>
    );
};

export default ThemeToggle;
