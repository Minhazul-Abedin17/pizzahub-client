"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/app/lib/auth-fetch";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
};

export default function EditPizzaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await authFetch(
          `/api/menu-items/my-items/${id}`
        );

        if (!response.ok) {
          throw new Error("Could not load pizza");
        }

        const item: MenuItem = await response.json();

        setFormData({
          name: item.name,
          description: item.description,
          price: String(item.price),
          image: item.image,
          category: item.category,
          location: item.location,
        });
      } catch (error) {
        console.error(error);
        toast.error("Could not load pizza information");
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.image.trim() ||
      !formData.category ||
      !formData.location.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!Number.isFinite(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      setSaving(true);

      const response = await authFetch(`/api/menu-items/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          image: formData.image.trim(),
          category: formData.category,
          location: formData.location.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update pizza");
      }

      toast.success("Pizza updated successfully!");
      router.push("/dashboard/vendor");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      {/* Header */}
      <div>
        <Link
          href={`/dashboard/vendor/menu/${id}`}
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-red-600"
        >
          <ArrowLeft size={16} />
          Back to Pizza Details
        </Link>

        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Edit Pizza
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Update your pizza information below.
        </p>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8"
      >
        {/* Pizza Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Pizza Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pizza name"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your pizza..."
            rows={5}
            className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            required
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Price (৳)
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="1"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-red-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500"
              required
            >
              <option value="">Select category</option>
              <option value="Classic">Classic</option>
              <option value="Cheese">Cheese</option>
              <option value="Chicken">Chicken</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Seafood">Seafood</option>
              <option value="Special">Special</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Pizza Image URL
          </label>

          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/pizza.jpg"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            required
          />

          {formData.image && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-neutral-500">
                Image Preview
              </p>

              <img
                src={formData.image}
                alt="Pizza preview"
                className="h-40 w-full rounded-xl border border-neutral-200 object-cover sm:w-64"
              />
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your restaurant location"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-red-500"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href={`/dashboard/vendor/menu/${id}`}
            className="rounded-xl border border-neutral-200 px-6 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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