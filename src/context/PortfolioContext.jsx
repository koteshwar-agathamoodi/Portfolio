import React, { createContext, useContext, useState, useEffect } from 'react';
import * as initialData from '../data/portfolioData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("Failed to parse portfolio data from storage", e);
            }
        }
        return initialData;
    });

    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(data));
    }, [data]);

    // Fix for stale resumeUrl in localStorage
    useEffect(() => {
        if (data.personalInfo.resumeUrl === '#' && initialData.personalInfo.resumeUrl !== '#') {
            setData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    resumeUrl: initialData.personalInfo.resumeUrl
                }
            }));
        }
    }, []);

    const updatePersonalInfo = (newInfo) => {
        setData(prev => ({ ...prev, personalInfo: newInfo }));
    };

    const updateSkills = (newSkills) => {
        setData(prev => ({ ...prev, skills: newSkills }));
    };

    const updateEducation = (newEducation) => {
        setData(prev => ({ ...prev, education: newEducation }));
    };

    const updateInternships = (newInternships) => {
        setData(prev => ({ ...prev, internships: newInternships }));
    };

    const updateProjects = (newProjects) => {
        setData(prev => ({ ...prev, projects: newProjects }));
    };

    const updateCertificates = (newCertificates) => {
        setData(prev => ({ ...prev, certificates: newCertificates }));
    };

    const updateAwards = (newAwards) => {
        setData(prev => ({ ...prev, awards: newAwards }));
    };

    const updateVolunteering = (newVolunteering) => {
        setData(prev => ({ ...prev, volunteering: newVolunteering }));
    };

    const updateInterests = (newInterests) => {
        setData(prev => ({ ...prev, interests: newInterests }));
    };

    const updateLanguages = (newLanguages) => {
        setData(prev => ({ ...prev, languages: newLanguages }));
    };

    const updateExperience = (newExperience) => {
        setData(prev => ({ ...prev, experience: newExperience }));
    };

    const resetData = () => {
        setData(initialData);
        localStorage.removeItem('portfolioData');
    };

    // Helper to generate a download for the portfolioData.js file
    const exportData = () => {
        const fileContent = `
export const personalInfo = ${JSON.stringify(data.personalInfo, null, 4)};

export const skills = ${JSON.stringify(data.skills, null, 4)};

export const education = ${JSON.stringify(data.education, null, 4)};

export const internships = ${JSON.stringify(data.internships, null, 4)};

export const projects = ${JSON.stringify(data.projects, null, 4)};

export const certificates = ${JSON.stringify(data.certificates, null, 4)};

export const awards = ${JSON.stringify(data.awards, null, 4)};

export const volunteering = ${JSON.stringify(data.volunteering, null, 4)};

export const interests = ${JSON.stringify(data.interests, null, 4)};

export const languages = ${JSON.stringify(data.languages || [], null, 4)};

export const experience = ${JSON.stringify(data.experience || [], null, 4)};
        `;

        // Note: In a real react app, we'd trigger a download or show this in a modal.
        // For now, this helper provides the formatted string.
        return fileContent;
    };

    return (
        <PortfolioContext.Provider value={{
            ...data,
            updatePersonalInfo,
            updateSkills,
            updateEducation,
            updateInternships,
            updateProjects,
            updateCertificates,
            updateAwards,
            updateVolunteering,
            updateInterests,
            updateLanguages,
            updateExperience,
            resetData,
            exportData
        }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
