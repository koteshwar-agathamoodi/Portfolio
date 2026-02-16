import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Hero from './components/Home/Hero';
import Skills from './components/Home/Skills';
import Education from './components/Home/Education';
import Internships from './components/Home/Internships';
import Projects from './components/Home/Projects';
import Certificates from './components/Home/Certificates';
import Awards from './components/Home/Awards';
import Volunteering from './components/Home/Volunteering';
import Interests from './components/Home/Interests';
import Contact from './components/Home/Contact';
import Experience from './components/Home/Experience';
import Languages from './components/Home/Languages';
import AdminLayout from './components/Admin/AdminLayout';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import ProjectManager from './components/Admin/Sections/ProjectManager';
import SkillsManager from './components/Admin/Sections/SkillsManager';
import CertificatesManager from './components/Admin/Sections/CertificatesManager';
import InternshipsManager from './components/Admin/Sections/InternshipsManager';
import InterestsManager from './components/Admin/Sections/InterestsManager';
import AwardsManager from './components/Admin/Sections/AwardsManager';
import EducationManager from './components/Admin/Sections/EducationManager';
import VolunteeringManager from './components/Admin/Sections/VolunteeringManager';
import PersonalInfoManager from './components/Admin/Sections/PersonalInfoManager';
import LanguagesManager from './components/Admin/Sections/LanguagesManager';
import ExperienceManager from './components/Admin/Sections/ExperienceManager';

const HomePage = () => (
  <Layout>
    <Hero />
    <Skills />
    <Education />
    <Experience />
    <Internships />
    <Projects />
    <Certificates />
    <Awards />
    <Languages />
    <Volunteering />
    <Interests />
    <Contact />
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<PersonalInfoManager />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="education" element={<EducationManager />} />
          <Route path="internships" element={<InternshipsManager />} />
          <Route path="certificates" element={<CertificatesManager />} />
          <Route path="awards" element={<AwardsManager />} />
          <Route path="volunteering" element={<VolunteeringManager />} />
          <Route path="interests" element={<InterestsManager />} />
          <Route path="languages" element={<LanguagesManager />} />
          <Route path="experience" element={<ExperienceManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
