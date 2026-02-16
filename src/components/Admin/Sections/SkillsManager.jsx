import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SkillsManager = () => {
    const { skills, updateSkills } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAddCategory = () => {
        const newCategory = {
            category: "New Category",
            items: []
        };
        updateSkills([newCategory, ...skills]);
    };

    const handleDeleteCategory = (index) => {
        Swal.fire({
            title: 'Delete Category?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newSkills = skills.filter((_, i) => i !== index);
                updateSkills(newSkills);
                toast.success('Category deleted successfully');
            }
        });
    };

    const startEditCategory = (category, index) => {
        setIsEditing(index);
        setEditForm({ ...category });
    };

    const handleSaveCategory = (index) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = editForm;
        updateSkills(updatedSkills);
        setIsEditing(null);
        toast.success('Category updated successfully');
    };

    const handleAddItem = (catIndex) => {
        const updatedSkills = [...skills];
        updatedSkills[catIndex].items.push({ name: "New Skill", icon: null });
        updateSkills(updatedSkills);
    };

    const handleDeleteItem = (catIndex, itemIndex) => {
        const updatedSkills = [...skills];
        updatedSkills[catIndex].items = updatedSkills[catIndex].items.filter((_, i) => i !== itemIndex);
        updateSkills(updatedSkills);
    };

    const handleUpdateItem = (catIndex, itemIndex, name) => {
        const updatedSkills = [...skills];
        updatedSkills[catIndex].items[itemIndex].name = name;
        updateSkills(updatedSkills);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Skills</h2>
                <button
                    onClick={handleAddCategory}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Category</span>
                </button>
            </div>

            <div className="space-y-8">
                {skills.map((category, catIndex) => (
                    <div key={catIndex} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {isEditing === catIndex ? (
                            <div className="flex items-center space-x-4 mb-4">
                                <input
                                    className="flex-1 p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    value={editForm.category}
                                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                />
                                <button onClick={() => handleSaveCategory(catIndex)} className="text-blue-600"><IconRenderer icon="FaSave" /></button>
                                <button onClick={() => setIsEditing(null)} className="text-gray-500"><IconRenderer icon="FaTimes" /></button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold dark:text-white">{category.category}</h3>
                                <div className="flex space-x-2">
                                    <button onClick={() => startEditCategory(category, catIndex)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                        <IconRenderer icon="FaEdit" />
                                    </button>
                                    <button onClick={() => handleDeleteCategory(catIndex)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                        <IconRenderer icon="FaTrash" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <input
                                        className="bg-transparent border-none focus:ring-0 dark:text-white text-sm"
                                        value={item.name}
                                        onChange={e => handleUpdateItem(catIndex, itemIndex, e.target.value)}
                                    />
                                    <button onClick={() => handleDeleteItem(catIndex, itemIndex)} className="text-red-500 hover:text-red-700 transition-colors">
                                        <IconRenderer icon="FaTimes" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => handleAddItem(catIndex)}
                                className="flex items-center justify-center p-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all"
                            >
                                <IconRenderer icon="FaPlus" className="mr-2" />
                                <span className="text-sm">Add Skill</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsManager;
