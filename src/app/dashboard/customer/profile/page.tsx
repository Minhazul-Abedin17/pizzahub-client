
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserRound, Mail, Image as ImageIcon, Save, Loader2 } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function CustomerProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        throw new Error(error.message || "Could not update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-neutral-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="border-b border-neutral-100 pb-5">
          <p className="text-sm font-semibold text-red-600">
            CUSTOMER ACCOUNT
          </p>
          <h1 className="mt-2 text-2xl font-bold text-neutral-900">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Update your personal information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Full Name
            </label>
            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={session.user.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-500 outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              Your email address cannot be changed here.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Profile Image URL
            </label>
            <div className="relative">
              <ImageIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              Profile image is optional.
            </p>
          </div>

          {image.trim() && (
            <div className="flex items-center gap-4 rounded-xl bg-neutral-50 p-4">
              <img
                src={image}
                alt="Profile preview"
                className="h-16 w-16 rounded-full border object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-800">
                  Image Preview
                </p>
                <p className="text-xs text-neutral-500">
                  This image will be used on your profile.
                </p>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
            <p className="text-sm font-semibold text-neutral-700">
              Account Role
            </p>
            <p className="mt-1 text-sm capitalize text-neutral-500">
              {session.user.role || "Customer"}
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Account role and subscription details cannot be changed from
              profile settings.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
        </form>
      </div>
    </section>
  );
}
