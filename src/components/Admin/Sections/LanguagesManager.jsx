import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const LanguagesManager = () => {
    const { languages, updateLanguages } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newLanguage = {
            name: "New Language",
            level: "Intermediate"
        };
        updateLanguages([newLanguage, ...(languages || [])]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Language?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newLanguages = languages.filter((_, i) => i !== index);
                updateLanguages(newLanguages);
                toast.success('Language deleted successfully');
            }
        });
    };

    const startEdit = (language, index) => {
        setIsEditing(index);
        setEditForm({ ...language });
    };

    const handleSave = (index) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index] = editForm;
        updateLanguages(updatedLanguages);
        setIsEditing(null);
        toast.success('Language updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                    <IconRenderer icon="FaLanguage" className="text-blue-600" />
                    Manage Languages
                </h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/30 font-medium"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Language</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(languages || []).map((lang, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Language Name</label>
                                    <input
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. English"
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Proficiency Level</label>
                                    <input
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. Professional Working Proficiency"
                                        value={editForm.level}
                                        onChange={e => setEditForm({ ...editForm, level: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Icon Name (from react-icons)</label>
                                    <input
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. FaGlobe"
                                        value={editForm.icon || ''}
                                        onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1 italic">Use FontAwesome (Fa...) or SimpleIcons (Si...)</p>
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
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl transition-all">
                                        <IconRenderer icon={lang.icon} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold dark:text-white">{lang.name}</h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">{lang.level}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => startEdit(lang, index)}
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
                {(languages || []).length === 0 && (
                    <div className="col-span-full py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <IconRenderer icon="FaLanguage" size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No languages added yet. Click "Add Language" to start.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguagesManager;
