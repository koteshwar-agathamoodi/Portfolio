import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import IconRenderer from '../UI/IconRenderer';

const Hero = () => {
    const { personalInfo } = usePortfolio();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="home" className="min-h-[90vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">

                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:pl-12 lg:pl-16 shadow-none"
                >
                    <motion.span
                        variants={itemVariants}
                        className="text-blue-600 dark:text-blue-400 font-semibold text-lg tracking-wide block"
                    >
                        Hello, I am
                    </motion.span>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-4 mb-6 leading-tight"
                    >
                        {personalInfo.name}
                    </motion.h1>
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
                    >
                        {personalInfo.title}
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0"
                    >
                        {personalInfo.bio}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform"
                        >
                            Contact Me
                        </motion.a>
                        <motion.a
                            href={personalInfo.resumeUrl || "#"}
                            download={personalInfo.resumeUrl && personalInfo.resumeUrl !== "#" ? `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform flex items-center justify-center gap-2"
                        >
                            <IconRenderer icon="FaFilePdf" />
                            <span>Download Resume</span>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Image / Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 h-64 md:w-80 md:h-80"
                    >
                        <img
                            src={personalInfo.profilePic || "/profile.jpg"}
                            alt={personalInfo.name}
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&background=0D8ABC&color=fff&size=512` }}
                            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                        {/* Decorative background elements */}
                        <div className="absolute -inset-4 border-2 border-dashed border-blue-400/30 rounded-full animate-spin-slow"></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
