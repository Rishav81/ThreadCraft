import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAccount } from "../../Data/API/authApi";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginAccount(formData);

      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="
                w-full mt-2 px-4 py-3
                bg-[#222]
                text-white
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-[#C19A6B]
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="
                  w-full mt-2 px-4 py-3 pr-12
                  bg-[#222]
                  text-white
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-[#C19A6B]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-5
                  text-gray-400
                  hover:text-[#C19A6B]
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3
              bg-gradient-to-r
              from-[#C19A6B]
              to-[#A67C52]
              text-black
              font-semibold
              rounded-lg
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-95
              cursor-pointer
              disabled:opacity-50
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading ? (
              <>
                <LoaderCircle size={20} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Login Account"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="
              text-[#C19A6B]
              ml-2
              hover:underline
            "
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
