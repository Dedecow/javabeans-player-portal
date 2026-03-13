import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import { useAppSelector } from '@/store/hooks';
import { getSystemTheme } from '@/utils/helpers';

const App: React.FC = () => {
  const { theme } = useAppSelector((s) => s.system);

  useEffect(() => {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
  }, [theme]);

  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'auto' ? 'colored' : theme}
      />
    </div>
  );
};

export default App;
