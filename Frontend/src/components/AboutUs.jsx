import {
  Users,
  CheckSquare,
  Laptop,
  UserCog,
} from "lucide-react";

// The data structure remains the same
const teamMembers = [
  {
    name: "Omer Sohail",
    role: "Project Manager",
    description: "Omer leads our project management efforts, ensuring everything runs smoothly from start to finish. He manages team schedules, resources, and ensures we stay on track to meet deadlines.",
    icon: UserCog,
    color: "indigo", // Primary Blue
  },
  {
    name: "Yumna Nasir",
    role: "Lead Developer & Business Analyst",
    description: "Yumna leads development and works as a data analyst. She utilizes different AI tools to optimize the platform and ensures it meets the needs of university students, making our web platform more engaging and useful.",
    icon: Laptop,
    color: "blue", // Secondary Blue
  },
  {
    name: "Ahsan Jabbar",
    role: "Designer",
    description: "Ahsan played a key role in designing the look and feel of the platform. Together with Mohid, they created the MVP of our project and handled the UI flow, ensuring a seamless and engaging user experience.",
    icon: CheckSquare,
    color: "sky", // Tertiary Blue
  },
  {
    name: "Mohid Shehzad",
    role: "Designer",
    description: "Mohid, alongside Ahsan, was responsible for the creation of the MVP for the project. He also managed the flow of the UI, ensuring the user interface was both functional and visually appealing.",
    icon: CheckSquare,
    color: "sky", // Tertiary Blue
  },
  {
    name: "Daniyal Badar",
    role: "Resource Manager",
    description: "Daniyal ensures that all resource management aspects are smoothly handled, from team documentation to managing printouts and ensuring smooth access to all project-related resources.",
    icon: Users,
    color: "indigo", // Primary Blue
  },
  {
    name: "Abdullah Sajjad",
    role: "Resource Manager",
    description: "Abdullah works alongside Daniyal to manage all resource aspects, including handling printing and documentation, ensuring the team has all the required materials to keep moving forward.",
    icon: Users,
    color: "indigo", // Primary Blue
  },
];

const AboutUs = () => {
  // We use `min-h-screen` for 100vh height and a clean, professional gradient
  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section: Strong blue accents for a professional look */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
          Meet The <span className="text-indigo-700">Visionaries</span>
        </h2>
        <h3 className="text-xl font-medium text-center text-indigo-500 mb-6">
          The Dedicated Team Behind <span className="font-semibold">TeamSync</span>
        </h3>

        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          We are a team of dedicated University students committed to building a reliable, high-performance collaboration platform to help organizations and teams efficiently achieve their goals.
        </p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            // Professional Card Style with Defined Border and Stronger Shadow
            <div
              key={index}
              className={`text-center bg-white p-8 rounded-xl border border-gray-200 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:border-${member.color}-500`}
            >
              <div
                // Icon styling: Strong blue icon, very light blue background
                className={`flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-${member.color}-50 text-${member.color}-600`}
              >
                <member.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-base font-semibold text-${member.color}-600 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;