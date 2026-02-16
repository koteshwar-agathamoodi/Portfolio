import { motion } from 'framer-motion';
import SectionHeading from '../UI/SectionHeading';
import { usePortfolio } from '../../context/PortfolioContext';
import IconRenderer from '../UI/IconRenderer';

const Awards = () => {
    const { awards } = usePortfolio();
    return (
        <section id="awards" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Awards & Honors" subtitle="Recognition for my work" icon="FaTrophy" />

                <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                    {awards.map((award, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl border border-transparent dark:border-gray-800 transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <IconRenderer icon={award.icon || 'FaMedal'} size={24} />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {award.title}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{award.event}</p>
                                        {award.date && (
                                            <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">{award.date}</p>
                                        )}
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {award.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Awards;
