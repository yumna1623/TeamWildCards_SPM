// src/components/user/JoinTeamForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinTeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    // 🚀 Simulate success since no backend
    if (teamName && passcode) {
      setMessage("Successfully joined the team!");

      setTimeout(() => {
        navigate("/UserDashBoardPage"); // redirect to dashboard
      }, 1000);
    } else {
      setMessage("Please fill in all fields.");
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passcode
          </label>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
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
