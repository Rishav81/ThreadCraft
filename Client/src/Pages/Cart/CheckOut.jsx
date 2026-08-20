import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLock, FiShield } from "react-icons/fi";

import { useCart } from "../../Context/CartContext";
import { createOrder } from "../../Data/API/orderApi";
import { createPaymentOrder, verifyPayment } from "../../Data/API/paymentApi";

const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, loading, removeFromCart } = useCart();

  // =========================================================
  // CHECKOUT STATE
  // =========================================================

  const checkoutState = location.state || {};

  const isBuyNow = checkoutState.mode === "buyNow";

  const buyNowProduct = checkoutState.product;
  const buyNowSize = checkoutState.size;
  const buyNowQuantity = Number(checkoutState.quantity || 1);

  const selectedItemIds = checkoutState.selectedItemIds || [];

  // =========================================================
  // CHECKOUT ITEMS
  // =========================================================
  // This gives us ONE common structure for:
  //
  // 1. Buy Now
  // 2. Cart Checkout
  // =========================================================

  const checkoutItems = useMemo(() => {
    // -------------------------------------------------------
    // BUY NOW
    // -------------------------------------------------------

    if (isBuyNow && buyNowProduct) {
      return [
        {
          cartItemId: null,
          productId: buyNowProduct._id,
          name: buyNowProduct.name,
          image: buyNowProduct.images?.[0]?.url || "",
          price: Number(buyNowProduct.price || 0),
          size: buyNowSize,
          quantity: buyNowQuantity,
        },
      ];
    }

    // -------------------------------------------------------
    // CART CHECKOUT
    // -------------------------------------------------------

    if (selectedItemIds.length > 0) {
      return cartItems.filter((item) =>
        selectedItemIds.includes(item.cartItemId),
      );
    }

    return [];
  }, [
    isBuyNow,
    buyNowProduct,
    buyNowSize,
    buyNowQuantity,
    selectedItemIds,
    cartItems,
  ]);

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  }, [checkoutItems]);

  // =========================================================
  // SHIPPING
  // =========================================================

  const shipping = subtotal >= 999 ? 0 : 99;

  // =========================================================
  // TOTAL
  // =========================================================

  const total = subtotal + shipping;

  // =========================================================
  // FORM
  // =========================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "razorpay",
  });

  // =========================================================
  // UI STATE
  // =========================================================

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Phone
    if (name === "phone") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Pincode
    if (name === "pincode") {
      updatedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // Clear field error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    const { fullName, email, phone, address, city, state, pincode } = formData;

    // Full name
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name.";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    // Address
    if (!address.trim()) {
      newErrors.address = "Shipping address is required.";
    } else if (address.trim().length < 10) {
      newErrors.address = "Please enter a complete address.";
    }

    // City
    if (!city.trim()) {
      newErrors.city = "City is required.";
    }

    // State
    if (!state.trim()) {
      newErrors.state = "State is required.";
    }

    // Pincode
    if (!pincode) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must contain 6 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // CREATE ORDER PAYLOAD
  // =========================================================

  const buildOrderPayload = () => {
    const payload = {
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
      },

      shippingAddress: {
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode,
      },

      paymentMethod: formData.paymentMethod,
    };

    // -------------------------------------------------------
    // BUY NOW
    // -------------------------------------------------------

    if (isBuyNow) {
      payload.items = [
        {
          productId: buyNowProduct._id,
          size: buyNowSize,
          quantity: buyNowQuantity,
        },
      ];
    }

    // -------------------------------------------------------
    // CART CHECKOUT
    // -------------------------------------------------------
    else {
      payload.selectedItemIds = selectedItemIds;
    }

    return payload;
  };

  // =========================================================
  // REMOVE PURCHASED CART ITEMS
  // =========================================================

  const removePurchasedCartItems = async () => {
    // Buy Now does not have cart items
    if (isBuyNow) {
      return;
    }

    for (const itemId of selectedItemIds) {
      try {
        await removeFromCart(itemId);
      } catch (error) {
        console.error(`Failed to remove cart item ${itemId}:`, error);
      }
    }
  };

  // =========================================================
  // PAYMENT
  // =========================================================

  const handlePayment = async (e) => {
    e.preventDefault();

    // Prevent duplicate requests
    if (isProcessing) return;

    // -------------------------------------------------------
    // CHECK CHECKOUT ITEMS
    // -------------------------------------------------------

    if (checkoutItems.length === 0) {
      console.error("No items available for checkout.");

      navigate("/cart", {
        replace: true,
      });

      return;
    }

    // -------------------------------------------------------
    // VALIDATE FORM
    // -------------------------------------------------------

    if (!validateForm()) {
      return;
    }

    try {
      setIsProcessing(true);

      // =====================================================
      // STEP 1 — CREATE MONGODB ORDER
      // =====================================================

      const orderPayload = buildOrderPayload();

      console.log("Creating order:", orderPayload);

      const orderResponse = await createOrder(orderPayload);

      if (!orderResponse?.success) {
        throw new Error(orderResponse?.message || "Failed to create order.");
      }

      const mongoOrderId = orderResponse?.order?._id;

      if (!mongoOrderId) {
        throw new Error("MongoDB Order ID not received.");
      }

      // =====================================================
      // STEP 2 — CREATE RAZORPAY ORDER
      // =====================================================

      const paymentOrder = await createPaymentOrder(mongoOrderId);

      if (!paymentOrder?.razorpayOrderId) {
        throw new Error("Razorpay Order ID not received.");
      }

      // =====================================================
      // STEP 3 — CHECK RAZORPAY SDK
      // =====================================================

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK is not loaded. Please refresh the page.");
      }

      // =====================================================
      // STEP 4 — RAZORPAY OPTIONS
      // =====================================================

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: paymentOrder.amount,

        currency: paymentOrder.currency,

        name: "ThreadCraft",

        description: "ThreadCraft Order",

        order_id: paymentOrder.razorpayOrderId,

        prefill: {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          contact: formData.phone,
        },

        theme: {
          color: "#C19A6B",
        },

        // ===================================================
        // PAYMENT SUCCESS
        // ===================================================

        handler: async (response) => {
          try {
            // ===============================================
            // VERIFY PAYMENT
            // ===============================================

            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              orderId: mongoOrderId,
            };

            const result = await verifyPayment(verificationData);

            if (!result?.success) {
              throw new Error(
                result?.message || "Payment verification failed.",
              );
            }

            // ===============================================
            // REMOVE CART ITEMS
            // ===============================================

            await removePurchasedCartItems();

            // ===============================================
            // SUCCESS
            // ===============================================

            navigate("/orders", {
              replace: true,
              state: {
                order: result.order,
                paymentSuccess: true,
              },
            });
          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error.response?.data?.message || error.message,
            );

            setIsProcessing(false);
          }
        },

        // ===================================================
        // PAYMENT CLOSED
        // ===================================================

        modal: {
          ondismiss: () => {
            console.log("Razorpay Checkout closed.");

            setIsProcessing(false);
          },
        },
      };

      // =====================================================
      // OPEN RAZORPAY
      // =====================================================

      const razorpay = new window.Razorpay(options);

      // =====================================================
      // PAYMENT FAILED
      // =====================================================

      razorpay.on("payment.failed", (response) => {
        console.error("Razorpay Payment Failed:", response.error);

        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment Error:",
        error.response?.data?.message || error.message,
      );

      setIsProcessing(false);
    }
  };

  // =========================================================
  // INPUT CLASS
  // =========================================================

  const inputClass = (field) => `
    h-12
    w-full
    rounded-sm
    border
    ${
      errors[field]
        ? "border-red-400/60"
        : "border-white/10 focus:border-[#C19A6B]"
    }
    bg-white/[0.03]
    px-4
    text-sm
    text-white
    outline-none
    transition
    placeholder:text-white/20
  `;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading && !isBuyNow) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p className="text-sm text-white/40">Loading checkout...</p>
      </main>
    );
  }

  // =========================================================
  // INVALID CHECKOUT
  // =========================================================

  if (checkoutItems.length === 0) {
    return (
      <main className="min-h-screen px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex min-h-[500px] max-w-xl flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
              Checkout
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-wide">
              No items available
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/40">
              Please return to your cart and select the items you want to
              purchase.
            </p>

            <Link
              to="/cart"
              className="mt-8 bg-[#C19A6B] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b]"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // CHECKOUT UI
  // =========================================================

  return (
    <main className="min-h-screen px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 md:mb-12">
          <Link
            to="/cart"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/40 transition hover:text-[#C19A6B]"
          >
            <FiArrowLeft size={14} />
            Back to Cart
          </Link>

          <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
            Secure Checkout
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-wide sm:text-5xl">
            Complete Your Order
          </h1>

          <p className="mt-3 text-sm text-white/40">
            {isBuyNow
              ? "You're purchasing this product directly."
              : `You're purchasing ${checkoutItems.length} ${
                  checkoutItems.length === 1
                    ? "selected item"
                    : "selected items"
                }.`}
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handlePayment}
          noValidate
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]"
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <section className="rounded-xl border border-white/10 bg-[#111111] p-6 sm:p-8">
              <div className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                  01
                </p>

                <h2 className="mt-2 text-xl font-medium">
                  Contact Information
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  We'll use these details to contact you about your order.
                </p>
              </div>

              <div className="grid gap-5">
                {/* NAME */}

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass("fullName")}
                  />

                  {errors.fullName && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* EMAIL + PHONE */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                    />

                    {errors.email && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={inputClass("phone")}
                    />

                    {errors.phone && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                SHIPPING ADDRESS
            ================================================= */}

            <section className="rounded-xl border border-white/10 bg-[#111111] p-6 sm:p-8">
              <div className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                  02
                </p>

                <h2 className="mt-2 text-xl font-medium">Shipping Address</h2>

                <p className="mt-2 text-sm text-white/40">
                  Where should we deliver your ThreadCraft order?
                </p>
              </div>

              <div className="space-y-5">
                {/* ADDRESS */}

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={4}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Flat No., Street, Area"
                    className={`
                      w-full
                      resize-none
                      rounded-sm
                      border
                      ${
                        errors.address
                          ? "border-red-400/60"
                          : "border-white/10 focus:border-[#C19A6B]"
                      }
                      bg-white/[0.03]
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/20
                    `}
                  />

                  {errors.address && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* CITY + STATE */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* CITY */}

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Delhi"
                      className={inputClass("city")}
                    />

                    {errors.city && (
                      <p className="mt-2 text-xs text-red-400">{errors.city}</p>
                    )}
                  </div>

                  {/* STATE */}

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Delhi"
                      className={inputClass("state")}
                    />

                    {errors.state && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* PINCODE */}

                <div className="md:w-1/2">
                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-xs uppercase tracking-[0.12em] text-white/50"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="110001"
                    className={inputClass("pincode")}
                  />

                  {errors.pincode && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <section className="rounded-xl border border-white/10 bg-[#111111] p-6 sm:p-8">
              <div className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                  03
                </p>

                <h2 className="mt-2 text-xl font-medium">Payment Method</h2>
              </div>

              <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-[#C19A6B]/50 bg-[#C19A6B]/5 p-5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={formData.paymentMethod === "razorpay"}
                  onChange={handleChange}
                  className="accent-[#C19A6B]"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">Online Payment</p>

                  <p className="mt-1 text-xs text-white/40">
                    Secure payment powered by Razorpay
                  </p>
                </div>

                <FiLock className="text-[#C19A6B]" size={18} />
              </label>
            </section>
          </div>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
              {/* SUMMARY HEADER */}

              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Order Summary</h2>

                <span className="text-xs text-white/30">
                  {checkoutItems.length}{" "}
                  {checkoutItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* PRODUCTS */}

              <div className="mt-6 space-y-5">
                {checkoutItems.map((item, index) => {
                  const itemTotal =
                    Number(item.price || 0) * Number(item.quantity || 0);

                  return (
                    <div
                      key={
                        item.cartItemId ||
                        `${item.productId}-${item.size}-${index}`
                      }
                      className="flex gap-4"
                    >
                      {/* IMAGE */}

                      <Link
                        to={`/products/${item.productId}`}
                        className="h-24 w-20 shrink-0 overflow-hidden rounded"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      {/* DETAILS */}

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/products/${item.productId}`}
                          className="line-clamp-2 text-sm font-medium transition hover:text-[#C19A6B]"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-2 space-y-1 text-xs text-white/40">
                          <p>
                            Size:{" "}
                            <span className="text-white/70">
                              {item.size || "Not selected"}
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

                      {/* PRICE */}

                      <p className="shrink-0 text-sm text-[#C19A6B]">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-white/10" />

              {/* PRICE */}

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Subtotal</span>

                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/40">Shipping</span>

                  {shipping === 0 ? (
                    <span className="text-[#C19A6B]">FREE</span>
                  ) : (
                    <span>₹{shipping.toLocaleString("en-IN")}</span>
                  )}
                </div>
              </div>

              {/* TOTAL */}

              <div className="mt-6 flex justify-between border-t border-white/10 pt-5">
                <span className="text-base">Total</span>

                <span className="text-xl text-[#C19A6B]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                disabled={isProcessing}
                className="
                  mt-7
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-sm
                  bg-[#C19A6B]
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-black
                  transition
                  hover:bg-[#d0aa7b]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FiLock size={15} />

                {isProcessing ? "Processing..." : "Place Order"}
              </button>

              {/* SECURITY */}

              <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.1em] text-white/25">
                <FiShield size={13} />
                Secure checkout
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CheckOut;
