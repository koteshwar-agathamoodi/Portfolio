import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconRenderer from '../UI/IconRenderer';
import ThemeToggle from './ThemeToggle';
import { personalInfo } from '../../data/portfolioData';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll handler
    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        // Smooth scroll to element
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop - 80; // height of navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-md py-4'
                : 'bg-white/90 dark:bg-gray-950/90 py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                    {personalInfo.name}
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={personalInfo.resumeUrl || "#"}
                        download={personalInfo.resumeUrl && personalInfo.resumeUrl !== "#" ? `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                        <IconRenderer icon="FaFilePdf" />
                        <span>Resume</span>
                    </a>
                    <ThemeToggle />
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 dark:text-gray-300 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <IconRenderer icon="FaTimes" size={24} /> : <IconRenderer icon="FaBars" size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-gray-700 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-2 py-2 block"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href={personalInfo.resumeUrl || "#"}
                                download={personalInfo.resumeUrl && personalInfo.resumeUrl !== "#" ? `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 font-medium px-2 py-2 flex items-center gap-2"
                            >
                                <IconRenderer icon="FaFilePdf" />
                                <span>Download Resume</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
