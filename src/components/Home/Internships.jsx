import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';
import IconRenderer from '../UI/IconRenderer';

const Internships = () => {
    const { internships } = usePortfolio();
    return (
        <section id="experience" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Internships" subtitle="Professional experience and roles" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {internships.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl border-l-4 border-blue-600 dark:border-blue-500 overflow-hidden group transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <IconRenderer icon="FaBriefcase" size={24} />
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <IconRenderer icon="FaCalendarAlt" className="mr-2" />
                                    {job.period}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {job.role}
                            </h3>
                            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
                                {job.company}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {job.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Internships;
