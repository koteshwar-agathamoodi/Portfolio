# 🚀 Personal Portfolio Website

A dynamic, fully responsive, and feature-rich portfolio website built with modern web technologies. This project is designed to showcase skills, projects, and experience with a sleek user interface and a powerful **Admin Dashboard** for easy content management.

## ✨ Features

- **🎨 Modern & Responsive Design**: Built with **Tailwind CSS**, ensuring a stunning look on all devices (Mobile, Tablet, Desktop).
- **🌗 Dark/Light Mode**: Seamless theme switching with persistent user preference.
- **⚡ Fast Performance**: Powered by **Vite** for lightning-fast development and optimized production builds.
- **🛠 Admin Dashboard**: A comprehensive admin panel to manage *everything* without touching the code:
  - Update Personal Info, Bio, and Social Links.
  - Manage Skills, Projects, Experience, Education, Certifications, etc.
  - Upload/Link Resume.
- **📄 Dynamic Resume Download**: "Download Resume" button that links to your uploaded PDF.
- **✨ Smooth Animations**: Interactive elements powered by **Framer Motion**.
- **📧 Contact Integration**: Direct email composition via Gmail link.
- **🔔 Interactive Feedback**: Toast notifications (`react-toastify`) and sweet alerts (`sweetalert2`) for a great user experience.

## 🛠 Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/) & [SweetAlert2](https://sweetalert2.github.io/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/koteshwar-agathamoodi/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to see the application running.

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, PDF resume)
├── components/
│   ├── Admin/       # Admin Dashboard components (Login, Dashboard, Managers)
│   ├── Home/        # Public facing sections (Hero, About, Projects, etc.)
│   ├── Layout/      # Layout components (Navbar, Footer, AdminLayout)
│   └── UI/          # Reusable UI components (buttons, inputs, icon renderer)
├── context/         # Context API for state management (PortfolioContext)
├── data/            # Initial data and constants
├── utils/           # Utility functions (Icon mapping)
├── App.jsx          # Main application component & Routing
└── main.jsx         # Entry point
```

## 🔐 Admin Access

To access the Admin Dashboard:
1.  Navigate to `/admin/login` (e.g., `http://localhost:5173/admin/login`).
2.  (Note: Implement your own authentication logic in `Login.jsx` or use the default if set).
3.  Manage your content dynamically!

## 🚢 Deployment

This project is optimized for deployment on platforms like **Vercel** or **Netlify**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel/Netlify.
3.  The build settings should be automatically detected (Framework: Vite, Build Command: `npm run build`, Output Directory: `dist`).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Koteshwar Rao Agathamoodi](https://github.com/koteshwar-agathamoodi)

### Deployment Note

If deploying to Netlify, this project includes a `public/_redirects` file to handle client-side routing. This prevents 404 errors when refreshing pages like `/admin`.
