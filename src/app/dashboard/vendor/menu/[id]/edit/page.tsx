
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/app/lib/auth-fetch";

type PizzaForm = {
  name: string;
  description: string;
  price: string;
  category: string;
  location: string;
  image: string;
};

export default function EditPizzaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState<PizzaForm>({
    name: "",
    description: "",
    price: "",
    category: "classic",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing pizza information
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await authFetch(
          `/api/menu-items/my-items/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load pizza");
        }

        const pizza = data.item || data;

        setFormData({
          name: pizza.name || "",
          description: pizza.description || "",
          price: String(pizza.price ?? ""),
          category: pizza.category || "classic",
          location: pizza.location || "",
          image: pizza.image || "",
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update pizza
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.location.trim() || !formData.image.trim()) {
      toast.error("Location and image are required");
      return;
    }

    const price = Number(formData.price);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      setSaving(true);

      const response = await authFetch(
        `/api/menu-items/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim(),
            price,
            category: formData.category,
            location: formData.location.trim(),
            image: formData.image.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update pizza");
      }

      toast.success("Pizza updated successfully!");

      router.push(`/dashboard/vendor/menu/${id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          Unable to Load Pizza
        </h2>

        <p className="mt-2 text-sm text-red-500">{error}</p>

        <Link
          href="/dashboard/vendor/menu"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          <ArrowLeft size={16} />
          Back to Manage Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Header */}
      <div>
        <Link
          href={`/dashboard/vendor/menu/${id}`}
          className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
        >
          <ArrowLeft size={16} />
          Back to Pizza Details
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">
          Edit Pizza
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update your pizza information below.
        </p>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8"
      >
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your pizza name and description.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Pizza Name *
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pizza name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Description *
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your pizza..."
            rows={4}
            required
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Price (৳) *
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="1"
              step="any"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="classic">Classic</option>
              <option value="cheese">Cheese</option>
              <option value="chicken">Chicken</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="spicy">Spicy</option>
              <option value="special">Special</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Location *
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your restaurant location"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Image */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Pizza Image *
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Update your pizza image using an image URL.
            </p>
          </div>

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/pizza.jpg"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />

          {formData.image && (
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-500">
                <ImageIcon size={15} />
                Image Preview
              </p>

              <img
                src={formData.image}
                alt="Pizza preview"
                className="h-52 w-full rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href={`/dashboard/vendor/menu/${id}`}
            className="rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
