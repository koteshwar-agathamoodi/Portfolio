import {
    FaGithub, FaLinkedin, FaTwitter, FaEnvelope,
    FaHtml5, FaCss3Alt, FaJava, FaAws, FaGitAlt, FaLock, FaDatabase, FaServer, FaCode, FaTools, FaCloud,
    FaBrain, FaLightbulb, FaTasks, FaUsers, FaGavel, FaMedal, FaUserTie, FaTerminal, FaBriefcase, FaCalendarAlt, FaGraduationCap, FaTrophy, FaHandHoldingHeart, FaHome, FaAward, FaFilePdf, FaShareAlt, FaLaptopCode, FaImage, FaStream, FaExclamationTriangle, FaSync, FaExchangeAlt, FaLayerGroup, FaGlobe, FaFlag, FaProjectDiagram, FaLink, FaExternalLinkAlt, FaBars, FaTimes, FaMapMarkerAlt, FaUser, FaPhone, FaPaperPlane, FaEdit, FaPlus, FaTrash, FaSave, FaLanguage,
    FaUserCircle, FaTachometerAlt, FaHeart, FaSun, FaMoon, FaCertificate, FaSignOutAlt, FaEye, FaEyeSlash
} from 'react-icons/fa';
import {
    SiJavascript, SiReact, SiRedux, SiBootstrap, SiMui, SiTailwindcss,
    SiSpring, SiSpringboot, SiMysql, SiPostgresql, SiMongodb, SiHibernate,
    SiDocker, SiJenkins, SiIntellijidea, SiApachemaven, SiGradle, SiJunit5, SiPostman, SiSwagger, SiJson
} from 'react-icons/si';
import { VscTools, VscVscode } from 'react-icons/vsc';

export const iconMap = {
    // Font Awesome
    FaGithub, FaLinkedin, FaTwitter, FaEnvelope,
    FaHtml5, FaCss3Alt, FaJava, FaAws, FaGitAlt, FaLock, FaDatabase, FaServer, FaCode, FaTools, FaCloud,
    FaBrain, FaLightbulb, FaTasks, FaUsers, FaGavel, FaMedal, FaUserTie, FaTerminal, FaBriefcase, FaCalendarAlt, FaGraduationCap, FaTrophy, FaHandHoldingHeart, FaHome, FaAward, FaFilePdf, FaShareAlt, FaLaptopCode, FaImage, FaStream, FaExclamationTriangle, FaSync, FaExchangeAlt, FaLayerGroup, FaGlobe, FaFlag, FaProjectDiagram, FaLink, FaExternalLinkAlt, FaBars, FaTimes, FaMapMarkerAlt, FaUser, FaPhone, FaPaperPlane, FaEdit, FaPlus, FaTrash, FaSave, FaLanguage,
    FaUserCircle, FaTachometerAlt, FaHeart, FaSun, FaMoon, FaCertificate, FaSignOutAlt, FaEye, FaEyeSlash,

    // Simple Icons
    SiJavascript, SiReact, SiRedux, SiBootstrap, SiMui, SiTailwindcss,
    SiSpring, SiSpringboot, SiMysql, SiPostgresql, SiMongodb, SiHibernate,
    SiDocker, SiJenkins, SiIntellijidea, SiApachemaven, SiGradle, SiJunit5, SiPostman, SiSwagger, SiJson,

    // VS Code Icons
    VscTools, VscVscode
};

export const resolveIcon = (iconName) => {
    if (!iconName) return FaCode;
    if (typeof iconName !== 'string') return iconName;
    return iconMap[iconName] || FaCode;
};

export default iconMap;
