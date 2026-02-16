import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import IconRenderer from '../../UI/IconRenderer';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProjectManager = () => {
    const { projects, updateProjects } = usePortfolio();
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newProject = {
            title: "New Project",
            description: "",
            tags: [],
            period: "",
            link: "#",
            repo: "#",
            image: ""
        };
        updateProjects([newProject, ...projects]);
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Delete Project?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newProjects = projects.filter((_, i) => i !== index);
                updateProjects(newProjects);
                toast.success('Project deleted successfully');
            }
        });
    };

    const startEdit = (project, index) => {
        setIsEditing(index);
        setEditForm({ ...project, tags: project.tags.join(', ') });
    };

    const handleSave = (index) => {
        const updatedProjects = [...projects];
        updatedProjects[index] = {
            ...editForm,
            tags: editForm.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        };
        updateProjects(updatedProjects);
        setIsEditing(null);
        toast.success('Project updated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Manage Projects</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <IconRenderer icon="FaPlus" />
                    <span>Add Project</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {projects.map((project, index) => (
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
                                        placeholder="Period"
                                        value={editForm.period}
                                        onChange={e => setEditForm({ ...editForm, period: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Description"
                                    rows="3"
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                />
                                <input
                                    className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                    placeholder="Tags (comma separated)"
                                    value={editForm.tags}
                                    onChange={e => setEditForm({ ...editForm, tags: e.target.value })}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Project Link"
                                        value={editForm.link}
                                        onChange={e => setEditForm({ ...editForm, link: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 dark:text-white"
                                        placeholder="Repo Link"
                                        value={editForm.repo}
                                        onChange={e => setEditForm({ ...editForm, repo: e.target.value })}
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
                                    <h3 className="text-xl font-bold dark:text-white">{project.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{project.period}</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{project.description}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button onClick={() => startEdit(project, index)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
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

export default ProjectManager;
