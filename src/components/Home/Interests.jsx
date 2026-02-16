import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import SectionHeading from '../UI/SectionHeading';

const InterestCard = ({ interest }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    };

    return (
        <div
            className="w-40 h-40 cursor-pointer perspective-1000"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full text-center transition-all duration-500 transform-style-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={() => setIsAnimating(false)}
            >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-transparent dark:border-gray-800 flex flex-col items-center justify-center backface-hidden transition-all duration-300">
                    <span className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">{interest.icon}</span>
                    <span className="font-bold text-gray-800 dark:text-white transform transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{interest.name}</span>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full bg-blue-600 rounded-xl shadow-lg flex items-center justify-center backface-hidden transform rotate-y-180 p-4"
                >
                    <p className="text-white text-sm font-medium">
                        I love {interest.name.toLowerCase()}!
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const Interests = () => {
    const { interests } = usePortfolio();
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
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <section id="interests" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <SectionHeading title="Interests" subtitle="What I do in my free time" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
                >
                    {interests.map((interest, index) => (
                        <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                            <InterestCard interest={interest} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Interests;
