import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';
import IconRenderer from '../UI/IconRenderer';

const Experience = () => {
    const { experience } = usePortfolio();

    if (!experience || experience.length === 0) return null;

    return (
        <section id="experience-section" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Work Experience" subtitle="My professional journey" />

                <div className="max-w-4xl mx-auto space-y-8">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <IconRenderer icon="FaBriefcase" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white uppercase tracking-tight">
                                            {exp.role}
                                        </h3>
                                        <h4 className="text-blue-600 dark:text-blue-400 font-semibold italic">
                                            {exp.company}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex flex-col md:items-end text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    <span className="flex items-center gap-2">
                                        <IconRenderer icon="FaCalendarAlt" size={12} /> {exp.period}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <IconRenderer icon="FaMapMarkerAlt" size={12} /> {exp.location}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-2 border-l-2 border-blue-500/20">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
