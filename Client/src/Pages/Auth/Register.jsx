import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { registerAccount } from "../../Data/API/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // remove error while typing
    setError("");
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password length validation
    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);

      const response = await registerAccount(userData);

      if (response.status === 201) {
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
        <h1 className="text-3xl font-bold text-center text-[#C19A6B] mb-2">
          ThreadCraft
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Create your account and start shopping.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="
              w-full mt-2 px-4 py-3 
              bg-[#222] text-white 
              rounded-lg outline-none
              focus:ring-2 focus:ring-[#C19A6B]
              "
            />
          </div>

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
              bg-[#222] text-white 
              rounded-lg outline-none
              focus:ring-2 focus:ring-[#C19A6B]
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
                placeholder="Create password"
                required
                className="
                w-full mt-2 px-4 py-3 pr-12
                bg-[#222] text-white 
                rounded-lg outline-none
                focus:ring-2 focus:ring-[#C19A6B]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                absolute right-4 top-5
                text-gray-400
                hover:text-[#C19A6B]
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {formData.password.length > 0 && formData.password.length < 8 && (
              <p className="text-red-500 text-sm mt-2">
                Password must contain at least 8 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="
                w-full mt-2 px-4 py-3 pr-12
                bg-[#222] text-white 
                rounded-lg outline-none
                focus:ring-2 focus:ring-[#C19A6B]
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                absolute right-4 top-5
                text-gray-400
                hover:text-[#C19A6B]
                "
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
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
            flex items-center justify-center gap-2
            "
          >
            {loading ? (
              <>
                <LoaderCircle size={20} className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <Link to="/login" className="text-[#C19A6B] ml-2 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
