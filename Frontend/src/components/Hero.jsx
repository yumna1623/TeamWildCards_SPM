// src/components/Hero.jsx
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-cyan-300 via-white to-pink-300">
      <div className="mt-20 px-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 uppercase mb-4 tracking-wide">
          Welcome to
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-900 mb-6 leading-tight drop-shadow">
          TeamSync <br />
          <span className="text-indigo-600">Team Collaboration Made Easy</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-md md:text-lg mb-10">
          A modern project management platform where team leaders can create
          teams, assign tasks, and track progress — while members collaborate
          seamlessly.
        </p>
        <div className="flex gap-6 justify-center">
          <Link
            to="/create"
            className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Create Team
          </Link>
          <Link
            to="/join"
            className="px-8 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-full shadow-md hover:bg-indigo-100 transition transform hover:scale-105"
          >
            Join Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
