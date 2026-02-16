import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import IconRenderer from '../UI/IconRenderer';

const Dashboard = () => {
    const { projects, skills, certificates, internships, education, volunteering, interests, languages, experience, exportData, resetData } = usePortfolio();

    const stats = [
        { label: 'Projects', count: projects?.length || 0, icon: "FaProjectDiagram", color: 'text-blue-600' },
        { label: 'Technical Skills', count: skills?.length || 0, icon: "FaLaptopCode", color: 'text-green-600' },
        { label: 'Internships', count: internships?.length || 0, icon: "FaBriefcase", color: 'text-purple-600' },
        { label: 'Experience', count: experience?.length || 0, icon: "FaBriefcase", color: 'text-cyan-600' },
        { label: 'Certifications', count: certificates?.length || 0, icon: "FaCertificate", color: 'text-yellow-600' },
        { label: 'Education', count: education?.length || 0, icon: "FaGraduationCap", color: 'text-red-600' },
        { label: 'Volunteering', count: volunteering?.length || 0, icon: "FaHandHoldingHeart", color: 'text-pink-600' },
        { label: 'Interests', count: interests?.length || 0, icon: "FaHeart", color: 'text-orange-600' },
        { label: 'Languages', count: languages?.length || 0, icon: "FaLanguage", color: 'text-indigo-600' },
    ];

    const handleExport = () => {
        const content = exportData();
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'portfolioData.js';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome to your portfolio management center.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.count}</p>
                            </div>
                            <div className={`${stat.color} text-2xl`}>
                                <IconRenderer icon={stat.icon} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Maintenance & Backup</h2>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleExport}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                    >
                        <IconRenderer icon="FaDownload" />
                        <span>Export portfolioData.js</span>
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to reset all changes? This will revert to the original data.')) {
                                resetData();
                            }
                        }}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
                    >
                        <IconRenderer icon="FaUndo" />
                        <span>Reset to Default</span>
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">
                    Note: Exporting creates a file you can use to update your source code permanently.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
