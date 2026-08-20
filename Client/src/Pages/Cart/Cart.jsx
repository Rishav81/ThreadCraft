import { Link, useNavigate } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";
import { useCart } from "../../Context/CartContext";
import { useProducts } from "../../Context/ProductContext";
import { useMemo, useState } from "react";

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { products } = useProducts();

  // =========================================================
  // SELECTED ITEMS
  // =========================================================

  const [selectedItems, setSelectedItems] = useState([]);

  // =========================================================
  // FIND PRODUCT
  // =========================================================

  const getProduct = (productId) => {
    return products.find((product) => product._id === productId);
  };

  // =========================================================
  // ITEM KEY
  // =========================================================

  const getItemKey = (item) => item.cartItemId;

  // =========================================================
  // CHECK IF ITEM IS SELECTED
  // =========================================================

  const isSelected = (item) => {
    return selectedItems.includes(getItemKey(item));
  };

  // =========================================================
  // TOGGLE SINGLE ITEM
  // =========================================================

  const toggleItem = (item) => {
    const itemKey = getItemKey(item);

    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((id) => id !== itemKey)
        : [...prev, itemKey],
    );
  };

  // =========================================================
  // SELECT ALL
  // =========================================================
  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItems.includes(item.cartItemId));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(getItemKey));
    }
  };

  // =========================================================
  // SELECTED CART ITEMS
  // =========================================================

  const selectedCartItems = useMemo(() => {
    return cartItems.filter((item) => selectedItems.includes(getItemKey(item)));
  }, [cartItems, selectedItems]);

  // =========================================================
  // SELECTED SUBTOTAL
  // =========================================================

  const selectedSubtotal = useMemo(() => {
    return selectedCartItems.reduce(
      (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );
  }, [selectedCartItems]);

  // =========================================================
  // QUANTITY
  // =========================================================

  const increaseQuantity = async (item) => {
    const product = getProduct(item.productId);

    if (!product) return;

    if (item.quantity >= product.stock) return;

    try {
      await updateQuantity(item.cartItemId, item.quantity + 1);
    } catch (error) {
      console.error("Increase quantity error:", error);
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await updateQuantity(item.cartItemId, item.quantity - 1);
    } catch (error) {
      console.error("Decrease quantity error:", error);
    }
  };

  // =========================================================
  // REMOVE
  // =========================================================

  const handleRemove = async (item) => {
    try {
      await removeFromCart(item.cartItemId);

      // Remove from selection as well
      setSelectedItems((prev) => prev.filter((id) => id !== item.cartItemId));
    } catch (error) {
      console.error("Remove cart item error:", error);
    }
  };

  // =========================================================
  // CHECKOUT
  // =========================================================

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      return;
    }

    /*
      We only send the selected cart item IDs.

      Checkout page will later use these IDs
      to determine which products should be purchased.
    */

    navigate("/checkout", {
      state: {
        selectedItemIds: selectedItems,
      },
    });
  };

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen px-4 pb-20 pt-20 text-white md:pt-24 lg:pt-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
              Shopping Bag
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-wide sm:text-5xl">
              Your Cart
            </h1>

            <p className="mt-3 text-sm text-white/40">
              Review your selected pieces before checkout.
            </p>
          </div>

          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#111111] px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10">
              <FiShoppingBag size={24} className="text-[#C19A6B]" />
            </div>

            <h2 className="mt-6 text-2xl font-light">Your cart is empty</h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
              Looks like you haven't added anything to your shopping bag yet.
            </p>

            <Link
              to="/collections"
              className="mt-7 bg-[#C19A6B] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b] active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // CART
  // =========================================================

  return (
    <main className="min-h-screen px-4 pb-20 pt-20 text-white md:pt-24 lg:pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C19A6B]">
            Shopping Bag
          </p>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <h1 className="text-4xl font-light tracking-wide sm:text-5xl">
              Your Cart
            </h1>

            <span className="mb-1 text-sm text-white/30">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </span>
          </div>

          <p className="mt-3 text-sm text-white/40">
            Select the pieces you want to purchase.
          </p>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          {/* ===================================================
              LEFT — CART ITEMS
          =================================================== */}

          <div className="space-y-4">
            {/* SELECT ALL */}

            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111111] px-5 py-4">
              <label className="flex cursor-pointer items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className={`
                    flex h-5 w-5 items-center justify-center
                    rounded-sm border transition
                    ${
                      allSelected
                        ? "border-[#C19A6B] bg-[#C19A6B] text-black"
                        : "border-white/20 bg-transparent"
                    }
                  `}
                >
                  {allSelected && <FiCheck size={13} />}
                </button>

                <span className="text-sm">Select All</span>
              </label>

              <span className="text-xs text-white/30">
                {selectedCartItems.length} selected
              </span>
            </div>

            {/* CART ITEMS */}

            {cartItems.map((item) => {
              const product = getProduct(item.productId);

              const itemTotal =
                Number(item.price || 0) * Number(item.quantity || 0);

              const maxStock = product?.stock || 0;

              const isMaxStock = product && item.quantity >= maxStock;

              const itemSelected = isSelected(item);

              return (
                <div
                  key={getItemKey(item)}
                  className={`
                    flex flex-col gap-5 rounded-xl
                    border bg-[#111111] p-4
                    transition
                    md:flex-row md:justify-between
                    ${
                      itemSelected
                        ? "border-[#C19A6B]/40"
                        : "border-white/10 hover:border-white/15"
                    }
                  `}
                >
                  {/* =================================================
                      PRODUCT
                  ================================================= */}

                  <div className="flex min-w-0 flex-1 gap-4 sm:gap-6">
                    {/* CHECKBOX */}

                    <button
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`
                        mt-2 flex h-5 w-5 shrink-0
                        items-center justify-center
                        rounded-sm border transition
                        ${
                          itemSelected
                            ? "border-[#C19A6B] bg-[#C19A6B] text-black"
                            : "border-white/20"
                        }
                      `}
                    >
                      {itemSelected && <FiCheck size={13} />}
                    </button>

                    {/* IMAGE */}

                    <Link
                      to={`/products/${item.productId}`}
                      className="h-40 w-28 shrink-0 overflow-hidden rounded sm:h-48 sm:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </Link>

                    {/* DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <Link
                          to={`/products/${item.productId}`}
                          className="line-clamp-2 text-base font-medium transition hover:text-[#C19A6B] sm:text-lg"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-sm text-white/40">
                          Size:{" "}
                          <span className="text-white/70">
                            {item.size || "Not selected"}
                          </span>
                        </p>

                        <p className="mt-2 text-sm text-white/40">
                          ₹{Number(item.price || 0).toLocaleString("en-IN")} ×{" "}
                          {item.quantity}
                        </p>
                      </div>

                      {/* QUANTITY */}

                      <div className="mt-5">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-white/30">
                          Quantity
                        </p>

                        <div className="flex h-9 w-fit items-center border border-white/15">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item)}
                            disabled={item.quantity <= 1}
                            className="flex h-full w-9 items-center justify-center text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <FiMinus size={13} />
                          </button>

                          <span className="w-10 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item)}
                            disabled={isMaxStock}
                            className="flex h-full w-9 items-center justify-center text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <FiPlus size={13} />
                          </button>
                        </div>

                        {isMaxStock && (
                          <p className="mt-2 text-[10px] text-white/30">
                            Maximum available quantity reached
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      TOTAL + REMOVE
                  ================================================= */}

                  <div className="flex items-end justify-between md:min-w-[130px] md:flex-col md:items-end md:justify-between">
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      className="order-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/30 transition hover:text-red-400 md:order-1"
                    >
                      <FiTrash2 size={13} />
                      Remove
                    </button>

                    <p className="order-1 text-lg text-[#C19A6B] md:order-2">
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================
              RIGHT — SUMMARY
          =================================================== */}

          <div className="h-fit lg:sticky lg:top-28">
            <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
              <h2 className="text-lg font-medium">Cart Summary</h2>

              {/* SELECTED */}

              <div className="mt-6 flex justify-between border-b border-white/10 pb-5 text-sm">
                <span className="text-white/40">Selected Items</span>

                <span>{selectedCartItems.length}</span>
              </div>

              {/* SUBTOTAL */}

              <div className="mt-5 flex justify-between text-sm">
                <span className="text-white/40">Subtotal</span>

                <span>₹{selectedSubtotal.toLocaleString("en-IN")}</span>
              </div>

              {/* SHIPPING */}

              <div className="mt-5 flex justify-between gap-5 text-sm">
                <span className="text-white/40">Shipping</span>

                <span className="text-right text-xs text-white/40">
                  Calculated at checkout
                </span>
              </div>

              {/* TOTAL */}

              <div className="mt-5 flex justify-between text-lg">
                <span>Total</span>

                <span className="text-[#C19A6B]">
                  ₹{selectedSubtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={selectedCartItems.length === 0}
                className="
                  mt-8
                  flex h-14
                  w-full
                  items-center
                  justify-center
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
                  disabled:bg-white/10
                  disabled:text-white/30
                "
              >
                {selectedCartItems.length === 0
                  ? "Select Items"
                  : `Checkout (${selectedCartItems.length})`}
              </button>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/collections"
                className="mt-4 flex w-full items-center justify-center text-xs uppercase tracking-[0.15em] text-white/40 transition hover:text-[#C19A6B]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
