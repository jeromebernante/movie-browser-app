import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import movieLogo from "../assets/movie-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-950 text-white shadow-md sticky top-0 z-50 h-[70px]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src={movieLogo}
            alt="Movie Browser Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold">Movie Browser</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <a href="/movies" className="hover:text-red-500 transition">
            Movies
          </a>
          <a href="/tv" className="hover:text-red-500 transition">
            TV Shows
          </a>
        </div>

        {/* Search always visible */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-white placeholder-gray-400 w-48 focus:w-64 focus:border-red-500 transition-all duration-300"
          />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a
            href="/movies"
            className="block py-2 border-b border-gray-700 hover:text-red-500 transition"
          >
            Movies
          </a>
          <a
            href="/tv"
            className="block py-2 border-b border-gray-700 hover:text-red-500 transition"
          >
            TV Shows
          </a>
          <a
            href="/people"
            className="block py-2 border-b border-gray-700 hover:text-red-500 transition"
          >
            People
          </a>

          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full mt-3 px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-white placeholder-gray-400"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
