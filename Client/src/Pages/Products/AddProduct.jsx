import { useState } from "react";
import { Upload, Plus, X, Loader2, ImagePlus } from "lucide-react";

import { createProduct } from "../../Data/API/productApi";

const AddProduct = () => {
  // const navigate = useNavigate();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    sku: "",

    gender: "",
    category: "",
    style: "",
    description: "",

    price: "",
    oldPrice: "",
    discount: "",

    material: "",
    fit: "",
    occasion: "",
    tags: "",

    stock: "",

    status: "draft",
    featured: false,
    trending: false,
    bestSeller: false,

    sizes: [],
    color: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -----------------------------
  // Common input change
  // -----------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------
  // Size selection
  // -----------------------------

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, value]
        : prev.sizes.filter((size) => size !== value),
    }));
  };

  // -----------------------------
  // Image selection
  // -----------------------------

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
  };

  // -----------------------------
  // Remove image
  // -----------------------------

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.name ||
      !formData.brand ||
      !formData.sku ||
      !formData.gender ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one product image.");
      return;
    }

    try {
      setLoading(true);

      // Convert comma-separated values into arrays
      const colors = formData.color
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean);

      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const productData = {
        ...formData,
        colors,
        tags,
      };

      delete productData.color;

      const data = new FormData();

      // -----------------------------
      // Product fields
      // -----------------------------

      Object.entries(productData).forEach(([key, value]) => {
        if (key === "sizes" || key === "colors" || key === "tags") {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      // -----------------------------
      // Images
      // -----------------------------

      images.forEach((image) => {
        data.append("images", image);
      });

      // -----------------------------
      // API
      // -----------------------------

      await createProduct(data);

      alert("Product created successfully.");

      setTimeout(() => {}, 1000);
    } catch (error) {
      console.error(error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
          "Something went wrong while creating the product.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0b0b0b] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-10 border-b border-white/10 pb-8">
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            Add New <span className="text-[#C19A6B]">Product</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Create and publish a new product for the ThreadCraft collection.
          </p>
        </div>

        {/* =========================================
            ALERTS
        ========================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* =========================================
            FORM
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          {/* =======================================
              LEFT COLUMN
          ======================================== */}

          <div className="space-y-8">
            {/* BASIC INFORMATION */}

            <FormSection
              title="Basic Information"
              description="Core information about your product."
            >
              <div className="space-y-5">
                <Input
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Premium Oversized Hoodie"
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Polo"
                    required
                  />

                  <Input
                    label="SKU"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. TC-HOD-001"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>

                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </Select>

                  <Input
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. T-shirt"
                    required
                  />

                  <Input
                    label="Style"
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    placeholder="Oversized"
                  />
                </div>

                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows={6}
                />
              </div>
            </FormSection>

            {/* PRICING */}

            <FormSection
              title="Pricing"
              description="Set the selling and original price."
            >
              <div className="grid gap-5 sm:grid-cols-3">
                <Input
                  label="Old Price"
                  name="oldPrice"
                  type="number"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="₹ 0"
                />

                <Input
                  label="Selling Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="₹ 0"
                  required
                />

                {/* <Input
                  label="Discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0%"
                /> */}
              </div>
            </FormSection>

            {/* PRODUCT DETAILS */}

            <FormSection
              title="Product Details"
              description="Additional information customers may need."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="Cotton, Denim..."
                />

                <Input
                  label="Fit"
                  name="fit"
                  value={formData.fit}
                  onChange={handleChange}
                  placeholder="Slim, Regular, Oversized"
                />
              </div>

              <div className="mt-5">
                <Input
                  label="Occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  placeholder="Casual, Party, Formal"
                />
              </div>

              <div className="mt-5">
                <Input
                  label="Tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Summer, Premium, Trending"
                />

                <p className="mt-2 text-xs text-white/30">
                  Separate multiple tags with commas.
                </p>
              </div>
            </FormSection>

            {/* VARIANTS */}

            <FormSection
              title="Variants"
              description="Select available sizes and colors."
            >
              <div>
                <label className="mb-4 block text-sm font-medium">
                  Available Sizes
                </label>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {sizes.map((size) => {
                    const selected = formData.sizes.includes(size);

                    return (
                      <label
                        key={size}
                        className={`
                          flex cursor-pointer
                          items-center justify-center
                          rounded-lg border px-3 py-3
                          text-sm transition-all
                          ${
                            selected
                              ? "border-[#C19A6B] bg-[#C19A6B]/10 text-[#C19A6B]"
                              : "border-white/10 text-white/50 hover:border-white/30"
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          value={size}
                          checked={selected}
                          onChange={handleSizeChange}
                          className="sr-only"
                        />

                        {size}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <Input
                  label="Colors"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Black, White, Blue"
                />

                <p className="mt-2 text-xs text-white/30">
                  Separate multiple colors with commas.
                </p>
              </div>
            </FormSection>
          </div>

          {/* =======================================
              RIGHT COLUMN
          ======================================== */}

          <div className="space-y-8">
            {/* IMAGE UPLOAD */}

            <FormSection
              title="Product Images"
              description="Upload high-quality product images."
            >
              <label
                htmlFor="product-images"
                className="
                  flex cursor-pointer
                  flex-col items-center
                  justify-center
                  rounded-xl
                  border border-dashed
                  border-white/20
                  bg-white/[0.02]
                  px-5 py-12
                  text-center
                  transition
                  hover:border-[#C19A6B]
                  hover:bg-[#C19A6B]/5
                "
              >
                <div className="mb-4 rounded-full bg-[#C19A6B]/10 p-4">
                  <ImagePlus size={28} className="text-[#C19A6B]" />
                </div>

                <p className="text-sm text-white/70">Upload product images</p>

                <p className="mt-2 text-xs text-white/30">PNG, JPG up to 5MB</p>

                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* IMAGE LIST */}

              {images.length > 0 && (
                <div className="mt-5 space-y-3">
                  {images.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="
                        flex items-center
                        justify-between
                        rounded-lg
                        border border-white/10
                        bg-white/[0.03]
                        px-4 py-3
                      "
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Upload size={16} className="shrink-0 text-[#C19A6B]" />

                        <span className="truncate text-xs text-white/60">
                          {image.name}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ml-3 text-white/30 transition hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FormSection>

            {/* INVENTORY */}

            <FormSection
              title="Inventory"
              description="Manage available stock."
            >
              <Input
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                required
              />
            </FormSection>

            {/* SETTINGS */}

            <FormSection
              title="Product Settings"
              description="Control how this product appears."
            >
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>

                <option value="published">Published</option>
              </Select>

              <div className="mt-6 space-y-4">
                <Checkbox
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  label="Featured Product"
                />

                <Checkbox
                  name="trending"
                  checked={formData.trending}
                  onChange={handleChange}
                  label="Trending Product"
                />

                <Checkbox
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleChange}
                  label="Best Seller"
                />
              </div>
            </FormSection>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#C19A6B]
                px-6 py-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-black
                transition-all
                hover:bg-[#d0a978]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Product...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// =====================================================
// FORM SECTION
// =====================================================

const FormSection = ({ title, description, children }) => {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#111111]
        p-5
        shadow-xl
        sm:p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white">{title}</h2>

        <p className="mt-1 text-xs text-white/30">{description}</p>
      </div>

      {children}
    </div>
  );
};

// =====================================================
// INPUT
// =====================================================

const Input = ({ label, required = false, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-white/40">
        {label}

        {required && <span className="ml-1 text-[#C19A6B]">*</span>}
      </label>

      <input
        {...props}
        required={required}
        className="
          w-full
          rounded-lg
          border border-white/10
          bg-white/[0.03]
          px-4 py-3
          text-sm
          text-white
          outline-none
          placeholder:text-white/20
          transition
          focus:border-[#C19A6B]
          focus:bg-white/[0.05]
        "
      />
    </div>
  );
};

// =====================================================
// TEXTAREA
// =====================================================

const Textarea = ({ label, required = false, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-white/40">
        {label}

        {required && <span className="ml-1 text-[#C19A6B]">*</span>}
      </label>

      <textarea
        {...props}
        required={required}
        className="
          w-full
          rounded-lg
          border border-white/10
          bg-white/[0.03]
          px-4 py-3
          text-sm
          text-white
          outline-none
          placeholder:text-white/20
          transition
          focus:border-[#C19A6B]
          focus:bg-white/[0.05]
        "
      />
    </div>
  );
};

// =====================================================
// SELECT
// =====================================================

const Select = ({ label, required = false, children, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-white/40">
        {label}

        {required && <span className="ml-1 text-[#C19A6B]">*</span>}
      </label>

      <select
        {...props}
        required={required}
        className="
          w-full
          rounded-lg
          border border-white/10
          bg-[#171717]
          px-4 py-3
          text-sm
          text-white
          outline-none
          transition
          focus:border-[#C19A6B]
        "
      >
        {children}
      </select>
    </div>
  );
};

// =====================================================
// CHECKBOX
// =====================================================

const Checkbox = ({ name, checked, onChange, label }) => {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="
          h-4
          w-4
          accent-[#C19A6B]
        "
      />

      <span className="text-sm text-white/60">{label}</span>
    </label>
  );
};

export default AddProduct;
