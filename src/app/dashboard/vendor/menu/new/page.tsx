"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { authFetch } from "@/app/lib/auth-fetch";

export default function AddPizzaPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select a pizza image");
      return;
    }

    setLoading(true);

    const imageData = new FormData();
    imageData.append("image", image);

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: imageData,
    });

    const uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok) {
      toast.error(uploadResult.message || "Image upload failed");
      setLoading(false);
      return;
    }

    const response = await authFetch("/api/menu-items", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        image: uploadResult.imageUrl,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Could not add pizza");
      setLoading(false);
      return;
    }

    toast.success("Pizza submitted for approval!");
    router.push("/dashboard/vendor");
    router.refresh();
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D93625]";

  return (
    <main className="min-h-screen bg-[#FFF9F0] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-[#D93625]">
          Vendor Dashboard / Create New Listing
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#29211D]">
          Add New Pizza
        </h1>

        <p className="mt-2 text-gray-600">
          Fill in the pizza details to submit your menu item.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border bg-white p-5 shadow-sm sm:p-8"
        >
          <div>
            <label className="mb-2 block font-medium">Pizza Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Chicken BBQ Pizza"
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your pizza..."
              rows={4}
              className={inputStyle}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Price (৳)</label>
              <input
                name="price"
                type="number"
                min="1"
                value={formData.price}
                onChange={handleChange}
                placeholder="499"
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select category</option>
                <option value="classic">Classic</option>
                <option value="cheese">Cheese</option>
                <option value="chicken">Chicken</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="spicy">Spicy</option>
                <option value="special">Special</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Restaurant Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Chattogram"
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Pizza Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full rounded-lg border border-gray-300 p-3"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Upload a clear image of your pizza.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#D93625] px-5 py-3 font-semibold text-white transition hover:bg-[#b92c1e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Pizza"}
          </button>
        </form>
      </div>
    </main>
  );
}
