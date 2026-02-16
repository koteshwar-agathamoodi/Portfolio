import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const InterestsManager = () => {
    const { interests, updateInterests } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newInterest = {
            name: "New Interest",
            icon: "⭐"
        };
        updateInterests([...interests, newInterest]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Interest?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newInterests = interests.filter((_, i) => i !== index);
                updateInterests(newInterests);
                toast.success('Interest deleted successfully');
            }
        });
    };

    const startEdit = (interest, index) => {
        setIsEditing(index);
        setEditForm({ ...interest });
    };

    const handleSave = (index) => {
        const updatedInterests = [...interests];
        updatedInterests[index] = editForm;
        updateInterests(updatedInterests);
        setIsEditing(null);
        toast.success('Interest updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Interests</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Interest</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interests.map((interest, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <input
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Name"
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                />
                                <input
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Icon (Emoji)"
                                    value={editForm.icon}
                                    onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                                />
                                <div className="flex justify-end space-x-2 pt-2">
                                    <button onClick={() => setIsEditing(null)} className="p-2 text-gray-500"><IconRenderer icon="FaTimes" /></button>
                                    <button onClick={() => handleSave(index)} className="p-2 text-blue-600"><IconRenderer icon="FaSave" /></button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl">{interest.icon}</span>
                                    <span className="font-bold dark:text-white">{interest.name}</span>
                                </div>
                                <div className="flex space-x-1">
                                    <button onClick={() => startEdit(interest, index)} className="p-2 text-blue-600">
                                        <IconRenderer icon="FaEdit" />
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="p-2 text-red-600">
                                        <IconRenderer icon="FaTrash" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterestsManager;
