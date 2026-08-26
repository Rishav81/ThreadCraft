import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Pencil,
  Package,
  Heart,
  ShoppingBag,
  ChevronRight,
  Plus,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import Seo from "../../Components/SEO/Seo";

const UserProfile = () => {
  const { user, loading } = useAuth();

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#111111] px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl animate-pulse">
          {/* =================================================
              PAGE HEADER SKELETON
          ================================================= */}

          <div className="mb-10 md:mb-12">
            <div className="h-3 w-24 rounded bg-white/10" />

            <div className="mt-4 h-10 w-52 rounded bg-white/10 sm:h-12 sm:w-64" />

            <div className="mt-4 h-4 w-80 max-w-full rounded bg-white/10" />
          </div>

          {/* =================================================
              PROFILE CARD SKELETON
          ================================================= */}

          <section className="mb-8 overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
            {/* Top Accent */}

            <div className="h-28 bg-white/[0.03]" />

            <div className="px-6 pb-7 sm:px-8">
              <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                {/* Profile */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                  {/* Profile Image */}

                  <div className="h-28 w-28 shrink-0 rounded-full border-4 border-[#111111] bg-white/10" />

                  {/* User Information */}

                  <div className="pb-1">
                    <div className="h-7 w-40 rounded bg-white/10" />

                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-white/10" />
                      <div className="h-4 w-48 rounded bg-white/10" />
                    </div>
                  </div>
                </div>

                {/* Edit Profile */}

                <div className="h-11 w-36 rounded bg-white/10" />
              </div>
            </div>
          </section>

          {/* =================================================
              ACCOUNT OVERVIEW SKELETON
          ================================================= */}

          <section className="mb-8">
            <div className="mb-5">
              <div className="h-3 w-20 rounded bg-white/10" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-[#111111] p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-full bg-white/10" />

                    <div className="h-5 w-5 rounded bg-white/10" />
                  </div>

                  <div className="mt-6 h-5 w-28 rounded bg-white/10" />

                  <div className="mt-3 h-4 w-full rounded bg-white/10" />

                  <div className="mt-5 h-3 w-32 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              RECENT ACTIVITY SKELETON
          ================================================= */}

          <section className="grid gap-6 lg:grid-cols-3">
            {/* Recent Orders */}

            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111] lg:col-span-2">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <div className="h-3 w-16 rounded bg-white/10" />

                  <div className="mt-3 h-5 w-32 rounded bg-white/10" />

                  <div className="mt-2 h-4 w-40 rounded bg-white/10" />
                </div>

                <div className="h-3 w-16 rounded bg-white/10" />
              </div>

              <div className="flex min-h-[250px] flex-col items-center justify-center px-6">
                <div className="h-14 w-14 rounded-full bg-white/10" />

                <div className="mt-5 h-5 w-36 rounded bg-white/10" />

                <div className="mt-3 h-4 w-64 max-w-full rounded bg-white/10" />

                <div className="mt-6 h-3 w-32 rounded bg-white/10" />
              </div>
            </div>

            {/* Quick Actions */}

            <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
              <div className="h-3 w-20 rounded bg-white/10" />

              <div className="mt-3 h-5 w-32 rounded bg-white/10" />

              <div className="mt-2 h-4 w-full rounded bg-white/10" />

              <div className="mt-6 space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border border-white/10 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-white/10" />

                      <div className="h-4 w-24 rounded bg-white/10" />
                    </div>

                    <div className="h-4 w-4 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // =========================================================
  // PROFILE PAGE
  // =========================================================

  return (
    <>
      <Seo
        title="My Profile | ThreadCraft"
        description="Manage your ThreadCraft profile, account information and preferences."
        noindex={true}
      />
      <main className="min-h-screen  px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* =====================================================
            PAGE HEADER
        ====================================================== */}

          {/* =====================================================
            PROFILE CARD
        ====================================================== */}

          <section className="mb-8 overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
            <div className="h-28 bg-gradient-to-r from-[#C19A6B]/20 via-[#C19A6B]/5 to-transparent" />

            <div className="px-6 pb-7 sm:px-8">
              <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full  bg-[#C19A6B]/10 shadow-xl">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user?.fullName || "Profile"}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <User className="h-12 w-12 text-[#C19A6B]" />
                    )}
                  </div>

                  <div className="pb-1">
                    <h2 className="text-2xl font-light tracking-wide text-white">
                      {user?.fullName || "User"}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-white/40">
                      <Mail size={15} />
                      <span>{user?.email || "No email available"}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/profile/edit"
                  className="inline-flex h-11 w-fit items-center gap-2 border border-white/10 px-5 text-xs font-medium uppercase tracking-[0.15em] text-white/60 transition hover:border-[#C19A6B]/50 hover:text-[#C19A6B]"
                >
                  <Pencil size={15} />
                  Edit Profile
                </Link>
              </div>
            </div>
          </section>

          {/* =====================================================
            ACCOUNT OVERVIEW
        ====================================================== */}

          <section className="mb-8">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                Overview
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/orders"
                className="group rounded-xl border border-white/10 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C19A6B]/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                    <Package size={21} className="text-[#C19A6B]" />
                  </div>

                  <ChevronRight
                    size={19}
                    className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#C19A6B]"
                  />
                </div>

                <h3 className="mt-6 text-lg font-medium">My Orders</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  View and track your recent orders.
                </p>

                <div className="mt-5 text-xs uppercase tracking-[0.15em] text-[#C19A6B]">
                  View All Orders
                </div>
              </Link>

              <Link
                to="/wishlist"
                className="group rounded-xl border border-white/10 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C19A6B]/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                    <Heart size={21} className="text-[#C19A6B]" />
                  </div>

                  <ChevronRight
                    size={19}
                    className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#C19A6B]"
                  />
                </div>

                <h3 className="mt-6 text-lg font-medium">Wishlist</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Keep track of products you love.
                </p>

                <div className="mt-5 text-xs uppercase tracking-[0.15em] text-[#C19A6B]">
                  View Wishlist
                </div>
              </Link>

              <Link
                to="/my-products"
                className="group rounded-xl border border-white/10 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C19A6B]/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                    <ShoppingBag size={21} className="text-[#C19A6B]" />
                  </div>

                  <ChevronRight
                    size={19}
                    className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#C19A6B]"
                  />
                </div>

                <h3 className="mt-6 text-lg font-medium">My Listed Items</h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Manage products you have listed.
                </p>

                <div className="mt-5 text-xs uppercase tracking-[0.15em] text-[#C19A6B]">
                  Manage Products
                </div>
              </Link>
            </div>
          </section>

          {/* =====================================================
            RECENT ACTIVITY
        ====================================================== */}

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111] lg:col-span-2">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Activity
                  </p>

                  <h2 className="mt-2 text-lg font-medium">Recent Orders</h2>

                  <p className="mt-1 text-sm text-white/40">
                    Your latest purchases
                  </p>
                </div>

                <Link
                  to="/orders"
                  className="text-xs uppercase tracking-[0.15em] text-white/40 transition hover:text-[#C19A6B]"
                >
                  View All
                </Link>
              </div>

              <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10">
                  <Package size={21} className="text-[#C19A6B]" />
                </div>

                <h3 className="mt-5 text-base font-medium">No recent orders</h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
                  Once you place an order, your latest purchases will appear
                  here.
                </p>

                <Link
                  to="/collections"
                  className="mt-6 text-xs uppercase tracking-[0.15em] text-[#C19A6B] transition hover:text-[#d0aa7b]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                Shortcuts
              </p>

              <h2 className="mt-2 text-lg font-medium">Quick Actions</h2>

              <p className="mt-1 text-sm text-white/40">
                Manage your ThreadCraft account.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/add-product"
                  className="group flex items-center justify-between border border-white/10 px-4 py-4 transition hover:border-[#C19A6B]/40 hover:bg-[#C19A6B]/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                      <Plus size={17} className="text-[#C19A6B]" />
                    </div>

                    <span className="text-sm text-white/70 transition group-hover:text-white">
                      Add Product
                    </span>
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#C19A6B]"
                  />
                </Link>

                <Link
                  to="/wishlist"
                  className="group flex items-center justify-between border border-white/10 px-4 py-4 transition hover:border-[#C19A6B]/40 hover:bg-[#C19A6B]/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                      <Heart size={17} className="text-[#C19A6B]" />
                    </div>

                    <span className="text-sm text-white/70 transition group-hover:text-white">
                      My Wishlist
                    </span>
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#C19A6B]"
                  />
                </Link>

                <Link
                  to="/address"
                  className="group flex items-center justify-between border border-white/10 px-4 py-4 transition hover:border-[#C19A6B]/40 hover:bg-[#C19A6B]/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                      <MapPin size={17} className="text-[#C19A6B]" />
                    </div>

                    <span className="text-sm text-white/70 transition group-hover:text-white">
                      Address Book
                    </span>
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#C19A6B]"
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
