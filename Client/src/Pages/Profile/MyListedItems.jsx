import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Pencil, Trash2, Eye, ArrowLeft } from "lucide-react";

import { deleteProduct, getMyProducts } from "../../Data/API/productApi";
import Seo from "../../Components/SEO/Seo";

const MyListedItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH MY PRODUCTS
  // ============================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyProducts();

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch listed products:", error);

      setError(
        error.response?.data?.message || "Unable to load your listed products.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ============================================================
  // DELETE PRODUCT
  // ============================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Delete product failed:", error);

      alert(error.response?.data?.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#111111] px-4 pb-20 pt-24 text-white sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Header Skeleton */}

          <div className="mb-12">
            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />

            <div className="mt-5 h-12 w-72 animate-pulse rounded bg-white/10" />

            <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-white/10" />
          </div>

          {/* Product Skeleton */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
              >
                <div className="aspect-[4/5] animate-pulse bg-white/5" />

                <div className="space-y-4 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/10" />

                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />

                  <div className="h-10 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <>
      <Seo
        title="My Listed Products | ThreadCraft"
        description="Manage the products you have listed on ThreadCraft."
        noindex={true}
      />
      <main className="min-h-screen  px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10 ">
        <div className="mx-auto max-w-7xl">
          {/* ======================================================
            HEADER
        ======================================================= */}

          <div className="mb-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <h1 className="text-4xl font-light tracking-wide sm:text-5xl">
                    My Listed Items
                  </h1>

                  <span className="mb-1 text-sm text-white/30">
                    ({products.length}{" "}
                    {products.length === 1 ? "item" : "items"})
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                  Manage the products you have listed on ThreadCraft.
                </p>
              </div>

              {/* Add Product */}

              <Link
                to="/add-product"
                className="inline-flex h-12 w-fit items-center gap-2 rounded-sm bg-[#C19A6B] px-6 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b] active:scale-[0.98]"
              >
                <Plus size={16} />
                Add Product
              </Link>
            </div>
          </div>

          {/* ======================================================
            ERROR
        ======================================================= */}

          {error && (
            <div className="mb-8 rounded-xl border border-red-400/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* ======================================================
            EMPTY STATE
        ======================================================= */}

          {!error && products.length === 0 && (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#111111] px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10">
                <Package size={24} className="text-[#C19A6B]" />
              </div>

              <h2 className="mt-6 text-2xl font-light">No Listed Items</h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                You haven't listed any products yet. Start building your
                ThreadCraft collection by adding your first product.
              </p>

              <Link
                to="/add-product"
                className="mt-7 inline-flex items-center gap-2 bg-[#C19A6B] px-7 py-4 text-xs font-medium uppercase tracking-[0.15em] text-black transition hover:bg-[#d0aa7b] active:scale-95"
              >
                <Plus size={15} />
                Add Your First Product
              </Link>
            </div>
          )}

          {/* ======================================================
            PRODUCTS
        ======================================================= */}

          {products.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const image = product.images?.[0]?.url;

                const isPublished = product.status === "published";

                return (
                  <article
                    key={product._id}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-white/15"
                  >
                    {/* ==================================================
                      IMAGE
                  =================================================== */}

                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                      {image ? (
                        <img
                          src={image}
                          alt={product.images?.[0]?.alt || product.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package size={40} className="text-white/10" />
                        </div>
                      )}

                      {/* Status */}

                      <div className="absolute left-3 top-3">
                        <span
                          className={`border px-3 py-1 text-[9px] uppercase tracking-[0.15em] ${
                            isPublished
                              ? "border-emerald-400/20 bg-black/60 text-emerald-400"
                              : "border-yellow-400/20 bg-black/60 text-yellow-400"
                          }`}
                        >
                          {isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>

                    {/* ==================================================
                      DETAILS
                  =================================================== */}

                    <div className="p-5">
                      {/* Brand */}

                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                        {product.brand || "ThreadCraft"}
                      </p>

                      {/* Name */}

                      <h2 className="mt-2 line-clamp-2 min-h-[48px] text-base font-medium leading-6 text-white transition group-hover:text-[#C19A6B]">
                        {product.name}
                      </h2>

                      {/* Price + Stock */}

                      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                            Price
                          </p>

                          <p className="mt-1 text-lg font-light text-[#C19A6B]">
                            ₹
                            {Number(product.price || 0).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                            Stock
                          </p>

                          <p
                            className={`mt-1 text-sm ${
                              product.stock > 0
                                ? "text-white/70"
                                : "text-red-400"
                            }`}
                          >
                            {product.stock}
                          </p>
                        </div>
                      </div>

                      {/* ==================================================
                        ACTIONS
                    =================================================== */}

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {/* View */}

                        <Link
                          to={`/products/${product._id}`}
                          title="View Product"
                          className="flex h-10 items-center justify-center border border-white/10 text-white/50 transition hover:border-[#C19A6B]/50 hover:text-[#C19A6B]"
                        >
                          <Eye size={16} />
                        </Link>

                        {/* Edit */}

                        <Link
                          to={`/edit-product/${product._id}`}
                          title="Edit Product"
                          className="flex h-10 items-center justify-center border border-white/10 text-white/50 transition hover:border-[#C19A6B]/50 hover:text-[#C19A6B]"
                        >
                          <Pencil size={16} />
                        </Link>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          disabled={deletingId === product._id}
                          title="Delete Product"
                          className="flex h-10 items-center justify-center border border-white/10 text-white/40 transition hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          {deletingId === product._id ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-red-400" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyListedItems;
