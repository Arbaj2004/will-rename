// src/App.js
import { Outlet } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // Add or remove the dark class on the root element based on Redux state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <main className="min-h-screen bg-blue-200 text-black dark:text-white dark:bg-blue-950">
        {/* This renders your nested routes */}
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
      </main>
    </>
  );
}
