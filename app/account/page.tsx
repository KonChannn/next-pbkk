"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";

const UserSettings = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("account");

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 1; // Replace with logged-in user's ID
        const response = await fetch(`/api/user?id=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData({ id: data.id, username: data.username, password: "" });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.id,
          username: userData.username,
          password: userData.password ? userData.password : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const data = await response.json();
      setMessage("User data updated successfully!");
      setUserData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("Failed to update user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-4 font-sans">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Settings</h1>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setTab("account")}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === "account"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Account Settings
          </button>
          <button
            onClick={() => setTab("security")}
            className={`px-6 py-2 text-sm font-medium rounded-lg ml-4 transition-all ${
              tab === "security"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Security Settings
          </button>
        </div>

        {/* Form */}
        {tab === "account" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password (leave blank to keep current password):
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Settings"}
                </button>
              </div>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
