"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Modal from "@/app/components/modal";
import { motion } from "framer-motion";
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const isModal = searchParams.get("modal") === "true";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

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
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen w-full"
    >
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Welcome Back 👋</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
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

          {/* Sign-In Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full transition-all shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg w-full mt-4 transition-all shadow-md"
        >
          <FaGoogle className="mr-2" /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/auth/register?modal=true")}
            className="text-blue-500 hover:underline"
          >
            Register
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
