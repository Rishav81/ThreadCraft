import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, LogIn, ChevronRight, PackagePlus } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { useAuthModal } from "../../Context/AuthModelContext";

const Profile = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { openLoginModal } = useAuthModal();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className=" absolute
            left-[-260px]
            md:right-0
            top-6
            z-50
            w-80
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-2xl"
    >
      {/* User Info */}
      {/* User Info */}
      <Link to="/profile" className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#C19A6B]/15">
          {isAuthenticated && user?.profileImage ? (
            <img
              src={user?.profileImage}
              alt={user?.fullName || "Profile"}
              className="h-full w-full object-cover cursor-pointer"
            />
          ) : (
            <User className="h-7 w-7 text-[#C19A6B]" />
          )}
        </div>

        <div className="min-w-0">
          {isAuthenticated ? (
            <>
              <h2 className="truncate text-lg font-semibold text-gray-900">
                {user?.fullName}
              </h2>

              <p className="truncate text-sm text-gray-500">{user?.email}</p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome to ThreadCraft
              </h2>

              <p className="text-sm text-gray-500">
                Login to access your account
              </p>
            </>
          )}
        </div>
      </Link>

      <hr />

      {/* Authenticated Menu */}
      {isAuthenticated && (
        <>
          <div className="p-2">
            <Link
              to="/profile"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <User size={20} />
                <span>My Profile</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/add-product"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <PackagePlus size={20} />
                <span>Add Products</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>

          <hr />
        </>
      )}

      {/* Login / Logout */}
      <div className="p-2">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>
        ) : (
          <button
            onClick={openLoginModal}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[#C19A6B] transition hover:bg-[#C19A6B]/10"
          >
            <LogIn size={20} />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
