// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] rounded-full px-6 py-3 flex justify-between items-center z-50">
      {/* Brand Name */}
      <h1 className="text-2xl font-bold text-black-600 tracking-wide">
        TeamSync
      </h1>

      {/* Links */}
      <div className="flex gap-6">
        <Link
          to="/join"
          className="text-gray-800 font-medium hover:text-indigo-600 transition"
        >
          Join Team
        </Link>
        <Link
          to="/create"
          className="text-gray-800 font-medium hover:text-indigo-600 transition"
        >
          Create Team
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
