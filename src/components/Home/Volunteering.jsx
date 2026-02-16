import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';
import IconRenderer from '../UI/IconRenderer';

const Volunteering = () => {
    const { volunteering } = usePortfolio();
    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Volunteering" subtitle="Giving back to the community" />

                <div className="max-w-4xl mx-auto space-y-6">
                    {volunteering.map((vol, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                        >
                            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-full group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <IconRenderer icon="FaHandHoldingHeart" size={32} />
                                </motion.div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{vol.role}</h3>
                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{vol.organization}</span>
                                    <span className="hidden md:block text-gray-400">•</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{vol.period}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {vol.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Volunteering;
