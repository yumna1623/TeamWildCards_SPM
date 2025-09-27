import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinTeamForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/team/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passcode }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Successfully joined the team!");

        setTimeout(() => {
          navigate("/UserDashboardPage");
        }, 1000);
      } else {
        setMessage("❌ " + (data.message || "Failed to join team"));
      }
    } catch (error) {
      setMessage("⚠️ Server error, please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-96">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        Join a Team
      </h2>

      {message && (
        <p className="text-center mb-4 text-sm font-medium text-indigo-700">
          {message}
        </p>
      )}

      <form onSubmit={handleJoin} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Passcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Passcode
          </label>
          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter team passcode"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Join Team
        </button>
      </form>
    </div>
  );
};

export default JoinTeamForm;
