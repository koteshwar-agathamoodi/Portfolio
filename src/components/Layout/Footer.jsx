import { personalInfo } from '../../data/portfolioData';
import IconRenderer from '../UI/IconRenderer';

const Footer = () => {
    return (
        <footer className="py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-8">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-500">{personalInfo.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Java Full Stack Developer passionate about building robust and scalable web applications.
                    </p>
                </div>

                <div className="flex justify-center space-x-6 mb-8">
                    {personalInfo.social.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            aria-label={item.label}
                        >
                            <IconRenderer icon={item.icon} size={20} />
                        </a>
                    ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
