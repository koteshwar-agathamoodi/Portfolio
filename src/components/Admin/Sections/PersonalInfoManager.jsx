import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';

const PersonalInfoManager = () => {
    const { personalInfo, updatePersonalInfo } = usePortfolio();
    const [form, setForm] = useState({ ...personalInfo });

    const handleSave = (e) => {
        e.preventDefault();
        updatePersonalInfo(form);
        toast.success('Personal info updated successfully!');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit for LocalStorage
                toast.error("File is too large! Please upload a resume under 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, resumeUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) { // 1MB limit for images
                toast.error("Image is too large! Please upload a picture under 1MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const clearResume = () => {
        setForm({ ...form, resumeUrl: '' });
    };

    const clearProfilePic = () => {
        setForm({ ...form, profilePic: '' });
    };

    return (
        <div className="max-w-5xl space-y-6">
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                <IconRenderer icon="FaUser" className="text-blue-600" />
                Personal Information
            </h2>

            <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 transition-all">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaUser" size={10} /> Full Name
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaBriefcase" size={10} /> Professional Title
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Professional Bio</label>
                    <textarea
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        rows="4"
                        value={form.bio}
                        onChange={e => setForm({ ...form, bio: e.target.value })}
                    />
                </div>

                <hr className="dark:border-gray-700" />

                {/* Contact & Social */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaEnvelope" size={10} /> Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaPhone" size={10} /> Phone Number
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaMapMarkerAlt" size={10} /> Current Location
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.location}
                            onChange={e => setForm({ ...form, location: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaGithub" size={10} /> GitHub Profile URL
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.githubUrl}
                            onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaFilePdf" size={10} /> Resume Upload (PDF)
                        </label>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                            />
                            {form.resumeUrl && (
                                <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <span className="text-xs text-green-700 dark:text-green-400 font-medium">Resume uploaded! ✅</span>
                                    <button
                                        type="button"
                                        onClick={clearResume}
                                        className="text-xs text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaImage" size={10} /> Profile Picture
                        </label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                {form.profilePic && (
                                    <img
                                        src={form.profilePic}
                                        alt="Profile Preview"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                />
                            </div>
                            {form.profilePic && (
                                <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <span className="text-xs text-blue-700 dark:text-blue-400 font-medium">Image uploaded! ✅</span>
                                    <button
                                        type="button"
                                        onClick={clearProfilePic}
                                        className="text-xs text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="dark:border-gray-700" />

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaCalendarAlt" size={10} /> Date of Birth
                        </label>
                        <input
                            type="text"
                            placeholder="YYYY/MM/DD"
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.dob}
                            onChange={e => setForm({ ...form, dob: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                            <IconRenderer icon="FaUser" size={10} /> Father's Name
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={form.fatherName}
                            onChange={e => setForm({ ...form, fatherName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <IconRenderer icon="FaHome" size={10} /> Permanent Address
                    </label>
                    <textarea
                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        rows="3"
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                    />
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 font-bold"
                    >
                        <IconRenderer icon="FaSave" />
                        <span>Save Profile Data</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoManager;
