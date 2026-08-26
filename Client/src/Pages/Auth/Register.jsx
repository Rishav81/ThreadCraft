import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle, Camera, X } from "lucide-react";
import { registerAccount } from "../../Data/API/authApi";
import Seo from "../../Components/SEO/Seo";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // =========================================================
  // HANDLE PROFILE IMAGE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image must be less than 5MB.");
      return;
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));

    setError("");
  };

  // =========================================================
  // REMOVE PROFILE IMAGE
  // =========================================================

  const removeProfileImage = () => {
    setProfileImage(null);
    setPreviewImage("");
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

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

    try {
      setLoading(true);

      // =====================================================
      // CREATE FORMDATA
      // =====================================================

      const userData = new FormData();

      userData.append("fullName", formData.fullName);
      userData.append("email", formData.email);
      userData.append("password", formData.password);

      // Profile image is optional
      if (profileImage) {
        userData.append("profileImage", profileImage);
      }

      // =====================================================
      // REGISTER
      // =====================================================

      const response = await registerAccount(userData);

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Create Your Account | ThreadCraft"
        description="Create your ThreadCraft account to shop men's, women's and kids' fashion, manage your orders, and enjoy a personalized shopping experience."
        noindex={true}
      />
      <section className="flex min-h-screen items-center justify-center bg-[#111111] px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-[#181818] p-8 shadow-xl">
          {/* =====================================================
            HEADER
        ====================================================== */}

          <h1 className="mb-2 text-center text-3xl font-bold text-[#C19A6B]">
            ThreadCraft
          </h1>

          <p className="mb-8 text-center text-gray-400">
            Create your account and start shopping.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* =====================================================
              PROFILE IMAGE
          ====================================================== */}

            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Image Preview */}

                <div
                  className="
                  flex h-28 w-28
                  items-center justify-center
                  overflow-hidden
                  rounded-full
                  border-2 border-[#C19A6B]/40
                  bg-[#222]
                "
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera size={32} className="text-[#C19A6B]" />
                  )}
                </div>

                {/* Upload Button */}

                <label
                  htmlFor="profile-image"
                  className="
                  absolute
                  bottom-0
                  right-0
                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C19A6B]
                  text-black
                  transition
                  hover:bg-[#d0aa7b]
                "
                >
                  <Camera size={17} />

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Remove Image */}

                {previewImage && (
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="
                    absolute
                    right-0
                    top-0
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-[#111]
                    text-white/60
                    transition
                    hover:text-red-400
                  "
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Profile image · Optional · Max 5MB
              </p>
            </div>

            {/* =====================================================
              FULL NAME
          ====================================================== */}

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
                mt-2
                w-full
                rounded-lg
                bg-[#222]
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-[#C19A6B]
              "
              />
            </div>

            {/* =====================================================
              EMAIL
          ====================================================== */}

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
                mt-2
                w-full
                rounded-lg
                bg-[#222]
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-[#C19A6B]
              "
              />
            </div>

            {/* =====================================================
              PASSWORD
          ====================================================== */}

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
                  mt-2
                  w-full
                  rounded-lg
                  bg-[#222]
                  px-4
                  py-3
                  pr-12
                  text-white
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

              {formData.password.length > 0 && formData.password.length < 8 && (
                <p className="mt-2 text-sm text-red-500">
                  Password must contain at least 8 characters
                </p>
              )}
            </div>

            {/* =====================================================
              CONFIRM PASSWORD
          ====================================================== */}

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
                  mt-2
                  w-full
                  rounded-lg
                  bg-[#222]
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  focus:ring-2
                  focus:ring-[#C19A6B]
                "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
                  absolute
                  right-4
                  top-5
                  text-gray-400
                  hover:text-[#C19A6B]
                "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* =====================================================
              ERROR
          ====================================================== */}

            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            {/* =====================================================
              SUBMIT
          ====================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-gradient-to-r
              from-[#C19A6B]
              to-[#A67C52]
              py-3
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
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

          {/* =====================================================
            LOGIN
        ====================================================== */}

          <p className="mt-6 text-center text-gray-400">
            Already have an account?
            <Link to="/login" className="ml-2 text-[#C19A6B] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
