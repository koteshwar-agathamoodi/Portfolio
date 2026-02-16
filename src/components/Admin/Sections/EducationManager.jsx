import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const EducationManager = () => {
    const { education, updateEducation } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newEdu = {
            institution: "New Institution",
            degree: "",
            year: "",
            description: ""
        };
        updateEducation([newEdu, ...education]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Education?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newEdu = education.filter((_, i) => i !== index);
                updateEducation(newEdu);
                toast.success('Education deleted successfully');
            }
        });
    };

    const startEdit = (edu, index) => {
        setIsEditing(index);
        setEditForm({ ...edu });
    };

    const handleSave = (index) => {
        const updatedEdu = [...education];
        updatedEdu[index] = editForm;
        updateEducation(updatedEdu);
        setIsEditing(null);
        toast.success('Education updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Education</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Education</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {education.map((edu, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <input
                                    className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white w-full"
                                    placeholder="Institution"
                                    value={editForm.institution}
                                    onChange={e => setEditForm({ ...editForm, institution: e.target.value })}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Degree"
                                        value={editForm.degree}
                                        onChange={e => setEditForm({ ...editForm, degree: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Year"
                                        value={editForm.year}
                                        onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Description"
                                    rows="2"
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
                                    <h3 className="text-xl font-bold dark:text-white">{edu.institution}</h3>
                                    <p className="text-blue-600">{edu.degree}</p>
                                    <p className="text-sm text-gray-500 mt-1">{edu.year}</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{edu.description}</p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button onClick={() => startEdit(edu, index)} className="p-2 text-blue-600">
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

export default EducationManager;
