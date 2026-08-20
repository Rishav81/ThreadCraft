import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight, FiShoppingBag, FiMapPin } from "react-icons/fi";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  // ==========================================
  // AUTO REDIRECT
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/collections");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // ==========================================
  // FALLBACK
  // ==========================================

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
            ThreadCraft
          </p>

          <h1 className="mt-4 text-3xl font-light">
            Order information unavailable
          </h1>

          <Link
            to="/collections"
            className="mt-7 inline-flex items-center gap-2 bg-[#C19A6B] px-7 py-4 text-xs font-medium uppercase tracking-[0.15em] text-black"
          >
            Continue Shopping
            <FiArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  const { _id, customer, shippingAddress, items, orderSummary, paymentStatus } =
    order;

  return (
    <main className="min-h-screen px-4 pb-20 pt-28 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* ==========================================
            SUCCESS HEADER
        ========================================== */}

        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C19A6B]/40 bg-[#C19A6B]/10">
            <FiCheck size={34} className="text-[#C19A6B]" />
          </div>

          <p className="mt-7 text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-wide sm:text-5xl">
            Thank You for Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/40">
            Your order has been successfully placed. We'll keep you updated
            about your order and delivery.
          </p>

          {/* ORDER ID */}

          <p className="mt-5 text-xs text-white/30">
            Order ID <span className="text-white/70">#{_id}</span>
          </p>
        </div>

        {/* ==========================================
            ORDER CONTENT
        ========================================== */}

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ==========================================
              PRODUCTS
          ========================================== */}

          <section className="rounded-xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <FiShoppingBag className="text-[#C19A6B]" size={19} />

              <h2 className="text-lg font-medium">Ordered Items</h2>
            </div>

            <div className="mt-7 divide-y divide-white/10">
              {items.map((item, index) => {
                const itemTotal =
                  Number(item.price || 0) * Number(item.quantity || 0);

                return (
                  <div
                    key={`${item.product}-${item.size}-${index}`}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    {/* IMAGE */}

                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-medium">
                        {item.name}
                      </h3>

                      <div className="mt-2 space-y-1 text-xs text-white/40">
                        <p>
                          Size:{" "}
                          <span className="text-white/70">{item.size}</span>
                        </p>

                        <p>
                          Quantity:{" "}
                          <span className="text-white/70">{item.quantity}</span>
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}

                    <div className="shrink-0">
                      <p className="text-sm text-[#C19A6B]">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ==========================================
              ORDER DETAILS
          ========================================== */}

          <aside className="space-y-6">
            {/* TOTAL */}

            <section className="rounded-xl border border-white/10 bg-[#111111] p-6">
              <h2 className="text-lg font-medium">Order Summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Subtotal</span>

                  <span>₹{orderSummary.subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Shipping</span>

                  <span>
                    {orderSummary.shipping === 0
                      ? "FREE"
                      : `₹${orderSummary.shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-5 text-lg">
                  <span>Total</span>

                  <span className="text-[#C19A6B]">
                    ₹{orderSummary.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* PAYMENT STATUS */}

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs text-white/40">Payment Status</p>

                <p className="mt-1 text-sm capitalize text-[#C19A6B]">
                  {paymentStatus}
                </p>
              </div>
            </section>

            {/* SHIPPING ADDRESS */}

            <section className="rounded-xl border border-white/10 bg-[#111111] p-6">
              <div className="flex items-center gap-3">
                <FiMapPin size={17} className="text-[#C19A6B]" />

                <h2 className="text-lg font-medium">Delivery Address</h2>
              </div>

              <div className="mt-5 text-sm leading-6 text-white/50">
                <p className="text-white/80">{customer.fullName}</p>

                <p>{shippingAddress.address}</p>

                <p>
                  {shippingAddress.city}, {shippingAddress.state}
                </p>

                <p>{shippingAddress.pincode}</p>

                <p className="mt-3">{customer.phone}</p>
              </div>
            </section>
          </aside>
        </div>

        {/* ==========================================
            REDIRECT MESSAGE
        ========================================== */}

        <div className="mt-10 text-center">
          <p className="text-xs text-white/30">
            Redirecting you to the collection in{" "}
            <span className="text-[#C19A6B]">5 seconds</span>
            ...
          </p>

          <Link
            to="/collections"
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/40 transition hover:text-[#C19A6B]"
          >
            Continue Shopping
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmed;
