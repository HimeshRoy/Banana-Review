import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-black text-yellow-400">
              🍌 Banana
            </h1>
          </Link>


          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white/10 border border-white/10 rounded-xl px-4 py-2 w-100"
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm"
            />

            <button type="submit">
              <FaSearch className="text-yellow-400" />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl p-3"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-[80%] h-screen bg-zinc-950 z-[100] p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl mb-10"
            >
              <FaTimes />
            </button>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="mt-10 flex items-center bg-white/10 rounded-full px-4 py-3"
            >
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none flex-1"
              />

              <button type="submit">
                <FaSearch className="text-yellow-400" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
