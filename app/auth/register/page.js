"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Modal from "@/app/components/modal";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const isModal = searchParams.get("modal") === "true";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen w-full"
    >
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Create an Account 🎉</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 pl-10 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full transition-all shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/signin?modal=true")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );

  return isModal ? (
    <Modal>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md w-full h-full">
        <div className="w-full max-w-lg">{content}</div>
      </div>
    </Modal>
  ) : (
    content
  );
}
