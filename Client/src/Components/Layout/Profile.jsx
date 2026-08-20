import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  LogIn,
  ChevronRight,
  PackagePlus,
} from "lucide-react";
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
    <div className="absolute right-0 top-6 z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      {/* Arrow */}
      <div className="absolute -top-2 right-7 h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white"></div>

      {/* User Info */}
      <div className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C19A6B]/15">
          <User className="h-7 w-7 text-[#C19A6B]" />
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
      </div>

      <hr />

      {/* Authenticated Menu */}
      {isAuthenticated && (
        <>
          <div className="p-2">
            <Link
              to="/orders"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Package size={20} />
                <span>My Orders</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/wishlist"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Heart size={20} />
                <span>Wishlist</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/address"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span>Address Book</span>
              </div>

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

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

            <Link
              to="/settings"
              className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Settings size={20} />
                <span>Settings</span>
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
