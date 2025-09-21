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
          to="/create-team"
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1"
        >
          Create Team
        </Link>
        <Link
          to="/join-team"
          className="px-8 py-4 bg-white text-indigo-600 font-semibold border-2 border-indigo-600 rounded-lg shadow-lg hover:bg-indigo-50 transition duration-300 transform hover:-translate-y-1"
        >
          Join Team
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
