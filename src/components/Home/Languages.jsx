import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';
import IconRenderer from '../UI/IconRenderer';

const Languages = () => {
    const { languages } = usePortfolio();

    if (!languages || languages.length === 0) return null;

    return (
        <section id="languages" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Languages"
                    subtitle="Communication skills and proficiency"
                    icon="FaGlobe"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {languages.map((lang, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-transparent dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <IconRenderer icon={lang.icon} size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {lang.name}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1 uppercase tracking-wider">
                                        {lang.level}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Languages;
