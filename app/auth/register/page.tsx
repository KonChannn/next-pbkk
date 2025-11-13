"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true); // Set loading state

    try {
      // Send data to the API
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Parse response
      const data = await res.json();

      // Handle response errors
      if (!res.ok) {
        setError(data.error || "Failed to register. Please try again.");
        setIsLoading(false);
        return;
      }

      // Navigate to login page after successful registration
      router.push("/auth/login");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          登録 (Register)
        </h1>
        <p className="text-center text-gray-400 mb-6 italic">
          “Join us and step into the world of anime!”
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              メール (Email)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@anime.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              ユーザー名 (Username)
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="AnimeFan123"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">
              パスワード (Password)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none transition duration-200"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
      <div
        className="absolute bottom-4 text-gray-600 text-sm italic text-center w-full"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        アニメの世界へようこそ (Welcome to the world of anime!)
      </div>
    </div>
  );
}
