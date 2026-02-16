import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ExperienceManager = () => {
    const { experience, updateExperience } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newExp = {
            company: "New Company",
            role: "Software Engineer",
            period: "2024 - Present",
            location: "Remote",
            description: "Describe your responsibilities and achievements..."
        };
        updateExperience([newExp, ...(experience || [])]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Experience?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newExperience = experience.filter((_, i) => i !== index);
                updateExperience(newExperience);
                toast.success('Experience deleted successfully');
            }
        });
    };

    const startEdit = (exp, index) => {
        setIsEditing(index);
        setEditForm({ ...exp });
    };

    const handleSave = (index) => {
        const updatedExperience = [...experience];
        updatedExperience[index] = editForm;
        updateExperience(updatedExperience);
        setIsEditing(null);
        toast.success('Experience updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                    <span className="text-blue-600"><IconRenderer icon="FaBriefcase" /></span>
                    Manage Experience
                </h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/30 font-medium"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Experience</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {(experience || []).map((exp, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Company</label>
                                        <input
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={editForm.company}
                                            onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</label>
                                        <input
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={editForm.role}
                                            onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Period</label>
                                        <input
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={editForm.period}
                                            onChange={e => setEditForm({ ...editForm, period: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                                        <input
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={editForm.location}
                                            onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows="4"
                                        value={editForm.description}
                                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 pt-2">
                                    <button
                                        onClick={() => setIsEditing(null)}
                                        className="px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <IconRenderer icon="FaSave" /> Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold dark:text-white">{exp.company}</h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.role}</p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                                        <span className="flex items-center gap-1">📅 {exp.period}</span>
                                        <span className="flex items-center gap-1">📍 {exp.location}</span>
                                    </div>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        onClick={() => startEdit(exp, index)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <IconRenderer icon="FaEdit" size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <IconRenderer icon="FaTrash" size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {(experience || []).length === 0 && (
                    <div className="py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="mx-auto text-gray-300 dark:text-gray-600 mb-4 inline-block">
                            <IconRenderer icon="FaBriefcase" size={48} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No experience records found. Click "Add Experience" to list your work history.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceManager;
