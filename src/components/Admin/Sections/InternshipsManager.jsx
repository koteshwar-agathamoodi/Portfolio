import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const InternshipsManager = () => {
    const { internships, updateInternships } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newInternship = {
            company: "New Company",
            role: "",
            period: "",
            location: "",
            description: ""
        };
        updateInternships([newInternship, ...internships]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Internship?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newInternships = internships.filter((_, i) => i !== index);
                updateInternships(newInternships);
                toast.success('Internship deleted successfully');
            }
        });
    };

    const startEdit = (internship, index) => {
        setIsEditing(index);
        setEditForm({ ...internship });
    };

    const handleSave = (index) => {
        const updatedInternships = [...internships];
        updatedInternships[index] = editForm;
        updateInternships(updatedInternships);
        setIsEditing(null);
        toast.success('Internship updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Internships</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Internship</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {internships.map((internship, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Company"
                                        value={editForm.company}
                                        onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Role"
                                        value={editForm.role}
                                        onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Period"
                                        value={editForm.period}
                                        onChange={e => setEditForm({ ...editForm, period: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Location"
                                        value={editForm.location}
                                        onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Description"
                                    rows="4"
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
                                    <h3 className="text-xl font-bold dark:text-white">{internship.company}</h3>
                                    <p className="text-blue-600 font-medium">{internship.role}</p>
                                    <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                                        <span>{internship.period}</span>
                                        <span>{internship.location}</span>
                                    </div>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{internship.description}</p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button onClick={() => startEdit(internship, index)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
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

export default InternshipsManager;
