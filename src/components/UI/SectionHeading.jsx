import { motion } from 'framer-motion';
import IconRenderer from './IconRenderer';

const SectionHeading = ({ title, subtitle, icon, centered = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`mb-12 ${centered ? 'text-center' : ''}`}
        >
            <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
                {icon && (
                    <div className="text-blue-600 dark:text-blue-400">
                        <IconRenderer icon={icon} size={32} />
                    </div>
                )}
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white relative inline-block group">
                    {title}
                </h2>
            </div>
            {subtitle && (
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeading;
