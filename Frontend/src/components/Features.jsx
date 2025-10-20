import { Users, CheckSquare, BarChart3, TrendingUp, Handshake, Box } from "lucide-react";

const Features = () => {
  return (
    <div className="py-28 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <section className="p-12 bg-gray-900 text-white rounded-3xl shadow-xl">
          <div className="text-center">
            {/* Main Heading and Lead Paragraph */}
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              Why Choose <span className="text-indigo-400">TeamSync</span>?
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Unlock seamless collaboration and boost productivity. TeamSync provides the tools your team needs to work efficiently, achieve goals, and stay connected from anywhere.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1: Align and Focus */}
              <div className="p-6  rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-blue-600/20 text-blue-400">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Align and focus
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Collaborate, track, and deliver projects effectively, whether you're in the same room or across the globe.
                </p>
              </div>

              {/* Feature 2: Customize Your Workspace */}
              <div className="p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-yellow-400/20 text-yellow-300">
                  <Handshake className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Customizable workspace
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Tailor your platform to your team's unique needs with the tools you want and the flexibility you require.
                </p>
              </div>

              {/* Feature 3: Grow without growing pains */}
              <div className="p-6  rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-red-400/20 text-red-300">
                  <Box className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Grow effortlessly
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Our platform's flexibility ensures you can adapt to any workflow without roadblocks as your team evolves.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;