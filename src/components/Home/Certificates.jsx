import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';
import IconRenderer from '../UI/IconRenderer';

const Certificates = () => {
    const { certificates } = usePortfolio();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="certifications" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Certifications" subtitle="Continuous learning and achievements" icon="FaCertificate" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                >
                    {certificates.map((cert, index) => {
                        const IconComponent = cert.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-transparent dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 ${cert.bgColor} ${cert.textColor} rounded-full transition-transform duration-300 group-hover:scale-110`}>
                                        <IconRenderer icon={cert.icon} size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {cert.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{cert.authority}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{cert.date}</span>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View Credential</a>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Certificates;
