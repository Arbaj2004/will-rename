import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="dark:bg-slate-900 bg-blue-700 text-white  py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Brand Name */}
          <div className="text-2xl font-bold mb-4 md:mb-0">Will-Rename</div>

          {/* Navigation Links */}
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <Link to={"/"} className="hover:text-blue-400">Home</Link>
            <Link to={"/about"} className="hover:text-blue-400">About</Link>
            <Link to={"/services"} className="hover:text-blue-400">Services</Link>
            <Link to={"/contact"} className="hover:text-blue-400">Contact</Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Will-Rename. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
