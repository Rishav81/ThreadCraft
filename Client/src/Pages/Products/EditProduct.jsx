import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../Data/API/productApi";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getSingleProduct(id);

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to load product.");
        }

        setProduct(response.data.product);
      } catch (error) {
        console.error("GET PRODUCT ERROR:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load product.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-10 border-b border-white/10 pb-8">
            <div className="h-10 w-64 rounded bg-white/10" />

            <div className="mt-4 h-4 w-96 max-w-full rounded bg-white/10" />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <SkeletonSection height="500px" />

              <SkeletonSection height="220px" />

              <SkeletonSection height="350px" />

              <SkeletonSection height="300px" />
            </div>

            <div className="space-y-8">
              <SkeletonSection height="500px" />

              <SkeletonSection height="180px" />

              <SkeletonSection height="250px" />

              <div className="h-14 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4 text-white">
        <div className="text-center">
          <h2 className="text-xl font-medium">Unable to load product</h2>

          <p className="mt-3 text-sm text-red-400">{error}</p>

          <button
            onClick={() => navigate("/my-products")}
            className="mt-6 rounded-lg border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:border-[#C19A6B] hover:text-[#C19A6B]"
          >
            Back to My Products
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // FORM
  // =========================================================

  return <ProductForm mode="edit" product={product} />;
};

// =========================================================
// SKELETON
// =========================================================

const SkeletonSection = ({ height }) => {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#111111] p-6"
      style={{ minHeight: height }}
    >
      <div className="h-5 w-40 rounded bg-white/10" />

      <div className="mt-3 h-3 w-64 rounded bg-white/10" />

      <div className="mt-8 space-y-5">
        <div className="h-12 w-full rounded-lg bg-white/10" />

        <div className="h-12 w-full rounded-lg bg-white/10" />

        <div className="h-12 w-full rounded-lg bg-white/10" />
      </div>
    </div>
  );
};

export default EditProduct;
