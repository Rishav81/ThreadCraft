import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiChevronRight,
  FiPackage,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

import { getMyOrders } from "../../Data/API/orderApi";

const Orders = () => {
  // ============================================================
  // STATE
  // ============================================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH ORDERS
  // ============================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyOrders();

      if (!response?.success) {
        throw new Error(response?.message || "Failed to fetch orders.");
      }

      setOrders(response.orders || []);
    } catch (error) {
      console.error("Fetch Orders Error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load your orders.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL FETCH
  // ============================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // FORMAT PRICE
  // ============================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // ============================================================
  // PAYMENT STATUS
  // ============================================================

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "border-green-400/20 bg-green-400/10 text-green-400";

      case "failed":
        return "border-red-400/20 bg-red-400/10 text-red-400";

      default:
        return "border-yellow-400/20 bg-yellow-400/10 text-yellow-400";
    }
  };

  // ============================================================
  // ORDER STATUS
  // ============================================================

  const getOrderStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "border-green-400/20 bg-green-400/10 text-green-400";

      case "cancelled":
        return "border-red-400/20 bg-red-400/10 text-red-400";

      case "shipped":
        return "border-blue-400/20 bg-blue-400/10 text-blue-400";

      case "processing":
        return "border-purple-400/20 bg-purple-400/10 text-purple-400";

      case "confirmed":
        return "border-[#C19A6B]/20 bg-[#C19A6B]/10 text-[#C19A6B]";

      default:
        return "border-yellow-400/20 bg-yellow-400/10 text-yellow-400";
    }
  };

  // ============================================================
  // CAPITALIZE STATUS
  // ============================================================

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-screen px-4 pb-20 pt-24 text-white sm:px-6 md:pt-28 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[500px] flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#C19A6B]" />

            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/40">
              Loading your orders...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <main className="min-h-screen px-4 pb-20 pt-24 text-white sm:px-6 md:pt-28 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex min-h-[500px] max-w-xl flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">
              Orders
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-wide">
              Something went wrong
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/40">{error}</p>

            <button
              onClick={fetchOrders}
              className="mt-8 inline-flex items-center gap-2 bg-[#C19A6B] px-7 py-4 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b]"
            >
              <FiRefreshCw size={14} />
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // EMPTY ORDERS
  // ============================================================

  if (orders.length === 0) {
    return (
      <main className="min-h-screen px-4 pb-20 pt-24 text-white sm:px-6 md:pt-28 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex min-h-[500px] max-w-xl flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <FiPackage size={25} className="text-[#C19A6B]" />
            </div>

            <p className="mt-7 text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
              My Orders
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-wide">
              No orders yet
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/40">
              You haven't placed any orders yet. Explore our collection and find
              something you'll love.
            </p>

            <Link
              to="/collections"
              className="mt-8 bg-[#C19A6B] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b]"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // ORDERS PAGE
  // ============================================================

  return (
    <main className="min-h-screen px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 md:mb-12">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/40 transition hover:text-[#C19A6B]"
          >
            <FiArrowLeft size={14} />
            Continue Shopping
          </Link>

          <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
            My Account
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-light tracking-wide sm:text-5xl">
                My Orders
              </h1>

              <p className="mt-3 text-sm text-white/40">
                View and track your ThreadCraft purchases.
              </p>
            </div>

            <div className="text-xs uppercase tracking-[0.15em] text-white/30">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </div>
          </div>
        </div>

        {/* =====================================================
            ORDERS
        ===================================================== */}

        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
            >
              {/* =================================================
                  ORDER HEADER
              ================================================= */}

              <div className="border-b border-white/10 p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* ORDER INFO */}

                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Order
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#C19A6B]">
                        #{order.orderNumber || order._id}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Date
                      </p>

                      <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
                        <FiCalendar size={13} />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Total
                      </p>

                      <p className="mt-1 text-sm text-white/80">
                        ₹{formatPrice(order.orderSummary?.total)}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] ${getOrderStatusClass(
                        order.orderStatus,
                      )}`}
                    >
                      {formatStatus(order.orderStatus)}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] ${getPaymentStatusClass(
                        order.paymentStatus,
                      )}`}
                    >
                      Payment {formatStatus(order.paymentStatus)}
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ORDER ITEMS
              ================================================= */}

              <div className="p-5 sm:p-6">
                <div className="space-y-5">
                  {order.items?.map((item, index) => {
                    const image =
                      item.image || item.product?.images?.[0]?.url || "";

                    const itemTotal =
                      Number(item.price || 0) * Number(item.quantity || 0);

                    return (
                      <div
                        key={`${order._id}-${item.product?._id || index}`}
                        className="flex gap-4"
                      >
                        {/* IMAGE */}

                        <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-white/[0.03] sm:h-32 sm:w-24">
                          {image ? (
                            <img
                              src={image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-white/20">
                              <FiPackage size={20} />
                            </div>
                          )}
                        </div>

                        {/* DETAILS */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row">
                            <div>
                              <h3 className="line-clamp-2 text-sm font-medium sm:text-base">
                                {item.name}
                              </h3>

                              <div className="mt-2 space-y-1 text-xs text-white/40">
                                <p>
                                  Size:{" "}
                                  <span className="text-white/70">
                                    {item.size}
                                  </span>
                                </p>

                                <p>
                                  Quantity:{" "}
                                  <span className="text-white/70">
                                    {item.quantity}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <p className="shrink-0 text-sm text-[#C19A6B]">
                              ₹{formatPrice(itemTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-8">
                        <span className="text-white/30">Subtotal</span>

                        <span className="text-white/70">
                          ₹{formatPrice(order.orderSummary?.subtotal)}
                        </span>
                      </div>

                      <div className="flex gap-8">
                        <span className="text-white/30">Shipping</span>

                        <span className="text-white/70">
                          {order.orderSummary?.shipping === 0
                            ? "FREE"
                            : `₹${formatPrice(order.orderSummary?.shipping)}`}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Order Total
                      </p>

                      <p className="mt-1 text-xl text-[#C19A6B]">
                        ₹{formatPrice(order.orderSummary?.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="flex flex-col gap-4 border-t border-white/10 bg-white/[0.015] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white/25">
                  <FiShield size={13} />
                  Secure ThreadCraft Order
                </div>

                <Link
                  to={`/orders/${order._id}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-white/50 transition hover:text-[#C19A6B]"
                >
                  View Order
                  <FiChevronRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Orders;
