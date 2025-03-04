"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardClient({ session }) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: "url('/bg2.jpeg')", 
        }}
      />
      
      <div className="absolute inset-0 bg-blue-900/50 group-hover:bg-blue-900/50 transition-all duration-500" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {session.user.name}! 🎉
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-gray-700"
        >
          <p>Manage your hotel properties, bookings, and customer reviews from here.</p>
          <p className="mt-2">Start by exploring your hotels below! ⬇️</p>
        </motion.div>

        {/* Manage Hotels Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push("/manage-hotel")}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Go to Manage Hotels
        </motion.button>
      </motion.div>
    </div>
  );
}
