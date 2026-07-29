import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#181818] p-8 rounded-2xl shadow-xl">
        {/* Brand */}
        <h1 className="text-3xl font-bold text-center text-[#C19A6B] mb-2">
          ThreadCraft
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Welcome back! Login to continue shopping.
        </p>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 bg-[#222] text-white rounded-lg outline-none focus:ring-2 focus:ring-[#C19A6B]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 bg-[#222] text-white rounded-lg outline-none focus:ring-2 focus:ring-[#C19A6B]"
            />
          </div>

          <button className="w-full py-3 bg-[#C19A6B] text-black font-semibold rounded-lg hover:opacity-90 transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-400   hover:text-gray-600 mt-6 transition duration-300">
          Don't have an account?
          <Link to="/register" className="text-[#C19A6B] ml-2 cursor-pointer">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
