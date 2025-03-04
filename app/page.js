"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: "url('/bg2.jpeg')", 
        }}
      />
      
      <div className="absolute inset-0 bg-blue-900/50 group-hover:bg-blue-900/50 transition-all duration-500" />

      <div className="relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold"
        >
          Welcome to Hotel Management System 🏨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-lg"
        >
          Easily manage hotel bookings, customer reviews, and property details all in one place. 
          Sign in to start managing your hotels.
        </motion.p>

        {/* Sign In Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push("/auth/signin")}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Sign In to Manage Hotels
        </motion.button>
      </div>
    </div>
  );
}
