import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CertificatesManager = () => {
    const { certificates, updateCertificates } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newCert = {
            name: "New Certificate",
            authority: "",
            date: "",
            link: "#",
            bgColor: "bg-blue-100 dark:bg-blue-900/30",
            textColor: "text-blue-600 dark:text-blue-400"
        };
        updateCertificates([newCert, ...certificates]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Certificate?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newCerts = certificates.filter((_, i) => i !== index);
                updateCertificates(newCerts);
                toast.success('Certificate deleted successfully');
            }
        });
    };

    const startEdit = (cert, index) => {
        setIsEditing(index);
        setEditForm({ ...cert });
    };

    const handleSave = (index) => {
        const updatedCerts = [...certificates];
        updatedCerts[index] = editForm;
        updateCertificates(updatedCerts);
        setIsEditing(null);
        toast.success('Certificate updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Certificates</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Certificate</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {certificates.map((cert, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {isEditing === index ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Name"
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Authority"
                                        value={editForm.authority}
                                        onChange={e => setEditForm({ ...editForm, authority: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Date"
                                        value={editForm.date}
                                        onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Link"
                                        value={editForm.link}
                                        onChange={e => setEditForm({ ...editForm, link: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 pt-2">
                                    <button onClick={() => setIsEditing(null)} className="p-2 text-gray-500"><IconRenderer icon="FaTimes" /></button>
                                    <button onClick={() => handleSave(index)} className="p-2 text-blue-600"><IconRenderer icon="FaSave" /></button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold dark:text-white">{cert.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{cert.authority}</p>
                                    <p className="text-sm text-gray-500 mt-1">{cert.date}</p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button onClick={() => startEdit(cert, index)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
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

export default CertificatesManager;
