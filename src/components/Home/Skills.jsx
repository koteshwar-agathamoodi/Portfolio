import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';
import IconRenderer from '../UI/IconRenderer';

const Skills = () => {
    const { skills } = usePortfolio();
    // Check if skills is categorized (array of objects with 'category' property)
    // or flat (backwards compatibility or if data structure changes)
    const isCategorized = skills.length > 0 && 'category' in skills[0];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Technical Skills" subtitle="My proficiency in the Java Full Stack Ecosystem" icon="FaLaptopCode" />

                <div className="max-w-6xl mx-auto">
                    {isCategorized ? (
                        skills.map((category, catIndex) => (
                            <div key={catIndex} className="mb-12">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-l-4 border-blue-500 pl-4">
                                    {category.category}
                                </h3>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                                >
                                    {category.items.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center border border-transparent dark:border-gray-800 group"
                                        >
                                            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                <IconRenderer icon={skill.icon} size={28} />
                                            </div>
                                            <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        ))
                    ) : (
                        // Fallback for flat list if needed
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {skills.map((skill, index) => (
                                <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-3xl text-blue-600 dark:text-blue-400">
                                        <IconRenderer icon={skill.icon} />
                                    </span>
                                    <span className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;
