import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AwardsManager = () => {
    const { awards, updateAwards } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newAward = {
            title: "New Award",
            event: "",
            date: "",
            description: "",
            icon: null // In this simplified CRUD we might not handle react-icon selection easily
        };
        updateAwards([newAward, ...awards]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Award?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newAwards = awards.filter((_, i) => i !== index);
                updateAwards(newAwards);
                toast.success('Award deleted successfully');
            }
        });
    };

    const startEdit = (award, index) => {
        setIsEditing(index);
        setEditForm({ ...award });
    };

    const handleSave = (index) => {
        const updatedAwards = [...awards];
        updatedAwards[index] = editForm;
        updateAwards(updatedAwards);
        setIsEditing(null);
        toast.success('Award updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Awards</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Award</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {awards.map((award, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Title"
                                        value={editForm.title}
                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Event"
                                        value={editForm.event}
                                        onChange={e => setEditForm({ ...editForm, event: e.target.value })}
                                    />
                                </div>
                                <input
                                    className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white w-full"
                                    placeholder="Date"
                                    value={editForm.date}
                                    onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                />
                                <textarea
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Description"
                                    rows="3"
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                />
                                <div className="flex justify-end space-x-2 pt-2">
                                    <button onClick={() => setIsEditing(null)} className="p-2 text-gray-500"><IconRenderer icon="FaTimes" /></button>
                                    <button onClick={() => handleSave(index)} className="p-2 text-blue-600"><IconRenderer icon="FaSave" /></button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold dark:text-white">{award.title}</h3>
                                    <p className="text-blue-600">{award.event}</p>
                                    <p className="text-sm text-gray-500 mt-1">{award.date}</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{award.description}</p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button onClick={() => startEdit(award, index)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                        <IconRenderer icon="FaEdit" />
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
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

export default AwardsManager;
