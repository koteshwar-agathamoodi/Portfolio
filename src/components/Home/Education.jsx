import { motion } from 'framer-motion';
import SectionHeading from '../UI/SectionHeading';
import { usePortfolio } from '../../context/PortfolioContext';
import IconRenderer from '../UI/IconRenderer';

const Education = () => {
    const { education } = usePortfolio();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    const cardVariantsReverse = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Education" subtitle="My academic background" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto relative"
                >
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 md:left-1/2 transform md:-translate-x-1/2"></div>

                    {education.map((edu, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center mb-12 relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                            {/* Timeline Dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center z-10 ${index % 2 === 0 ? 'bg-blue-600' : 'bg-teal-500'}`}
                            >
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>

                            {/* Empty Space for alternate side */}
                            <div className="hidden md:block w-1/2"></div>

                            {/* Content Card */}
                            <motion.div
                                variants={index % 2 === 0 ? cardVariants : cardVariantsReverse}
                                className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}
                            >
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl border border-transparent dark:border-gray-800 transition-all duration-300 relative group">
                                    {/* Mobile connecting line adjustment */}
                                    <div className="absolute top-4 left-[-30px] w-8 h-0.5 bg-gray-300 dark:bg-gray-700 md:hidden"></div>

                                    <div className={`flex items-center gap-3 mb-2 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <IconRenderer icon="FaGraduationCap" className="text-blue-600 dark:text-blue-400 text-xl" />
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.institution}</h3>
                                    </div>
                                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 rounded-full mb-3">
                                        {edu.year}
                                    </span>
                                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{edu.degree}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {edu.description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
