import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/darkModeSlice';
import LoginCard from './LoginCard';
import Avatar from './Avatar';

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state) => state.user.user); // Get the user from Redux state
  const [login, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      console.log(user)
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  return (
    <>
      {login && (
        <div className='bg-transparent fixed inset-0 flex justify-center items-center'>
          <div className='bg-black bg-opacity-80 absolute inset-0' onClick={() => setLogin(false)} />
          <LoginCard onClose={() => setLogin(false)} />
        </div>
      )}

      <div className='sticky top-0 dark:bg-black bg-slate-100 flex justify-between items-center px-5 md:px-20 p-5 shadow-lg font-poppins tracking-wide text-lg z-20'>
        <Link to={"/"} className='text-xl shadow-2xl'>Will Rename</Link>

        <div className="md:hidden flex items-center gap-8">
          <Link to={"/"} onClick={() => dispatch(toggleDarkMode())} className='lg:hidden hover:text-blue-500'>
            {darkMode ? <FaSun /> : <FaMoon />}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className='text-2xl'>
            {menuOpen ? '✖️' : '☰'}
          </button>
        </div>

        <div ref={menuRef} className={`flex flex-col md:flex-row md:gap-20 gap-5 items-center transition-transform duration-300 ${menuOpen ? 'absolute left-0 top-16 w-full bg-slate-100 dark:bg-black' : 'hidden md:flex'}`}>
          <Link  onClick={() => dispatch(toggleDarkMode())} className='hover:text-blue-500 hidden md:block'>
            {darkMode ? <FaSun /> : <FaMoon />}
          </Link>
          <Link to={"/"} className='hover:text-blue-500'>Our Team</Link>
          <Link to={"/"} className='hover:text-blue-500'>Learn</Link>
          <Link to={"/"} className='hover:text-blue-500'>Blog</Link>

          {/* Display user or Login button */}
          {user ? (
            <div className='flex items-center gap-3 cursor-pointer' onClick={()=>{navigate("/profile")}}>

            <p to={"/"} className='hover:text-blue-500'>Hello ,{user.name.split(' ')[0]}</p>
            <Avatar
            width={50}
            height={50}
            name={user?.name}
            // imageUrl={user?.profilePic}
            />
            </div>
          ) : (
            <p className='bg-blue-500 cursor-pointer py-1 px-5 rounded-lg text-white mb-4' onClick={() => {setLogin(true); setMenuOpen(false)}}>
              Login
            </p>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className='absolute inset-0 z-10' onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
