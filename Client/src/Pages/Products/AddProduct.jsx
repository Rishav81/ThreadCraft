import { Upload, Plus } from "lucide-react";
import { useState } from "react";
import { createProduct } from "../../Data/API/productApi";

import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
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
    colors: [],
    color: "",
  });

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, value]
        : prev.sizes.filter((size) => size !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,

        colors: formData.color
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),

        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      delete productData.color;
      const data = new FormData();

      // append product data
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "sizes" || key === "colors" || key === "tags") {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      // append images
      images.forEach((image) => {
        data.append("images", image);
      });

      await createProduct(data);

      alert("Product created successfully!");
      navigate("/");

      console.log(productData);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#2b2b2b] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mt-12 mb-8">
          <h1 className="text-3xl font-bold text-[#f2f2f2]">
            Add New <span className="text-[#C19A6B]">Product</span>
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new product listing for ThreadCraft.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Basic Information */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>

              <div className="space-y-4">
                <input
                  placeholder="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-style"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    placeholder="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="input-style"
                  />

                  <input
                    placeholder="SKU"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-style  px-4"
                  >
                    <option value="">Select Gender</option>

                    <option value="Men">Men</option>

                    <option value="Women">Women</option>

                    <option value="Kids">Kids</option>
                  </select>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-style"
                  >
                    <option value="">Select Category</option>

                    <option value="T-Shirt">T-Shirt</option>

                    <option value="Shirt">Shirt</option>

                    <option value="Hoodie">Hoodie</option>

                    <option value="Jeans">Jeans</option>
                  </select>

                  <input
                    placeholder="Style"
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <textarea
                  rows="5"
                  placeholder="Product Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-style resize-none"
                />
              </div>
            </div>

            {/* Pricing */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Pricing</h2>

              <div className="grid gap-4 sm:grid-cols-3">
                <input
                  placeholder="Old Price"
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="input-style"
                />

                <input
                  placeholder="Selling Price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-style"
                />
              </div>
            </div>
            {/* Product Details */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Product Details</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Material (Cotton, Denim...)"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="input-style"
                />

                <input
                  placeholder="Fit (Slim, Regular, Oversized)"
                  name="fit"
                  value={formData.fit}
                  onChange={handleChange}
                  className="input-style"
                />
              </div>

              <input
                placeholder="Occasion (Casual, Party, Formal)"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="input-style mt-4"
              />

              <input
                placeholder="Tags (Summer, Premium, Trending)"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-style mt-4"
              />
            </div>

            {/* Variants */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Variants</h2>

              <p className="mb-3 font-medium">Sizes</p>

              <div className="flex flex-wrap gap-6">
                {sizes.map((size) => (
                  <label key={size} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.sizes.includes(size)}
                      onChange={handleSizeChange}
                    />

                    {size}
                  </label>
                ))}
              </div>

              <p className="mb-3 mt-6 font-medium">Colors</p>

              <input
                type="text"
                name="color"
                placeholder="Black, White, Blue"
                value={formData.color}
                onChange={handleChange}
                className="input-style"
              />
            </div>
          </div>

          {/* Right Section */}

          <div className="space-y-8">
            {/* Images */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Product Images</h2>

              <label
                htmlFor="product-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-[#C19A6B]"
              >
                <Upload size={40} className="mb-4 text-[#C19A6B]" />

                <p className="text-sm text-gray-600">
                  Click to upload product images
                </p>

                <span className="mt-2 text-xs text-gray-400">
                  PNG, JPG up to 5MB
                </span>

                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />

                {images.length > 0 && (
                  <div className="mt-2 w-full space-y-2">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className=" border bg-white rounded-xl px-4 py-2 text-sm text-gray-700"
                      >
                        {image.name}
                      </div>
                    ))}
                  </div>
                )}
              </label>
            </div>

            {/* Inventory */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Inventory</h2>

              <input
                placeholder="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="input-style"
              />
            </div>

            {/* Product Settings */}

            <div className="rounded-2xl bg-[#c8c5c5] p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">Product Settings</h2>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-style"
              >
                <option value="draft">Draft</option>

                <option value="published">Published</option>
              </select>

              <div className="mt-5 space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  Featured Product
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="trending"
                    checked={formData.trending}
                    onChange={handleChange}
                  />
                  Trending Product
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="bestSeller"
                    checked={formData.bestSeller}
                    onChange={handleChange}
                  />
                  Best Seller
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C19A6B] py-4 font-semibold text-white hover:bg-[#ad875b]"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
